import { createRootRoute, Outlet } from '@tanstack/react-router'
import { AdminLayoutProvider } from '../lib/AdminLayoutProvider'

export const Route = createRootRoute({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AdminLayoutProvider>
      <Outlet />
    </AdminLayoutProvider>
  )
}
