import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/layout-provider-example/_layout/with-submenu/subitem1',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/layout-provider-example/_layout/with-submenu/subitem1"!</div>
  )
}
