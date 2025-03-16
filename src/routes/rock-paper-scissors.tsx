import { createFileRoute } from '@tanstack/react-router'
import { Scissors, HandMetal, Newspaper, Trophy, Handshake, Skull, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import '../styles/practice-projects.css'

export const Route = createFileRoute('/rock-paper-scissors')({
  component: RouteComponent,
})

type Weapon = 'rock' | 'paper' | 'scissors'
const weapons = ['rock', 'paper', 'scissors'] as const

function RouteComponent() {
  const [userChoice, setUserChoice] = useState<Weapon | null>(null)
  const [aiChoice, setAiChoice] = useState<Weapon | null>(null)
  const [gameState, setGameState] = useState<'playing' | 'done'>('playing')

  function handleUserChoice(weapon: Weapon) {
    setUserChoice(weapon)
    const randomIdx = Math.floor(Math.random() * weapons.length)
    const randomWeapon = weapons[randomIdx]
    setAiChoice(randomWeapon)
    setGameState('done')
  }

  function getResult() {
    let message = <></>
    
    if (userChoice === aiChoice) {
      message = (
        <>
          <Handshake className='size-24' />
          <p>Draw</p>
        </>
      )
    } else if (
      (userChoice === 'rock' && aiChoice === 'paper') ||
      (userChoice === 'paper' && aiChoice === 'scissors') ||
      (userChoice === 'scissors' && aiChoice === 'paper')
    ) {
      message = (
        <>
          <Trophy className='size-24' />
          <p>You Win!</p>
        </>
      )
    } else {
      message = (
        <>
          <Skull className='size-24' />
          <p>You lose :(</p>
        </>
      )
    }

    return (
      <div className='flex flex-col items-center justify-center gap-4'>
      {message}
      </div>
    )
  }

  function restartGame() {
    setUserChoice(null)
    setAiChoice(null)
    setGameState('playing')
  }

  return (
    <div className='practice-projects-centered-container'>
      { gameState === 'playing' ?
        <>
          <h1 className='rps-title'>Pick your weapon</h1>
          <div className='flex items-center justify-center gap-8'>
            <button onClick={ () => {
              handleUserChoice('rock')
            }} className='rps-card'>
              <HandMetal className='rps-icon' />
              ROCK
            </button>
            <button onClick={ () => {
              handleUserChoice('paper')
            }} className='rps-card'>
              <Newspaper className='rps-icon' />
              PAPER
            </button>
            <button onClick={ () => {
              handleUserChoice('scissors')
            }} className='rps-card'>
              <Scissors className='rps-icon' />
              SCISSORS
            </button>
          </div>
        </> :
        <div className='practice-projects-centered-container'>
          <p className='rps-title'>You chose: {userChoice} | AI chose: {aiChoice}</p>
          <p className='rps-title'>{getResult()}</p>
          <button onClick={restartGame} className='rps-button'>
            <RotateCcw className='size-8' />
            Play Again
          </button>
        </div>
      }
    </div>
  )
}
