'use client'

import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useApiMutation } from './useApi'

interface DeleteButtonProps {
  endPoint: string
  queryKeys?: any[][]
  confirmMessage?: string
  confirmDescription?: string
  successMessage?: string
  errorMessage?: string
}

const DeleteAction = ({
  endPoint,
  queryKeys = [],
  successMessage = 'Deleted successfully!',
  errorMessage,
  confirmMessage = 'Are you absolutely sure?',
  confirmDescription = 'This action cannot be undone. This will permanently delete this item and remove the data from our servers.',
}: DeleteButtonProps) => {
  const qc = useQueryClient()

  // ✅ use your generic hook
  const deleteMutation = useApiMutation({
    method: 'DELETE',
    url: endPoint,
  })

  const handleDelete = () => {
    deleteMutation.mutate(undefined as any, {
      onSuccess: async () => {
        toast.success(successMessage)

        // invalidate all related queries
        await Promise.all(
          (queryKeys ?? []).map((k) => qc.invalidateQueries({ queryKey: k })),
        )
      },
      onError: (e: any) => {
        toast.error(errorMessage ?? e?.message ?? 'Delete failed')
      },
    })
  }

  const isPending = deleteMutation.isPending

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isPending} size="sm">
          {isPending ? <Spinner className="mr-1 h-4 w-4" /> : <Trash2Icon />}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmMessage}</AlertDialogTitle>
          <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Deleting...
              </>
            ) : (
              'Continue'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAction
