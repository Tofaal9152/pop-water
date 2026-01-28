import { WherePopIsWorkingPath } from '@/constants/imagePath'
import MapOSM from './MapOSM'

export default function WherePopIsWorking() {
  return (
    <section className="text-white border-t border-white/10">
      <div className="mx-auto container py-16">
        {/* Header */}
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

        {/* Content */}
        <div className="relative mt-10">
          <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.12),rgba(0,0,0,0)_70%)] blur-2xl" />

          {/* ✅ Make both columns stretch to same height */}
          <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-stretch">
            {/* Left: Map Card */}
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.75)]">
              {/* ✅ Force map height */}
              <div className="h-[520px] w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
                <MapOSM />
              </div>
            </div>

            {/* Right: Gallery */}
            {/* ✅ Same height as map */}
            <div className="flex h-[520px] flex-col gap-3">
              {/* ✅ Grid takes full height, 2 rows equal */}
              <div className="grid h-full grid-cols-2 grid-rows-2 gap-5">
                <img
                  className="h-full w-full rounded-[22px] border border-white/10 object-cover"
                  src={WherePopIsWorkingPath.image1}
                  alt="Hill view"
                  loading="lazy"
                />
                <img
                  className="h-full w-full rounded-[22px] border border-white/10 object-cover"
                  src={WherePopIsWorkingPath.image2}
                  alt="Green landscape"
                  loading="lazy"
                />
                <img
                  className="h-full w-full rounded-[22px] border border-white/10 object-cover"
                  src={WherePopIsWorkingPath.image3}
                  alt="River"
                  loading="lazy"
                />
                <img
                  className="h-full w-full rounded-[22px] border border-white/10 object-cover"
                  src={WherePopIsWorkingPath.image4}
                  alt="City"
                  loading="lazy"
                />
              </div>

              <p className="text-sm font-semibold text-white/70">
                Photos from the Chittagong PoP Water project site and surrounding
                areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
