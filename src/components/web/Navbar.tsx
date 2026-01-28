'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'How it works', href: '#how' },
  { label: 'Impact', href: '#impact' },
  { label: 'Location', href: '#location' },
  { label: 'Get involved', href: '#get-involved' },
  { label: 'Updates / Stories', href: '#updates' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50  bg-transparent  border-b-[1.5px]  border-[#ffffff80] ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-2 text-white">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7.5 18.5h9.4c2.2 0 4.1-1.7 4.1-3.9 0-2-1.5-3.6-3.4-3.9-.4-3-2.9-5.3-6-5.3-2.6 0-4.8 1.6-5.7 3.9-2.1.2-3.9 2-3.9 4.2 0 2.4 2 4 4.5 4z"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span className="text-sm font-semibold tracking-wide">
              PoP Water Tower
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/80 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white transition"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
