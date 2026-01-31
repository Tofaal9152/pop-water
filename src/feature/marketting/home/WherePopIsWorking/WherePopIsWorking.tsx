'use client'

import { WherePopIsWorkingPath } from '@/constants/imagePath'
import React, { useEffect, useMemo, useState } from 'react'

type LocationKey = 'rangamati' | 'bandarban' | 'khagrachari'

type LocationItem = {
  id: LocationKey
  name: string
  // stylized region path (inside BD outline)
  d: string
  // optional label position for marker
  marker: { x: number; y: number }
  images: string[]
}

function Gallery({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white/90">{title}</div>
          <div className="mt-1 text-xs text-white/55">
            Tower photos from this location
          </div>
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
          {images.length} photos
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20"
          >
            <img
              src={src}
              alt=""
              className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
          </div>
        ))}
      </div>
    </div>
  )
}

function Tabs({
  items,
  activeId,
  onSelect,
}: {
  items: { id: LocationKey; name: string }[]
  activeId: LocationKey
  onSelect: (id: LocationKey) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => {
        const active = t.id === activeId
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            className={[
              'rounded-full px-4 py-2 text-xs font-semibold transition',
              'border',
              active
                ? 'border-emerald-200/25 bg-emerald-200/10 text-white shadow-[0_18px_70px_rgba(16,185,129,0.12)]'
                : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/8',
            ].join(' ')}
          >
            {t.name}
          </button>
        )
      })}
    </div>
  )
}

export default function WherePopIsWorking() {
  // 🔁 Replace these with your real tower image URLs per location
  const LOCATIONS: LocationItem[] = useMemo(
    () => [
      {
        id: 'rangamati',
        name: 'Rangamati',
        // stylized region (SE hills)
        d: 'M300 300 C330 260, 380 260, 400 300 C420 340, 390 380, 350 390 C320 398, 280 350, 300 300 Z',
        marker: { x: 360, y: 325 },
        images: [
          WherePopIsWorkingPath.image1,
          WherePopIsWorkingPath.image2,
          WherePopIsWorkingPath.image3,
        ],
      },
      {
        id: 'khagrachari',
        name: 'Khagrachari',
        d: 'M260 250 C285 215, 330 215, 345 250 C360 285, 330 310, 295 305 C270 300, 245 275, 260 250 Z',
        marker: { x: 300, y: 265 },
        images: [
          WherePopIsWorkingPath.image3,
          WherePopIsWorkingPath.image1,
          WherePopIsWorkingPath.image2,
        ],
      },
      {
        id: 'bandarban',
        name: 'Bandarban',
        d: 'M395 330 C430 320, 465 350, 460 390 C455 430, 420 460, 385 445 C350 430, 345 380, 365 350 C375 335, 385 333, 395 330 Z',
        marker: { x: 415, y: 390 },
        images: [
          WherePopIsWorkingPath.image1,
          WherePopIsWorkingPath.image3,
          WherePopIsWorkingPath.image2,
        ],
      },
    ],
    [],
  )

  const [activeId, setActiveId] = useState<LocationKey>('rangamati')

  // ✅ auto-click rotate every 3s
  useEffect(() => {
    const ids = LOCATIONS.map((l) => l.id)
    const t = window.setInterval(() => {
      setActiveId((prev) => {
        const i = ids.indexOf(prev)
        const next = ids[(i + 1) % ids.length]
        return next
      })
    }, 3000)

    return () => window.clearInterval(t)
  }, [LOCATIONS])

  const activeLocation =
    LOCATIONS.find((l) => l.id === activeId) ?? LOCATIONS[0]

  return (
    <section
      className="text-white border-t border-white/10"
      id="where-pop-is-working"
    >
      <div className="mx-auto container py-16">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="h-8 w-fit rounded-full bg-white/10 flex items-center justify-center px-4 text-sm font-semibold">
              The Roadmap
            </div>

            <h2 className="mt-6 text-4xl font-extrabold tracking-tight">
              Where PoP Is Working
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-white/60">
              PoP towers stand in the Chittagong Hill Tracts, one of the most
              climate-vulnerable regions in Bangladesh.
            </p>
          </div>

          <Tabs
            items={LOCATIONS.map((l) => ({ id: l.id, name: l.name }))}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </div>

        {/* Content */}
        <div className="relative mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: Outlined Map */}
          <div className="rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white/90">
                  Bangladesh Map
                </div>
                <div className="mt-1 text-xs text-white/55">
                  Click a highlighted region to view towers
                </div>
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                Auto rotates • 3s
              </div>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-[20px] border border-white/10 bg-black/15">
              {/* Glow */}
              <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(55%_55%_at_50%_40%,rgba(255,255,255,0.10),rgba(0,0,0,0)_70%)] blur-2xl" />

              <svg
                viewBox="0 0 560 620"
                className="relative h-[420px] w-full"
                role="img"
                aria-label="Bangladesh map with highlighted PoP locations"
              >
                {/* BD outline (stylized) */}
                <path
                  d="M170 60 C120 130, 95 220, 120 280 C145 340, 135 380, 150 430 C175 510, 260 570, 330 560 C420 545, 470 470, 460 390 C455 330, 500 290, 495 230 C490 170, 430 120, 380 95 C320 65, 240 40, 170 60 Z"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="3"
                />

                {/* inner “division” lines (subtle, decorative) */}
                <path
                  d="M210 120 C200 200, 240 240, 220 320"
                  fill="none"
                  stroke="rgba(255,255,255,0.20)"
                  strokeWidth="2"
                />
                <path
                  d="M310 110 C290 200, 330 260, 320 360"
                  fill="none"
                  stroke="rgba(255,255,255,0.20)"
                  strokeWidth="2"
                />
                <path
                  d="M390 160 C360 220, 410 270, 380 340"
                  fill="none"
                  stroke="rgba(255,255,255,0.20)"
                  strokeWidth="2"
                />

                {/* Highlight regions */}
                {LOCATIONS.map((loc) => {
                  const isActive = loc.id === activeId
                  return (
                    <g key={loc.id}>
                      {/* glow behind active */}
                      {isActive ? (
                        <path
                          d={loc.d}
                          fill="rgba(16,185,129,0.22)"
                          opacity="1"
                          filter="url(#softGlow)"
                        />
                      ) : null}

                      <path
                        d={loc.d}
                        onClick={() => setActiveId(loc.id)}
                        style={{ cursor: 'pointer' }}
                        fill={
                          isActive
                            ? 'rgba(16,185,129,0.22)'
                            : 'rgba(255,255,255,0.08)'
                        }
                        stroke={
                          isActive
                            ? 'rgba(16,185,129,0.70)'
                            : 'rgba(255,255,255,0.22)'
                        }
                        strokeWidth={2.5}
                      />

                      {/* marker dot */}
                      <circle
                        cx={loc.marker.x}
                        cy={loc.marker.y}
                        r={isActive ? 6 : 5}
                        fill={
                          isActive
                            ? 'rgba(16,185,129,0.95)'
                            : 'rgba(255,255,255,0.65)'
                        }
                        stroke="rgba(0,0,0,0.35)"
                        strokeWidth={2}
                      />
                    </g>
                  )
                })}

                <defs>
                  <filter
                    id="softGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="10" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>

            {/* small legend */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/55">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/90" />
                Active location
              </span>
              <span className="text-white/25">•</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
                Available location
              </span>
            </div>
          </div>

          {/* Right: Gallery */}
          <Gallery images={activeLocation.images} title={activeLocation.name} />
        </div>
      </div>
    </section>
  )
}

// import { WherePopIsWorkingPath } from '@/constants/imagePath'
// import MapOSM from './MapOSM'

// export default function WherePopIsWorking() {
//   return (
//     <section className="text-white border-t border-white/10">
//       <div className="mx-auto container py-16">
//         {/* Header */}
//         <div className="max-w-3xl">
//           <div className="h-8 w-fit rounded-full bg-white/10 flex items-center justify-center px-4 text-sm font-semibold">
//             The Roadmap
//           </div>

//           <h2 className="mt-6 text-4xl font-extrabold tracking-tight">
//             Where PoP Is Working
//           </h2>

//           <p className="mt-3 text-sm leading-relaxed text-white/60">
//             PoP towers stand in the Chittagong Hill Tracts, one of the most
//             climate-vulnerable regions in Bangladesh.
//           </p>
//         </div>

//         {/* Content */}
//         <div className="relative mt-10">
//           <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.12),rgba(0,0,0,0)_70%)] blur-2xl" />

//           {/* ✅ Make both columns stretch to same height */}
//           <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-stretch">
//             {/* Left: Map Card */}
//             <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.75)]">
//               {/* ✅ Force map height */}
//               <div className="h-[520px] w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
//                 <MapOSM />
//               </div>
//             </div>

//             {/* Right: Gallery */}
//             {/* ✅ Same height as map */}
//             <div className="flex h-[520px] flex-col gap-3">
//               {/* ✅ Grid takes full height, 2 rows equal */}
//               <div className="grid h-full grid-cols-2 grid-rows-2 gap-5">
//                 <img
//                   className="h-full w-full rounded-[22px] border border-white/10 object-cover"
//                   src={WherePopIsWorkingPath.image1}
//                   alt="Hill view"
//                   loading="lazy"
//                 />
//                 <img
//                   className="h-full w-full rounded-[22px] border border-white/10 object-cover"
//                   src={WherePopIsWorkingPath.image2}
//                   alt="Green landscape"
//                   loading="lazy"
//                 />
//                 <img
//                   className="h-full w-full rounded-[22px] border border-white/10 object-cover"
//                   src={WherePopIsWorkingPath.image3}
//                   alt="River"
//                   loading="lazy"
//                 />
//                 <img
//                   className="h-full w-full rounded-[22px] border border-white/10 object-cover"
//                   src={WherePopIsWorkingPath.image4}
//                   alt="City"
//                   loading="lazy"
//                 />
//               </div>

//               <p className="text-sm font-semibold text-white/70">
//                 Photos from the Chittagong PoP Water project site and surrounding
//                 areas.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
