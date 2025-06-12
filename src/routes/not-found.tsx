import { createFileRoute } from '@tanstack/react-router'
import NotFoundPage from '../lib/pages/NotFoundPage'

export const Route = createFileRoute('/not-found')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NotFoundPage />
}
