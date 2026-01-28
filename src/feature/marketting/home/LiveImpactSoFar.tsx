import { liveImpactImages } from '@/constants/imagePath'
import React from 'react'

export default function LiveImpactSoFar() {
  const metricItem = (value: string, label: string) => (
    <div>
      <div className="text-[22px] font-extrabold tracking-tight text-white">
        {value}
      </div>
      <div className="mt-2 text-[12px] text-white/55">{label}</div>
    </div>
  )

  const statCard = (value: string, label: string) => (
    <div className="rounded-[22px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] px-6 py-5 shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
      <div className="text-[20px] font-extrabold text-white">{value}</div>
      <div className="mt-1 text-[12px] text-white/55">{label}</div>
    </div>
  )

  return (
    <section className="relative text-white border-t border-white/10 overflow-hidden">
      <div className="mx-auto container py-16">
        {/* ✅ glow must be inside a relative parent */}
        <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(60%_60%_at_25%_30%,rgba(255,255,255,0.12),rgba(0,0,0,0)_70%)] blur-2xl md:block hidden" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_520px] items-start">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <h2 className="text-[36px] font-extrabold leading-[1.05] tracking-tight">
              Live Impact <br className="hidden sm:block" /> (So Far)
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-white/60">
              <span>Zero energy</span>
              <span className="text-white/25">•</span>
              <span>💧</span>
              <span>Water from air &amp; rain</span>
            </div>

            {/* ✅ pill like previous */}
            <div className="mt-6 inline-flex h-10 items-center rounded-full bg-[#2EE9D1]/15 px-5 text-[12px] font-semibold text-white ring-1 ring-[#2EE9D1]/25">
              Live Count
            </div>

            {/* Metrics */}
            <div className="mt-10 grid gap-x-20 gap-y-10 sm:grid-cols-2">
              <div className="space-y-10">
                {metricItem('10,000 L/week', 'Water Harvested')}
                {metricItem('1–2 hours/day', 'Hours Saved')}
              </div>
              <div className="space-y-10">
                {metricItem('0.6T / 36 weeks', 'CO₂ Offset')}
                {metricItem('22 Years', 'Lifespan of each tower')}
              </div>
            </div>

            {/* Bottom cards */}
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {statCard('6', 'Villages')}
              {statCard('11', 'Towers')}
              {statCard('895', 'Lives improved')}
            </div>
          </div>

          {/* RIGHT ILLUSTRATION PANEL (same design style) */}
          <div className="rounded-[28px flex items-center justify-center mt-4 ">
            <img
              src={liveImpactImages.image1}
              alt="Live impact illustration"
              className=" w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
