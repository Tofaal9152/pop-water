import { Link } from '@tanstack/react-router'
import { AlertTriangle, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#010e1f] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
          <AlertTriangle className="h-10 w-10 text-[#C8B27A]" />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
          Page not found
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          The page you are looking for doesn’t exist or may have been moved.
          Let’s get you back on track.
        </p>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#C8B27A] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#d8c489] transition"
          >
            <Home size={16} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
