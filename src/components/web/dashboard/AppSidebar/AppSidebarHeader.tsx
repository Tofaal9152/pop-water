import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'

export function AppSidebarHeader({
  title,
  subtitle,
  image,
}: {
  title: string
  subtitle: string
  image: string
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link to="/">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
          >
            <img
              src={image}
              width={35}
              height={35}
              alt="logo"
              className="rounded-md p-1 mr-2"
            />

            <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer gap-0.5">
              <span className="truncate font-semibold">{title}</span>
              <span className="truncate text-xs flex items-center gap-1">
                {subtitle}
              </span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
