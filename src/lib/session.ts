import { jwtVerify, SignJWT } from 'jose'
import { env } from '@/config/env.server'

// NOTE: secret -> Uint8Array
const encodedKey = new TextEncoder().encode(env.SESSION_SECRET_KEY)

const SESSION_COOKIE_NAME = env.SESSION_COOKIE_NAME
const SESSION_MAX_AGE_SECONDS = env.SESSION_MAX_AGE_DAYS * 24 * 60 * 60

export type Session = {
  user: {
    id: string
    email: string
    role?: string
  }
  accessToken: string
  refreshToken: string
}

type CookieApi = {
  get(name: string): string | undefined
  set(
    name: string,
    value: string,
    opts?: {
      httpOnly?: boolean
      secure?: boolean
      maxAge?: number
      sameSite?: 'lax' | 'strict' | 'none'
      path?: string
    },
  ): void
  delete(name: string, opts?: { path?: string }): void
}

export async function createSession(cookies: CookieApi, payload: Session) {
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(`${env.SESSION_MAX_AGE_DAYS}d`)
    .sign(encodedKey)

  cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    maxAge: SESSION_MAX_AGE_SECONDS,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession(cookies: CookieApi): Promise<Session | null> {
  const token = cookies.get(SESSION_COOKIE_NAME)
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload as unknown as Session
  } catch {
    // invalid cookie -> treat as logged out
    return null
  }
}

export function destroySession(cookies: CookieApi) {
  cookies.delete(SESSION_COOKIE_NAME, { path: '/' })
}

export async function updateTokens(
  cookies: CookieApi,
  input: { accessToken: string; refreshToken: string },
) {
  const current = await getSession(cookies)
  if (!current) return null

  const next: Session = {
    ...current,
    accessToken: input.accessToken,
    refreshToken: input.refreshToken,
  }

  await createSession(cookies, next)
  return next
}
