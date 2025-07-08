import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/theme-example/_layout/with-submenu/subitem2',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/layout-provider-example/_layout/with-submenu/subitem2"!</div>
  )
}
