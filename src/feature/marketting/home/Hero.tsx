'use client'

import React from 'react'
import Navbar from '@/components/web/Navbar'
import { AppModal } from '@/components/ui/AppModal'
import { HeroImagePath } from '@/constants/imagePath'
import { MouseIcon } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-[110vh] overflow-hidden  text-white"
    >
      <Navbar />

      {/* ===== Background ===== */}
      <div className="absolute inset-0">
        <img
          src={HeroImagePath.image1}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-65 bg-linear-to-t from-[#030A12] via-[#030A12]/55 to-transparent" />
        {/* slight top wash like screenshot */}
        <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-transparent" />
      </div>

      {/* ===== Left rail (line + scroll down) ===== */}
      <div className="pointer-events-none absolute left-6  hidden h-[calc(100%-12rem)] md:block xl:left-14">
        <div className="absolute left-0 top-0 h-full w-px bg-white/35" />
        <div className="absolute -left-4.5 bottom-0 flex items-center gap-2 text-xs tracking-wide text-white/80">
          <span className="[writing-mode:vertical-rl] rotate-180">
            Scroll down
          </span>
          <MouseIcon className="h-4 w-4 opacity-80" />
        </div>
      </div>

      {/* ===== Content wrapper ===== */}
      <div className="relative mx-auto flex min-h-screen  flex-col px-5 sm:px-8">
        {/* ===== Headings (centered like screenshot) ===== */}
        <div className="pt-24 sm:pt-28 md:pt-28">
          <div className="text-center">
            <div className="mx-auto w-fit mix-blend-overlay">
              <div className="text-[22px] font-extrabold tracking-[0.18em] text-white/85 sm:text-[28px] md:text-[34px]">
                CLIMATE-RESILIENT, ZERO-ENERGY
              </div>

              <div className="mt-4 text-[56px] font-extrabold leading-[0.92] tracking-[-0.02em] text-white sm:text-[86px] md:text-[120px] lg:text-[140px] ">
                POP WATER TOWER
              </div>
            </div>
          </div>
        </div>

        {/* ===== Bottom row (video + text) ===== */}
        <div className="mt-auto pl-0 md:pl-6 lg:pl-10 xl:pl-12 2xl:pl-16 ">
          <VideoSection />
        </div>
      </div>

      {/* ===== Right floating image (bottom-right) ===== */}
      <div className="pointer-events-none absolute bottom-20 right-6 hidden md:block xl:right-12">
        <img
          src={HeroImagePath.image2}
          alt="Right floating"
          className="w-24 opacity-90 drop-shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
          loading="lazy"
        />
      </div>
    </section>
  )
}

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
