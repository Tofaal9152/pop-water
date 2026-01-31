import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { apiRequest } from '@/utils/axios.server'

// ✅ helper: convert axios/django error into real HTTP Response
function throwHttpError(err: unknown): never {
  if (err instanceof AxiosError) {
    const status = err.response?.status ?? 500
    const data = err.response?.data ?? { message: err.message }

    throw new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  throw new Response(
    JSON.stringify({ message: (err as any)?.message ?? 'Server error' }),
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}

// ---------------- GET ----------------
const GetSchema = z.object({
  url: z.string().min(1),
  params: z.any().optional(),
})

export const apiGetFn = createServerFn({ method: 'GET' })
  .inputValidator((raw: unknown) => GetSchema.parse(raw))
  .handler(async ({ data }) => {
    try {
      return await apiRequest({
        method: 'GET',
        url: data.url,
        params: data.params,
      })
    } catch (err) {
      throwHttpError(err)
    }
  })

// ---------------- MUTATE ----------------
const MutateSchema = z.object({
  method: z.enum(['POST', 'PUT', 'PATCH', 'DELETE']),
  url: z.string().min(1),
  body: z.any().optional(),
})

export const apiMutateFn = createServerFn({ method: 'POST' })
  .inputValidator((raw: unknown) => MutateSchema.parse(raw))
  .handler(async ({ data }) => {
    try {
      return await apiRequest({
        method: data.method,
        url: data.url,
        data: data.body,
      })
    } catch (err) {
      throwHttpError(err)
    }
  })
