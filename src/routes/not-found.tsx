import { createFileRoute } from '@tanstack/react-router'
import NotFound from '../lib/pages/NotFound'

export const Route = createFileRoute('/not-found')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NotFound />
}
