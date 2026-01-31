import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketting')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
