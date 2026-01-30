import { JoinHarvestPath, WhatChangesWithPopPath } from '@/constants/imagePath'

export default function WhatChangesWithPop({}) {
  const card =
    'rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.75)]'

  const stat =
    'rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col gap-2'

  const impact =
    'flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5'

  return (
    <section className="border-t border-white/10 text-white">
      <div className="container mx-auto py-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-wide">
            The Ripple Effect
          </div>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight">
            What Changes With PoP
          </h2>

          <p className="mt-3 text-sm text-white/60">
            One water tower reshapes health, safety, education, and climate
            outcomes.
          </p>
        </div>

        {/* Two Column: Left Content + Right Image */}
        <div className="relative mt-12">
          {/* glow */}
          <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.12),rgba(0,0,0,0)_70%)] blur-2xl" />

          <div className="relative grid gap-6 lg:grid-cols-2 lg:items-stretch">
            {/* LEFT: Content */}
            <div className={card}>
              <h3 className="text-sm font-semibold text-white/80">
                Before → After (Hill Tracts)
              </h3>

              {/* Stats */}
              <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className={stat}>
                  <div className="text-3xl font-extrabold text-white">60%</div>
                  <div className="text-xs text-white/60">
                    Families drink unsafe water
                  </div>
                </div>

                <div className={stat}>
                  <div className="text-3xl font-extrabold text-white">
                    1–2 hrs
                  </div>
                  <div className="text-xs text-white/60">
                    Daily water collection (women & girls)
                  </div>
                </div>

                <div className={stat}>
                  <div className="text-3xl font-extrabold text-white">
                    Top cause
                  </div>
                  <div className="text-xs text-white/60">
                    Waterborne disease deaths
                  </div>
                </div>
              </div>

              {/* Impacts */}
              <div className="mt-6 space-y-4">
                <div className={impact}>
                  <span className="text-xl">💧</span>
                  <div>
                    <div className="text-sm font-semibold">Safe water</div>
                    <div className="text-xs text-white/60">
                      Available all year
                    </div>
                  </div>
                </div>

                <div className={impact}>
                  <span className="text-xl">🎒</span>
                  <div>
                    <div className="text-sm font-semibold">
                      Girls return to school
                    </div>
                    <div className="text-xs text-white/60">
                      No daily water walks
                    </div>
                  </div>
                </div>

                <div className={impact}>
                  <span className="text-xl">🛟</span>
                  <div>
                    <div className="text-sm font-semibold">Safer monsoons</div>
                    <div className="text-xs text-white/60">
                      No risky crossings
                    </div>
                  </div>
                </div>

                <div className={impact}>
                  <span className="text-xl">❤️</span>
                  <div>
                    <div className="text-sm font-semibold">Better health</div>
                    <div className="text-xs text-white/60">
                      Fewer waterborne illnesses
                    </div>
                  </div>
                </div>
              </div>

              {/* Climate Metric */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-5">
                <div className="text-sm font-semibold text-white">
                  Climate Impact
                </div>
                <div className="mt-2 text-2xl font-extrabold text-white">
                  −0.6 tons CO₂ / year
                </div>
                <div className="text-xs text-white/60">
                  Per tower · diesel-free water access
                </div>
              </div>
            </div>

            {/* RIGHT: Image */}
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#050C14] shadow-[0_30px_120px_rgba(0,0,0,0.75)]">
              {/* Image */}
              <img
                src={WhatChangesWithPopPath.image1}
                alt="Water tower impact illustration"
                className="h-full w-full animate-pulse"
                loading="lazy"
              />
            </div>
          </div>

          {/* Optional: subtle divider line under */}
          <div className="mt-8 h-px w-full bg-white/10" />
        </div>
      </div>
    </section>
  )
}
