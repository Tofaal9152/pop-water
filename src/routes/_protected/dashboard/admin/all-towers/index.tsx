import DashboardPageLayout from '@/components/web/dashboard/DashboardPageLayout'
import AllTower from '@/feature/dashboard/admin/all-tower/AllTower'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard/admin/all-towers/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return (
    <DashboardPageLayout
      title="All Towers"
      subtitle="View and manage all towers."
    >
      <AllTower />
    </DashboardPageLayout>
  )
}
