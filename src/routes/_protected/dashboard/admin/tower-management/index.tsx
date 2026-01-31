import DashboardPageLayout from '@/components/web/dashboard/DashboardPageLayout'
import TowerForm from '@/feature/dashboard/admin/tower-management/TowerForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/dashboard/admin/tower-management/',
)({
  component: RouteComponent,
})
function RouteComponent() {
  return (
    <DashboardPageLayout
      title="Add New Tower"
      subtitle="Fill in the details below to add a new tower."
    >
      <div className="w-full mx-auto flex justify-center">
        <TowerForm />
      </div>
    </DashboardPageLayout>
  )
}
