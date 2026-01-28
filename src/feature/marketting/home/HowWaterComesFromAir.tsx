import React, { useState } from 'react'
import { AppModal } from '@/components/ui/AppModal'
import { HowWaterComesFromAirPath } from '@/constants/imagePath'

export default function HowWaterComesFromAir() {
  const [open, setOpen] = useState(false)

  const card =
    'rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0E2239] via-[#081A2E] to-[#051221] shadow-[0_28px_90px_rgba(0,0,0,0.75)]'

  const mini =
    'rounded-[22px] border border-white/10 bg-gradient-to-b from-[#0E2239] via-[#081A2E] to-[#051221] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.65)]'

  return (
    <section className=" text-white border-t border-white/10">
      <div className="mx-auto container py-16">
        {/* Header */}
        <div className="relative max-w-3xl">
          <div className="inline-flex h-9 items-center rounded-full bg-[#28E7D2] px-4 text-xs font-semibold text-black">
            The Tech
          </div>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight">
            How Water Comes From Air
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-white/60">
            PoP works like a mountain forest. When clouds, fog, and rain touch
            the tower’s special net, tiny water drops form and slide down into a
            reservoir.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Octagon bamboo frames + technical mesh canopy + funnel system.
            Bamboo legs are buried deep—built to survive storms and cyclones.
          </p>
        </div>

        {/* Content */}
        <div className="relative mt-10">
          {/* outer dusty glow */}
          <div className="pointer-events-none absolute -inset-10 rounded-[46px] bg-[radial-gradient(55%_55%_at_50%_45%,rgba(255,255,255,0.14),rgba(0,0,0,0)_72%)] blur-3xl" />

          <div className="relative grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            {/* Left: Thumbnail Card */}
            <div className={`${card}`}>
              <div className="rounded-[22px] border border-white/10 bg-black/30 p-4">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="group relative block w-full overflow-hidden rounded-[18px] border border-white/10 bg-[#071425] focus:outline-none"
                  aria-label="Play video"
                >
                  <img
                    src={HowWaterComesFromAirPath.videoThumbnail}
                    alt="Video thumbnail"
                    className="w-full object-cover aspect-video"
                    loading="lazy"
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/10 opacity-95 transition group-hover:opacity-100" />

                  {/* play icon */}
                  <div className="absolute inset-0 grid place-items-center cursor-pointer">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 backdrop-blur-sm transition group-hover:scale-[1.03]">
                      <div className="ml-1 h-0 w-0 border-y-[9px] border-l-[16px] border-y-transparent border-l-white/90 animate-pulse" />
                    </div>
                  </div>

                  <div className="absolute left-5 top-4 text-xs font-semibold text-white/65 bg-black/30 px-2 py-1 rounded-md">
                    PoP Water explainer video thumbnail
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Stats */}
            <div className="flex flex-col gap-5">
              <div className={mini}>
                <div className="text-xs font-semibold text-white/45">
                  Water Harvest
                </div>
                <div className="mt-2 text-2xl font-extrabold">
                  10,000 liters / week
                </div>
                <div className="mt-1 text-xs text-white/50">
                  Per tower (approx.)
                </div>
              </div>

              <div className={mini}>
                <div className="text-xs font-semibold text-white/45">
                  CO₂ Offset
                </div>
                <div className="mt-2 text-2xl font-extrabold">
                  0.6T CO₂ / 36 weeks
                </div>
                <div className="mt-1 text-xs text-white/50">
                  By replacing diesel pumps
                </div>
              </div>

              <div className={mini}>
                <div className="text-xs font-semibold text-white/45">
                  Lifespan
                </div>
                <div className="mt-2 text-2xl font-extrabold">22 Years</div>
                <div className="mt-1 text-xs text-white/50">
                  Long-term, low-maintenance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Modal */}
        <AppModal
          open={open}
          onClose={() => setOpen(false)}
          panelClassName="max-w-5xl w-[92vw] bg-black text-white border border-white/10 p-4 md:p-6"
          backdropClassName="bg-black/60"
        >
          <div className="space-y-3">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <div className="aspect-video">
                {/* key changes so close করলে iframe reset হয় */}
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
