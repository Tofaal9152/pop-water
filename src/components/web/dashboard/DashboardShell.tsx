import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import DashboardNavbar from './DashboardNavbar'

export default function DashboardShell({
  sidebar,
  navbar = <DashboardNavbar />,
  children,
}: {
  sidebar: React.ReactNode
  navbar?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      {sidebar}

      <SidebarInset>
        {navbar}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 bg-gray-50 dark:bg-[#020617]">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
