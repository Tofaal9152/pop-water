import DashboardShell from '@/components/web/dashboard/DashboardShell'
import { AdminSidebar } from '@/feature/dashboard/admin/sidebar/AdminSidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard')({
  component: AdminDashboardComponent,
})

function AdminDashboardComponent() {
  const { user, role } = Route.useRouteContext()

  return (
    <DashboardShell sidebar={<AdminSidebar session={{ user, role }} />}>
      <Outlet />
    </DashboardShell>
  )
}
