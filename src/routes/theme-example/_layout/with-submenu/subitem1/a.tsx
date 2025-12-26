import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/theme-example/_layout/with-submenu/subitem1/a',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/theme-example/_layout/with-submenu/_subitem1/a"!</div>
}
