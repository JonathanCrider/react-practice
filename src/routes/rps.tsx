import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rps')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/rps"!</div>
}
