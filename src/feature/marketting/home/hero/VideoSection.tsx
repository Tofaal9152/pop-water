import { AppModal } from '@/components/ui/AppModal'
import { HeroImagePath } from '@/constants/imagePath'
import React from 'react'

export const VideoSection = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="w-full">
      <div className="flex flex-col items-start gap-10 md:flex-row md:items-start md:gap-12">
        {/* LEFT: VIDEO CARD */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl text-left shadow-[0_28px_90px_rgba(0,0,0,0.65)] md:w-76"
        >
          {/* background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HeroImagePath.videoThumbnail})` }}
          />
          {/* soft overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/15 to-black/55" />

          {/* play ring */}
          <div className="absolute left-1/2 top-23 h-33 w-33 -translate-x-1/2 rounded-full border border-white/45 bg-white/15 backdrop-blur-[2px]">
            <div className="absolute left-1/2 top-1/2 h-18 w-18 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/55 backdrop-blur-xl">
              <div className="absolute left-1/2 top-1/2 ml-1 h-0 w-0 -translate-x-1/2 -translate-y-1/2 border-y-16 border-l-28 border-y-transparent border-l-white/90" />
            </div>
          </div>

          {/* bottom blur bar */}
          <div className="absolute bottom-0 left-0 w-full rounded-b-2xl bg-white/10 px-6 py-4 backdrop-blur-md">
            <div className="text-center text-[16px] font-semibold text-white">
              Watch PoP in Action
            </div>
          </div>
        </button>

        {/* RIGHT: TEXT */}
        <div className="w-full md:max-w-130">
          <h2 className="text-[40px] font-bold leading-[1.02] tracking-tight sm:text-[52px] md:text-[56px]">
            Safe Water From <br className="hidden sm:block" />
            Air
          </h2>

          <p className="mt-5 max-w-130 text-[16px] leading-7 text-white/80 sm:text-[18px]">
            In the hills of Bangladesh, families walk hours to collect unsafe
            water. PoP changes that—using bamboo, rain, clouds, and air to make
            safe drinking water every day, with zero electricity.
          </p>
        </div>
      </div>

      {/* Modal video */}
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
