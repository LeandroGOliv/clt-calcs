import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ferias')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ferias"!</div>
}
