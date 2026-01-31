import { getAuthFn } from '@/feature/auth/services/auth.functions'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ location }) => {
    const auth = await getAuthFn()

    if (!auth.isAuthed) {
      throw redirect({
        to: '/signin',
        search: { redirect: location.href },
      })
    }

    return {
      user: auth.user,
      role: auth.role,
      isAuthed: auth.isAuthed,
    }
  },
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return <Outlet />
}
