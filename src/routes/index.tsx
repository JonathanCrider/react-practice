import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div>
      <Link className='text-blue-400 hover:text-blue-600 hover:uppercase bg-white p-4 m-2 rounded' to='/rock-paper-scissors'>Rock/Paper/Scissors</Link>
      <Link className='text-blue-400 hover:text-blue-600 hover:uppercase bg-white p-4 m-2 rounded' to='/stopwatch'>Stopwatch</Link>
    </div>
  )
}
