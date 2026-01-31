'use client'

import { useUploadSingleFile } from '@/common/services/uploadFile.service'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'
import { useRef } from 'react'

type Props = {
  label?: string
  value: string[]
  onChange: (urls: string[]) => void
  accept?: string
  multiple?: boolean
  maxFiles?: number
  disabled?: boolean
}

export default function MultiFileUploader({
  label = 'Upload',
  value,
  onChange,
  accept = 'image/*',
  multiple = true,
  maxFiles,
  disabled,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { uploadSingleFile, isUploading } = useUploadSingleFile()

  const handlePick = () => inputRef.current?.click()

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const selected = Array.from(files)

    // maxFiles guard
    if (maxFiles && (value?.length ?? 0) + selected.length > maxFiles) {
      alert(`You can upload maximum ${maxFiles} files`)
      if (inputRef.current) inputRef.current.value = ''
      return
    }

    try {
      // Upload all selected files
      const uploadedUrls = await Promise.all(
        selected.map((f) => uploadSingleFile(f)),
      )

      onChange([...(value ?? []), ...uploadedUrls])
    } catch (e: any) {
      console.error(e)
      alert(e?.message || 'Upload failed')
    } finally {
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const removeAt = (idx: number) => {
    const next = (value ?? []).filter((_, i) => i !== idx)
    onChange(next)
  }

  const isImage = (url: string) => {
    const clean = url.split('?')[0]
    return /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(clean)
  }

  const allDisabled = disabled || isUploading

  return (
    <div className="space-y-2">
      {label ? <p className="text-sm font-medium">{label}</p> : null}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={allDisabled}
      />

      <Button
        type="button"
        variant="outline"
        onClick={handlePick}
        disabled={allDisabled}
        className="gap-2"
      >
        <Upload className="h-4 w-4" />
        {isUploading
          ? 'Uploading...'
          : multiple
            ? 'Choose Image(s)'
            : 'Choose Image'}
      </Button>

      {/* Preview list */}
      {value?.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {value.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className="relative overflow-hidden rounded-lg border"
            >
              {isImage(url) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={url}
                  alt="uploaded"
                  className="h-28 w-full object-cover"
                />
              ) : (
                <div className="p-3 text-xs break-all">{url}</div>
              )}

              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="absolute right-1 top-1 rounded-full bg-black/40 p-1 text-white"
                disabled={allDisabled}
                title="Remove"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">No image uploaded</div>
      )}
    </div>
  )
}
