import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import '../styles/practice-projects.css'

export const Route = createFileRoute('/stopwatch')({
  component: RouteComponent,
})

function RouteComponent() {
  const [count, setCount] = useState<number>(0)
  const [state, setState] = useState<'initial' | 'running' | 'paused'>('initial')
  const intervalRef = useRef<NodeJS.Timeout>(null)

  function start() {
    setState('running')
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000)
  }

  function clear() {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  function pause() {
    setState('paused')
    clear()
  }

  function reset() {
    clear()
    setState('initial')
    setCount(0)
  }

  return (
    <div className='practice-projects-centered-container'>
        <h1>Stopwatch</h1>
        <div className='practice-projects-flex-center p-5 rounded-md border-2'>
          <div className='flex items-center justify-center'>{count} seconds elapsed</div>

          { state === 'initial' && (
            <button onClick={start} className='stopwatch-button bg-green-500'>start</button>
          )}

          {state === 'running' && (
            <button onClick={pause} className='stopwatch-button '>pause</button>
          )}

          { state === 'paused' && (
            <>
              <button onClick={start} className='stopwatch-button bg-green-500'>resume</button>
              <button onClick={reset} className='stopwatch-button bg-red-500'>reset</button>
            </>
          )}

        </div>
    </div>
  )
}
