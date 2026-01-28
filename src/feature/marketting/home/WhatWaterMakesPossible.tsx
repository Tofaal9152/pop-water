import { Target } from 'lucide-react'

export default function WhatWaterMakesPossible() {
  return (
    <section className=" text-white border-t border-white/10">
      <div className="mx-auto container py-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="h-8 w-30 rounded-full bg-white/10 flex items-center justify-center px-4 text-sm font-semibold">
            The Roadmap
          </div>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight">
            What Water Makes Possible
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Safe water unlocks livelihoods, education, and healthcare—especially
            in remote hill communities.
          </p>
        </div>

        {/* Cards area with glow */}
        <div className="relative mt-10">
          {/* subtle outer glow */}
          <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.12),rgba(0,0,0,0)_70%)] blur-2xl" />

          <div className="relative space-y-8">
            {/* 3 cards row */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Card 1 */}
              <div className="rounded-[22px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.75)]">
                <h3 className="text-sm font-semibold text-white/90">Farms</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Drip irrigation uses tiny pipes to slowly water plants. It
                  uses 50–60% less water and helps grow papaya and cotton even
                  in dry months.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-[22px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.75)]">
                <h3 className="text-sm font-semibold text-white/90">Tourism</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  One PoP Tower can supply water for 6–8 eco-tourism cottages,
                  creating local income.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-[22px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.75)]">
                <h3 className="text-sm font-semibold text-white/90">
                  Schools &amp; Clinics
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Clean water for learning and healing.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[rgba(46,233,209,0.25)]">
              <div className="bg-[rgba(46,233,209,0.08)] px-8 py-8 text-white">
                <div className="text-xl font-semibold text-white/80">
                  The Future
                </div>

                <div className="mt-2 flex items-center gap-2 text-lg font-semibold text-white/85">
                  <Target className="h-5 w-5 text-white/80" strokeWidth={2} />
                  <span>100 towers in 3 years, reaching 10 more villages.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
