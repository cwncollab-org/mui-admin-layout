import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/layout-provider-example/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to='/layout-provider-example/control' />
}
