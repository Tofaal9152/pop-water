import { Button } from '@/components/ui/button'
import { JoinHarvestPath } from '@/constants/imagePath'

export default function JoinHarvestSection() {
  return (
    <section className=" text-white  border-t border-white/10">
      <div className="mx-auto container py-16">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="h-8 w-30 rounded-full bg-white/10 flex items-center justify-center px-4 text-sm font-semibold">
            Get Involved
          </div>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight">
            Join the Harvest
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Help a tower grow. Help a village drink.
          </p>
        </div>

        {/* Outer glow wrapper */}
        <div className="relative mt-10">
          <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.12),rgba(0,0,0,0)_70%)] blur-2xl" />

          <div className="relative grid gap-6 md:grid-cols-2">
            {/* LEFT BIG CARD */}
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.75)]">
              <div className="text-sm font-semibold text-white/90">
                What one tower gives
              </div>

              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <span className="text-base">💧</span>
                  <span>Safe water for 22 years</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-base">👨‍👩‍👧‍👦</span>
                  <span>Hundreds of lives supported</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-base">🌱</span>
                  <span>Zero energy consumption, low cost</span>
                </li>
              </ul>

              <h3 className="mt-6 text-2xl font-extrabold">
                Help a tower grow. Help a village drink.
              </h3>

              {/* Image block */}
              <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
                <div className="relative">
                  <img
                    src={JoinHarvestPath.image1}
                    alt="Tower"
                    className="h-[520px] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.75)]">
              <div className="text-sm font-semibold text-white/90">
                Get involved. Donate.
              </div>

              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <span className="text-base">💧</span>
                  <span>Every drop counts for a family</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-base">👨‍👩‍👧‍👦</span>
                  <span>Support your neighbors’ health</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-base">🌱</span>
                  <span>Make a lasting impact together</span>
                </li>
              </ul>

              {/* Sponsor box */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-semibold text-white/50">
                  Sponsor a tower
                </div>
                <div className="mt-2 text-2xl font-extrabold tracking-tight">
                  5,000 BDT
                </div>
                <div className="mt-2 text-xs text-white/55">
                  Directly funds one PoP Water Tower
                </div>
              </div>

              {/* Partnership box */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-semibold text-white/50">
                  Partnership
                </div>
                <div className="mt-2 text-base font-bold">
                  Climate &amp; Impact Collaboration
                </div>
                <div className="mt-2 text-xs text-white/55">
                  Work with PoP to scale safe water access
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-5 flex flex-wrap gap-3">
                <Button className="h-11 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 font-semibold text-black hover:opacity-95">
                  Sponsor a tower
                </Button>
                <Button
                  variant="secondary"
                  className="h-11 rounded-xl border border-white/10 bg-white/5 px-6 font-semibold text-white hover:bg-white/10"
                >
                  Partner
                </Button>
              </div>

              {/* Bottom image */}
              <div className="mt-6 overflow-hidden rounded-[20px] border border-white/10 bg-white/5">
                <img
                  src={JoinHarvestPath.image2}
                  alt="Sponsorship"
                  className=" w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
