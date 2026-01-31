import { Button } from '@/components/ui/button'
import { logoutFn } from '@/feature/auth/services/auth.functions'
import { useServerFn } from '@tanstack/react-start'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const logout = useServerFn(logoutFn)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        logout()
      }}
    >
      <Button variant={'outline'}>Logout</Button>
    </form>
  )
}
export function DashboardLogoutButton() {
  const logout = useServerFn(logoutFn)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        logout()
      }}
      className="w-full "
    >
      <button className="flex items-center gap-2 w-full justify-start p-1 cursor-pointer" type='submit'>
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </form>
  )
}
