import { Route as RootRoute } from '@/routes/__root'
import { useMemo } from 'react'

type AuthContext = {
  user?: any
  role?: any
  isAuthed?: boolean
}

export function useAuth() {
  const ctx = RootRoute.useRouteContext() as AuthContext

  return useMemo(() => {
    return {
      user: ctx?.user ?? null,
      role: ctx?.role ?? null,
      isAuthed: Boolean(ctx?.isAuthed),
    }
  }, [ctx])
}
