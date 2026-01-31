import { imagePath } from '@/constants/imagePath'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40) // 40px por blur start
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b-[1.5px] transition-all duration-300',
        scrolled
          ? 'bg-black/20 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
          : 'bg-transparent border-[#ffffff80]',
      ].join(' ')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <img src={imagePath.logo} alt="PoP Water Tower Logo" className='w-6 h-6' />

            <span className="text-sm font-semibold tracking-wide">
              PoP Water Tower
            </span>
          </div>

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
