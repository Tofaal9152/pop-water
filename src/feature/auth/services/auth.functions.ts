import { SignInSchema } from '@/feature/auth/schemas/sign-in.schema'
import { LoginResponse } from '@/feature/auth/types/auth.types'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Axios } from '../../../utils/axios.server'
import { useAppSession } from '../utils/session'

// Login function
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((raw: unknown) => SignInSchema.parse(raw))
  .handler(async ({ data }) => {
    try {
      const res = await Axios.post<LoginResponse>('/rest-auth/login/', {
        email: data.email,
        password: data.password,
      })

      const json = res.data

      if (!json.access || !json.refresh) {
        return { ok: false as const, message: 'Invalid credentials' }
      }

      const session = await useAppSession()
      await session.update({
        access: json.access,
        refresh: json.refresh,
        user: json.user,
        role: json.role,
      })
    } catch (e: any) {
      const status = e?.response?.status
      if (status === 400 || status === 401) {
        return {
          ok: false as const,
          message: e?.response?.data?.message || 'Invalid credentials',
        }
      }

      return { ok: false as const, message: 'Login failed' }
    }
    throw redirect({ to: data.redirect || '/dashboard' })
  })
// Logout function
export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()
  throw redirect({ to: '/signin' })
})
// Get auth status function
export const getAuthFn = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await useAppSession()
  return {
    isAuthed: Boolean(session.data.access && session.data.user),
    user: session.data.user ?? null,
    role: session.data.role ?? null,
  }
})
