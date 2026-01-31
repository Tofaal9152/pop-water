import { type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'

function SingleComponentsidebar({
  title,
  items,
}: {
  title: string
  items: {
    name: string
    to: string
    hidden?: boolean
    icon: LucideIcon
    activeOptions?: { exact: boolean }
  }[]
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item, idx) => (
          <SidebarMenuItem className="group" key={idx} hidden={item.hidden}>
            <SidebarMenuButton asChild size={'sm'}>
              <Link
                to={item.to}
                activeOptions={item.activeOptions}
                activeProps={{ 'data-active': true }}
              >
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
export default SingleComponentsidebar
