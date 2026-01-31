import { useServerFn } from '@tanstack/react-start'
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { apiGetFn, apiMutateFn } from '@/utils/api.server'

export function useApiQuery<TData = any>(
  queryKey: unknown[],
  url: string,
  params?: Record<string, any>,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>,
) {
  const apiGet = useServerFn(apiGetFn)
  return useQuery<TData>({
    queryKey,
    queryFn: async () => {
      return (await apiGet({ data: { url, params } })) as TData
    },
    ...options,
  })
}

export function useApiMutation<TData = any, TVars = any>(config: {
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
}) {
  const apiMutate = useServerFn(apiMutateFn)

  return useMutation<TData, any, TVars>({
    mutationFn: async (body: TVars) => {
      return (await apiMutate({
        data: { method: config.method, url: config.url, body },
      })) as TData
    },
    onError: (e: any) => console.log('❌ mutate error', e),
  })
}
