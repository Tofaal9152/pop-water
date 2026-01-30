'use client'

import { WhatWaterMakesPossiblePath } from '@/constants/imagePath'
import { Target } from 'lucide-react'

export default function WhatWaterMakesPossible() {
  const shell =
    'rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] shadow-[0_30px_120px_rgba(0,0,0,0.75)]'

  const card =
    'group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]'

  const chip =
    'inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] text-white/70'

  return (
    <section className="border-t border-white/10 text-white">
      <div className="container mx-auto py-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex h-8 items-center rounded-full bg-white/10 px-4 text-xs font-semibold">
            The Roadmap
          </div>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight">
            What Water Makes Possible
          </h2>

          <p className="mt-3 text-sm text-white/60">
            Safe water unlocks livelihoods, education, and healthcare—especially
            in remote hill communities.
          </p>
        </div>

        {/* Content */}
        <div className="relative mt-10">
          {/* glow */}
          <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.12),rgba(0,0,0,0)_70%)] blur-2xl" />

          <div className={`relative ${shell} p-6 md:p-8`}>
            {/* AI chips */}
            <div className="flex flex-wrap gap-2 text-[12px] text-white/60">
              <span className={chip}>Zero energy</span>
              <span className={chip}>Year-round water</span>
              <span className={chip}>Local income</span>
              <span className={chip}>Climate-safe</span>
            </div>

            {/* Cards */}
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {/* Farms */}
              <div className={card}>
                <div className="relative  overflow-hidden">
                  <img
                    src={WhatWaterMakesPossiblePath.image1}
                    alt="Water enables farming"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050C14]/80 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-sm font-semibold">Farms</h3>
                  <p className="mt-2 text-sm text-white/60">
                    Drip irrigation enables dry-season crops.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className={chip}>50–60% less water</span>
                    <span className={chip}>Papaya</span>
                    <span className={chip}>Cotton</span>
                  </div>
                </div>
              </div>

              {/* Tourism */}
              <div className={card}>
                <div className="relative  overflow-hidden">
                  <img
                    src={WhatWaterMakesPossiblePath.image2}
                    alt="Eco tourism with water access"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050C14]/80 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-sm font-semibold">Tourism</h3>
                  <p className="mt-2 text-sm text-white/60">
                    Water supports eco-stays and local jobs.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className={chip}>6–8 cottages</span>
                    <span className={chip}>Local income</span>
                    <span className={chip}>Women-led</span>
                  </div>
                </div>
              </div>

              {/* Schools & Clinics */}
              <div className={card}>
                <div className="relative  overflow-hidden">
                  <img
                    src={WhatWaterMakesPossiblePath.image3}
                    alt="Schools and clinics with clean water"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050C14]/80 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-sm font-semibold">
                    Schools & Clinics
                  </h3>
                  <p className="mt-2 text-sm text-white/60">
                    Clean water improves learning and health.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className={chip}>Health ↑</span>
                    <span className={chip}>Attendance ↑</span>
                    <span className={chip}>Hygiene</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Future target */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-[rgba(46,233,209,0.25)]">
              <div className="bg-[rgba(46,233,209,0.08)] px-6 py-6">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Target className="h-5 w-5 text-white/80" />
                  <span>100 towers in 3 years → 10 new villages</span>
                </div>
                <p className="mt-1 text-sm text-white/60">
                  A scalable roadmap for long-term water security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
