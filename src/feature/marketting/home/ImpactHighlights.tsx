'use client'

import React from 'react'
import { Bolt, Leaf, CloudRain, Users } from 'lucide-react'

function HighlightCard({
  icon: Icon,
  title,
  desc,
  tone = 'cyan',
}: {
  icon: React.ElementType
  title: string
  desc: string
  tone?: 'cyan' | 'green' | 'amber' | 'blue'
}) {
  const toneRing =
    tone === 'cyan'
      ? 'ring-cyan-300/15 border-cyan-200/15'
      : tone === 'green'
        ? 'ring-emerald-300/15 border-emerald-200/15'
        : tone === 'amber'
          ? 'ring-amber-300/15 border-amber-200/15'
          : 'ring-sky-300/15 border-sky-200/15'

  const toneGlow =
    tone === 'cyan'
      ? 'bg-[radial-gradient(60%_60%_at_30%_20%,rgba(34,211,238,0.18),rgba(0,0,0,0)_65%)]'
      : tone === 'green'
        ? 'bg-[radial-gradient(60%_60%_at_30%_20%,rgba(16,185,129,0.18),rgba(0,0,0,0)_65%)]'
        : tone === 'amber'
          ? 'bg-[radial-gradient(60%_60%_at_30%_20%,rgba(245,158,11,0.18),rgba(0,0,0,0)_65%)]'
          : 'bg-[radial-gradient(60%_60%_at_30%_20%,rgba(56,189,248,0.18),rgba(0,0,0,0)_65%)]'

  return (
    <div
      className={[
        'group relative overflow-hidden rounded-[22px]',
        'border border-white/10',
        'bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14]',
        'p-6 shadow-[0_26px_90px_rgba(0,0,0,0.6)]',
        'transition-transform duration-300 hover:-translate-y-1',
        'ring-1',
        toneRing,
      ].join(' ')}
    >
      {/* subtle glow */}
      <div
        className={[
          'pointer-events-none absolute -inset-10 opacity-70 blur-2xl',
          toneGlow,
        ].join(' ')}
      />

      {/* shimmer line */}
      <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full opacity-40">
        <div className="h-full w-1/3 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] group-hover:animate-[shimmer_1.2s_ease-in-out]" />
      </div>

      <div className="relative flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <Icon className="h-5 w-5 text-white/85" />
        </div>

        <div className="min-w-0">
          <div className="text-[14px] font-extrabold tracking-tight text-white">
            {title}
          </div>
          <div className="mt-1 text-[12px] leading-relaxed text-white/60">
            {desc}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(350%);
          }
        }
      `}</style>
    </div>
  )
}

export default function ImpactHighlights() {
  return (
    <section className="border-t border-white/10 text-white">
      <div className="container mx-auto py-16">
        {/* Header (optional) */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-wide">
            Why it matters
          </div>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight">
            Designed for real-world villages
          </h2>
          <p className="mt-3 text-sm text-white/60">
            Simple, resilient, and community-scale—built for long-term impact.
          </p>
        </div>

        {/* 4 cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <HighlightCard
            icon={Bolt}
            title="Zero energy used"
            desc="Operates passively—no electricity needed to harvest water."
            tone="cyan"
          />
          <HighlightCard
            icon={Leaf}
            title="Built with bamboo"
            desc="Locally sourced materials for low cost and easy maintenance."
            tone="green"
          />
          <HighlightCard
            icon={CloudRain}
            title="Collects rain & humidity"
            desc="Captures water from air and rainfall across seasons."
            tone="blue"
          />
          <HighlightCard
            icon={Users}
            title="Serves whole villages"
            desc="Community-scale access—supports families, schools, and clinics."
            tone="amber"
          />
        </div>
      </div>
    </section>
  )
}
