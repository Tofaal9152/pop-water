import { useSession } from '@tanstack/react-start/server'

export type SessionUser = {
  pk: number
  username: string
  email: string
  first_name: string
  last_name: string
}

export type SessionData = {
  access?: string
  refresh?: string
  user?: SessionUser
  role?: string // "ADMIN" etc
}

export function useAppSession() {
  const secret = process.env.SESSION_SECRET_KEY
  if (!secret || secret.length < 32) {
    throw new Error(
      'SESSION_SECRET must be set and at least 32 characters long',
    )
  }

  return useSession<SessionData>({
    name: process.env.SESSION_COOKIE_NAME,
    password: secret,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      // optional:
      // maxAge: 7 * 24 * 60 * 60,
    },
  })
}
