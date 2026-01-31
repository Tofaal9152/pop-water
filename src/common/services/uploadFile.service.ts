import { env } from '@/config/env.server'
import { useCallback, useState } from 'react'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
console.log(env)
type UploadResponse = {
  secure_url?: string
  url?: string
  public_id?: string
}

async function cloudinaryUploadSingle(file: File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Missing Cloudinary env (CLOUD_NAME / UPLOAD_PRESET)')
  }

  // basic client-side guard (optional)
  const maxMB = 5
  if (file.size > maxMB * 1024 * 1024) {
    throw new Error(`File too large. Max ${maxMB}MB`)
  }

  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', UPLOAD_PRESET)

  // optional: folder (preset এ folder fixed থাকলে এটাও বাদ দিতে পারো)
  form.append('folder', 'towers')

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: form },
  )

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(txt || 'Cloudinary upload failed')
  }

  const data = (await res.json()) as UploadResponse
  const url = data.secure_url || data.url
  if (!url) throw new Error('No URL returned from Cloudinary')
  return url
}

export function useUploadSingleFile() {
  const [isUploading, setUploading] = useState(false)

  const uploadSingleFile = useCallback(async (file: File) => {
    setUploading(true)
    try {
      return await cloudinaryUploadSingle(file)
    } finally {
      setUploading(false)
    }
  }, [])

  return { uploadSingleFile, isUploading }
}

// import { useApiMutation } from '@/hooks/useApi'

// export function useUploadSingleFile() {
//   const upload = useApiMutation<any, FormData>({
//     method: 'POST',
//     url: '/upload-file/',
//   })

//   const uploadSingleFile = async (file: File) => {
//     const formData = new FormData()
//     formData.append('file', file)

//     const res = await upload.mutateAsync(formData)
//     const url = (res as any)?.stored_path

//     if (!url) throw new Error('Upload succeeded but URL was not returned')
//     return url as string
//   }

//   return {
//     uploadSingleFile,
//     isUploading: upload.isPending,
//     error: upload.error,
//   }
// }
