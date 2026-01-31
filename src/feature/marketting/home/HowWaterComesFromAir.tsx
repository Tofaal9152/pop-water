'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { AppModal } from '@/components/ui/AppModal'
import { HowWaterComesFromAirPath } from '@/constants/imagePath'
import {
  Cloud,
  LayoutGrid,
  Filter,
  Droplets,
  Leaf,
  Timer,
  Play,
} from 'lucide-react'

/** ---------- Small Spec Pill (overlay) ---------- */
function SpecPill({
  icon: Icon,
  label,
  value,
  tone = 'cyan',
}: {
  icon: React.ElementType
  label: string
  value: string
  tone?: 'cyan' | 'green' | 'amber'
}) {
  const toneClasses =
    tone === 'cyan'
      ? 'border-cyan-300/20 bg-cyan-300/10 text-cyan-50 shadow-[0_18px_70px_rgba(34,211,238,0.12)]'
      : tone === 'green'
        ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-50 shadow-[0_18px_70px_rgba(16,185,129,0.12)]'
        : 'border-amber-300/20 bg-amber-300/10 text-amber-50 shadow-[0_18px_70px_rgba(245,158,11,0.12)]'

  return (
    <div
      className={[
        'w-[220px] rounded-2xl border backdrop-blur-md',
        'px-4 py-3',
        'ring-1 ring-white/10',
        toneClasses,
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
          <Icon className="h-4 w-4 text-white/80" />
        </div>

        <div className="min-w-0">
          <div className="text-[11px] font-semibold text-white/65">{label}</div>
          <div className="mt-0.5 text-[13px] font-extrabold tracking-tight text-white">
            {value}
          </div>
        </div>
      </div>
    </div>
  )
}

/** ---------- Flow Nodes ---------- */
function Node({
  icon: Icon,
  label,
  index,
  activeStep,
}: {
  icon: React.ElementType
  label: string
  index: number
  activeStep: number
}) {
  const isDone = index < activeStep
  const isActive = index === activeStep

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          'grid h-11 w-11 place-items-center rounded-2xl border backdrop-blur-md transition-all duration-500',
          isActive
            ? 'border-emerald-200/35 bg-emerald-200/12 shadow-[0_16px_55px_rgba(16,185,129,0.12)]'
            : isDone
              ? 'border-emerald-200/25 bg-emerald-200/10'
              : 'border-white/12 bg-white/6',
        ].join(' ')}
      >
        <Icon
          className={[
            'h-5 w-5 transition-colors duration-500',
            isActive
              ? 'text-emerald-100'
              : isDone
                ? 'text-emerald-200/90'
                : 'text-white/70',
          ].join(' ')}
        />
      </div>

      <div className="text-[11px] font-semibold tracking-wide text-white/70">
        {label}
      </div>
    </div>
  )
}

/** ---------- Apple-like Curved Flow Graphic ---------- */
function WaterPathFlow() {
  const steps = useMemo(
    () => [
      { icon: Cloud, label: 'Cloud / Fog' },
      { icon: LayoutGrid, label: 'Mesh Net' },
      { icon: Filter, label: 'Funnel' },
      { icon: Droplets, label: 'Tank' },
    ],
    [],
  )

  const [active, setActive] = useState(0)

  useEffect(() => {
    let t: number
    const isLast = active === steps.length - 1
    const delay = isLast ? 4200 : 1800

    t = window.setTimeout(() => {
      setActive((s) => (s === steps.length - 1 ? 0 : s + 1))
    }, delay)

    return () => window.clearTimeout(t)
  }, [active, steps.length])

  const progress = active / (steps.length - 1)

  return (
    <div className="relative mt-6 rounded-[20px] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-md">
      <svg
        className="pointer-events-none absolute inset-y-0 left-6 right-6"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flowStrokeThin2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="0.5" stopColor="rgba(255,255,255,0.34)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.14)" />
          </linearGradient>
        </defs>

        <path
          d="M125 70 C 270 10, 355 10, 375 55
             C 395 100, 605 100, 625 55
             C 645 10, 730 10, 875 70"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M125 70 C 270 10, 355 10, 375 55
             C 395 100, 605 100, 625 55
             C 645 10, 730 10, 875 70"
          fill="none"
          stroke="url(#flowStrokeThin2)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
          style={{ transition: 'stroke-dashoffset 650ms ease' }}
        />
      </svg>

      <div className="relative grid grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.label} className="flex justify-center">
            <Node icon={s.icon} label={s.label} index={i} activeStep={active} />
          </div>
        ))}
      </div>

      <div className="relative mt-3 text-[11px] text-white/55">
        Step {active + 1} of {steps.length}
      </div>
    </div>
  )
}

/** ---------- Main Section ---------- */
export default function HowWaterComesFromAir() {
  const [open, setOpen] = useState(false)

  const card =
    'rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0E2239] via-[#081A2E] to-[#051221] shadow-[0_28px_90px_rgba(0,0,0,0.75)]'

  return (
    <section
      className="border-t border-white/10 text-white"
      id="how-water-comes-from-air"
    >
      <div className="mx-auto container py-16">
        {/* Header */}
        <div className="relative max-w-4xl">
          <div className="inline-flex h-9 items-center rounded-full bg-[#28E7D2] px-4 text-xs font-semibold text-black">
            The Tech
          </div>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight">
            How Water Comes From Air
          </h2>

          <p className="mt-3 text-sm text-white/60">
            From cloud & fog capture to collection—step by step.
          </p>
        </div>

        {/* Flow */}
        <WaterPathFlow />

        {/* Content */}
        <div className="relative mt-10">
          <div className="pointer-events-none absolute -inset-10 rounded-[46px] bg-[radial-gradient(55%_55%_at_50%_45%,rgba(255,255,255,0.14),rgba(0,0,0,0)_72%)] blur-3xl" />

          <div className="relative grid gap-6 sm:grid-cols-2 ">
            {/* Left: Video Card */}
            <div className={card}>
              <div className="p-5">
                <div className="rounded-[22px] border border-white/10 bg-black/25 p-4">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="group relative block w-full overflow-hidden rounded-[18px] border border-white/10 bg-[#071425] focus:outline-none"
                    aria-label="Play video"
                  >
                    <img
                      src={HowWaterComesFromAirPath.videoThumbnail}
                      alt="Video thumbnail"
                      className="aspect-video w-full object-cover"
                      loading="lazy"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10 opacity-95 transition group-hover:opacity-100" />

                    {/* play button */}
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="grid h-16 w-16 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 backdrop-blur-sm transition group-hover:scale-[1.04]">
                        <Play className="ml-0.5 h-6 w-6 text-white/90" />
                      </div>
                    </div>

                    {/* label */}
                    <div className="absolute left-5 top-4 rounded-md bg-black/35 px-2 py-1 text-xs font-semibold text-white/70">
                      PoP Water explainer
                    </div>
                  </button>

                  <div className="mt-4 flex items-center gap-2 text-xs text-white/55">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300/70" />
                    Tap to watch the explainer video
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Image Card + Overlay Spec Pills */}
            <div className={card}>
              <div className="relative overflow-hidden rounded-[28px]">
                <img
                  src={HowWaterComesFromAirPath.image2}
                  alt="How Water Comes From Air"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                {/* cinematic overlays */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <AppModal
          open={open}
          onClose={() => setOpen(false)}
          panelClassName="max-w-5xl w-[92vw] bg-black text-white border border-white/10 p-4 md:p-6"
          backdropClassName="bg-black/60"
        >
          <div className="space-y-3">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <div className="aspect-video">
                {open && (
                  <iframe
                    key={open ? 'open' : 'closed'}
                    className="h-full w-full"
                    src={HowWaterComesFromAirPath.videoURL}
                    title="PoP explainer"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
        </AppModal>
      </div>
    </section>
  )
}
