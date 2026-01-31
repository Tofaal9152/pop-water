import { linkOptions } from '@tanstack/react-router'
import { PlusCircleIcon, TowerControl } from 'lucide-react'

export const AdminSidebarItems = linkOptions([
  {
    name: 'All Towers',
    icon: TowerControl,
    to: '/dashboard/admin/all-towers',
    activeOptions: { exact: true },
  },
  {
    name: 'Tower Management',
    icon: PlusCircleIcon,
    to: '/dashboard/admin/tower-management',
    activeOptions: { exact: true },
  },
])
