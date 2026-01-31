import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useAppSession } from '../feature/auth/utils/session'

function baseUrl() {
  const base = process.env.BACKEND_URL
  if (!base) throw new Error('DJANGO_BASE_URL is not set')
  return base.replace(/\/$/, '')
}

// one axios instance for your Django API
export const Axios = axios.create({
  baseURL: baseUrl(),
  headers: { 'Content-Type': 'application/json' },
  
})

async function refreshAccessTokenOrThrow() {
  const session = await useAppSession()
  const refresh = session.data.refresh
  if (!refresh) throw new Error('No refresh token in session')

  let lastErr: unknown = null

  try {
    const res = await Axios.post('/get-access-token/', { refresh })
    const access = (res.data as any)?.access
    if (!access) throw new Error('Refresh response missing access')

    await session.update({ access })
    return access as string
  } catch (e) {
    lastErr = e
  }

  // refresh failed -> clear session
  await session.clear()
  throw lastErr ?? new Error('Refresh failed')
}

export async function apiRequest<T = any>(config: AxiosRequestConfig) {
  const session = await useAppSession()
  const access = session.data.access

  if (!access) {
    const err: any = new Error('Not authenticated')
    err.status = 401
    throw err
  }

  try {
    const res = await Axios.request<T>({
      ...config,
      headers: {
        ...(config.headers ?? {}),
        Authorization: `Bearer ${access}`,
      },
    })
    return res.data
  } catch (err) {
    if (
      err instanceof AxiosError &&
      err.response?.status === 401 &&
      session.data.refresh
    ) {
      const newAccess = await refreshAccessTokenOrThrow()
      const retry = await Axios.request<T>({
        ...config,
        headers: {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${newAccess}`,
        },
      })
      return retry.data
    }

    throw err
  }
}
