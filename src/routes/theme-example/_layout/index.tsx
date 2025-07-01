import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/theme-example/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/theme-example/_layout/"!</div>
}
