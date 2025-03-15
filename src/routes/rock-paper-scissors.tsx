import { createFileRoute } from '@tanstack/react-router'
import { Scissors, HandMetal, Newspaper, Trophy, Handshake, Skull } from 'lucide-react'
import { useState } from 'react'

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
    const winJsx = (
      <div className='flex flex-col items-center justify-center gap-4'>
        <Trophy className='size-24' />
        <p>You Win!</p>
      </div>
    )
    if (userChoice === aiChoice) {
      return (
        <div className='flex flex-col items-center justify-center gap-4'>
          <Handshake className='size-24' />
          <p>Draw</p>
        </div>
      )
    } else if (userChoice === 'rock' && aiChoice === 'paper') {
      return winJsx
    } else if (userChoice === 'paper' && aiChoice === 'scissors') {
      return winJsx
    } else if (userChoice === 'scissors' && aiChoice === 'paper') {
      return winJsx
    } else {
      return (
        <div className='flex flex-col items-center justify-center gap-4'>
          <Skull className='size-24' />
          <p>You lose :(</p>
        </div>
      )
    }
  }

  function restartGame() {
    setUserChoice(null)
    setAiChoice(null)
    setGameState('playing')
  }

  return (
    <div className='flex flex-col items-center justify-center gap-8 h-screen text-white'>
      { gameState === 'playing' ?
        <>
          <h1>Pick your weapon</h1>
          <div className='flex items-center justify-center gap-8'>
            <button onClick={ () => {
              handleUserChoice('rock')
            }} className='flex flex-col items-center justify-center gap-4 p-8 border border-gray-500 rounded bg-gray-900 w-52 h-80'>
              <HandMetal className='size-24' />
              ROCK
            </button>
            <button onClick={ () => {
              handleUserChoice('paper')
            }} className='flex flex-col items-center justify-center gap-4 p-8 border border-gray-500 rounded bg-gray-900 w-52 h-80'>
              <Newspaper className='size-24' />
              PAPER
            </button>
            <button onClick={ () => {
              handleUserChoice('scissors')
            }} className='flex flex-col items-center justify-center gap-4 p-8 border border-gray-500 rounded bg-gray-900 w-52 h-80'>
              <Scissors className='size-24' />
              SCISSORS
            </button>
          </div>
        </> :
        <div className='flex flex-col items-center justify-center gap-8 h-screen'>
          <h1>Game Over</h1>
          <p>You chose: {userChoice}</p>
          <p>AI chose: {aiChoice}</p>
          <p>{getResult()}</p>
          <button onClick={restartGame}>START OVER</button>
        </div>
      }
    </div>
  )
}
