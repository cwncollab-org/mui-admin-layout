import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/layout-provider-example/_layout/with-params/$id/'
)({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  return (
    <div>
      Hello "/layout-provider-example/_layout/with-params/$id/"! ID: {params.id}
    </div>
  )
}
