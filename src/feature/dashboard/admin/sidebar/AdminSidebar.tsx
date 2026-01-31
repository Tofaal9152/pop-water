'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { AppSidebarFooter } from '@/components/web/dashboard/AppSidebar/AppSidebarFooter'
import { AppSidebarHeader } from '@/components/web/dashboard/AppSidebar/AppSidebarHeader'
import SingleComponentsidebar from '@/components/web/dashboard/AppSidebar/SingleComponentsidebar'
import { imagePath } from '@/constants/imagePath'
import { AdminSidebarItems } from './sidebarItems'

export function AdminSidebar({ session }: { session: any }) {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <AppSidebarHeader
          title="Admin Dashboard"
          subtitle="POP Water Tower"
          image={imagePath.logo}
        />
      </SidebarHeader>

      <SidebarContent>
        <SingleComponentsidebar
          title={'Tower Control'}
          items={AdminSidebarItems.slice()}
        />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <AppSidebarFooter
          name={session.user.username}
          email={session.user.email}
          avatar={session.user.avatar}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
