import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/visits/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/visits/"!</div>
}
