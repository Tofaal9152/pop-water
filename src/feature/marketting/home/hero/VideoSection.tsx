import { AppModal } from '@/components/ui/AppModal'
import { HeroImagePath } from '@/constants/imagePath'
import React from 'react'

export const VideoSection = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="w-full">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-start md:gap-10">
        {/* LEFT: VIDEO CARD */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl text-left shadow-[0_22px_70px_rgba(0,0,0,0.6)] md:w-64"
        >
          {/* background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HeroImagePath.videoThumbnail})` }}
          />

          {/* soft overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/15 to-black/55" />

          {/* play ring (scaled) */}
          <div className="absolute left-1/2 top-20 h-26 w-26 -translate-x-1/2 rounded-full border border-white/45 bg-white/15 backdrop-blur-[2px]">
            <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/55 backdrop-blur-xl">
              <div className="absolute left-1/2 top-1/2 ml-0.5 h-0 w-0 -translate-x-1/2 -translate-y-1/2 border-y-12 border-l-22 border-y-transparent border-l-white/90" />
            </div>
          </div>

          {/* bottom blur bar */}
          <div className="absolute bottom-0 left-0 w-full rounded-b-xl bg-white/10 px-4 py-3 backdrop-blur-md">
            <div className="text-center text-[14px] font-semibold text-white">
              Watch PoP in Action
            </div>
          </div>
        </button>

        {/* RIGHT: TEXT */}
        <div className="w-full md:max-w-110">
          <h2 className="text-[32px] font-bold leading-[1.05] tracking-tight sm:text-[42px] md:text-[46px]">
            Safe Water From <br className="hidden sm:block" />
            Air
          </h2>

          <p className="mt-4 max-w-110 text-[15px] leading-6 text-white/80 sm:text-[16px]">
            In the hills of Bangladesh, families walk hours to collect unsafe
            water. PoP changes that—using bamboo, rain, clouds, and air to make
            safe drinking water every day, with zero electricity.
          </p>
        </div>
      </div>

      {/* Modal video (unchanged) */}
      <AppModal
        open={open}
        onClose={() => setOpen(false)}
        panelClassName="w-full max-w-full sm:max-w-5xl sm:w-[92vw] bg-black text-white border border-white/10 p-2 sm:p-4 md:p-6"
        backdropClassName="bg-black/60"
      >
        <div className="space-y-3">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
            <div className="aspect-video">
              {open && (
                <iframe
                  key="hero-video"
                  className="h-full w-full"
                  src={HeroImagePath.videoURL}
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
  )
}

export default VideoSection
