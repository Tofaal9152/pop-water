import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useRef } from 'react'

import { useOutsideClick } from '@/hooks/use-outside-click'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

type AppModalProps = {
  open: boolean
  onClose: () => void

  /** Optional: framer shared layout ids */
  layoutId?: string
  categoryLayoutId?: string
  titleLayoutId?: string

  /** Content */
  category?: React.ReactNode
  title?: React.ReactNode
  children: React.ReactNode

  /** Styling overrides if needed */
  backdropClassName?: string
  panelClassName?: string

  /** Turn off body lock if you need */
  lockBodyScroll?: boolean
}

export const AppModal = ({
  open,
  onClose,
  layoutId,
  categoryLayoutId,
  titleLayoutId,
  category,
  title,
  children,
  backdropClassName,
  panelClassName,
  lockBodyScroll = true,
}: AppModalProps) => {
  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>

  // Outside click
  useOutsideClick(containerRef, () => {
    if (open) onClose()
  })

  // ESC + body scroll lock
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    if (open) {
      window.addEventListener('keydown', onKeyDown)

      if (lockBodyScroll) document.body.style.overflow = 'hidden'
    } else {
      if (lockBodyScroll) document.body.style.overflow = 'auto'
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (lockBodyScroll) document.body.style.overflow = 'auto'
    }
  }, [open, onClose, lockBodyScroll])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[1000] h-screen overflow-auto flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.45, ease: 'easeOut' },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.35, ease: 'easeIn' },
            }}
            className={cn(
              'fixed inset-0 h-full w-full bg-black/50 backdrop-blur',
              backdropClassName,
            )}
          />

          {/* Panel */}
          <motion.div
            ref={containerRef}
            layoutId={layoutId}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{
              opacity: 0,
              y: 18,
              scale: 0.98,
              transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            }}
            className={cn(
              'relative z-[60]  mx-auto my-10 h-fit  rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900',
              panelClassName,
            )}
          >
            <button
              className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-neutral-100 dark:text-neutral-900 cursor-pointer" />
            </button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.16, duration: 0.45 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
