import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/layout-example')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/layout-example"!</div>
}
