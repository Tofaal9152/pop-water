export default function WhatChangesWithPop() {
  const card =
    'rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.75)]'

  const li = 'flex items-start gap-3 text-sm text-white/70'
  const icon = 'mt-0.5'

  return (
    <section className=" text-white border-t border-white/10">
      <div className="mx-auto container py-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="h-8 w-fit rounded-full bg-white/10 flex items-center justify-center px-4 text-sm font-semibold">
            The Ripple Effect{' '}
          </div>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight">
            What Changes With PoP
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Reliable water access transforms daily life—especially for women,
            girls, and remote communities.
          </p>
        </div>

        <div className="relative mt-10">
          <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.12),rgba(0,0,0,0)_70%)] blur-2xl" />

          <div className="relative grid gap-6 md:grid-cols-2">
            {/* Left */}
            <div className={card}>
              <h3 className="text-sm font-semibold text-white/90">
                The problem (Hill tracts)
              </h3>

              <ul className="mt-5 space-y-4">
                <li className={li}>
                  <span className={icon}>🧭</span>
                  <span>60% families drink unsafe water</span>
                </li>
                <li className={li}>
                  <span className={icon}>🏥</span>
                  <span>Water diseases are among top causes of death</span>
                </li>
                <li className={li}>
                  <span className={icon}>⏳</span>
                  <span>Women and girls walk 1–2 hours daily for water</span>
                </li>
              </ul>
            </div>

            {/* Right */}
            <div className={card}>
              <h3 className="text-sm font-semibold text-white/90">
                What changes with PoP
              </h3>

              <ul className="mt-5 space-y-4">
                <li className={li}>
                  <span className={icon}>💙</span>
                  <span>Safe water all year</span>
                </li>
                <li className={li}>
                  <span className={icon}>👧</span>
                  <span>Girls go to school</span>
                </li>
                <li className={li}>
                  <span className={icon}>🛟</span>
                  <span>Women stay safe in monsoon</span>
                </li>
                <li className={li}>
                  <span className={icon}>🙂</span>
                  <span>Health improves</span>
                </li>
              </ul>

              {/* Callout */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold text-white/90">
                  Climate Justice
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  PoP uses no fuel. Each tower saves about 0.6 tons of CO₂ by
                  replacing diesel pumps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
