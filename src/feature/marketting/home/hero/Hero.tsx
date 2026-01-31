import Navbar from '@/components/web/Navbar'
import { HeroImagePath } from '@/constants/imagePath'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { MouseIcon, MoveDownIcon } from 'lucide-react'
import React from 'react'
import VideoSection from './VideoSection'

export default function Hero() {
  const sectionRef = React.useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const p = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
  })

  const bgY = useTransform(p, [0, 1], ['0%', '18%'])

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-water-comes-from-air')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-[110vh] overflow-hidden text-white"
    >
      <Navbar />

      {/* ===== Background (parallax) ===== */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={HeroImagePath.image1}
          alt=""
          className="h-full w-full object-cover will-change-transform"
          style={{ y: bgY }}
          loading="eager"
        />

        <div className="absolute inset-x-0 bottom-0 h-65 bg-linear-to-t from-[#030A12] via-[#030A12]/55 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-transparent" />
      </div>

      {/* ===== Left rail (line + scroll down) ===== */}
      <div className="pointer-events-none absolute left-6 hidden h-[calc(100%-12rem)] md:block xl:left-14 z-30">
        <div className="absolute left-0 top-0 h-full w-px bg-white/35" />

        <div className="absolute -left-4.5 bottom-0 flex items-center gap-2 text-xs tracking-wide text-white/80">
          <span className="[writing-mode:vertical-rl] rotate-180">
            Scroll down
          </span>
        </div>

        <div className="absolute left-0 -bottom-8 -translate-x-1/2">
          <MouseIcon className="h-4 w-4 opacity-80 text-white" />
        </div>
      </div>

      {/* ===== Content wrapper ===== */}
      <div className="relative mx-auto flex min-h-screen flex-col px-5 sm:px-8">
        {/* ===== Headings ===== */}
        <div className="pt-24 sm:pt-28 md:pt-28">
          <div className="text-center">
            <div className="mx-auto w-fit mix-blend-overlay">
              <div className="text-[22px] font-extrabold tracking-[0.18em] text-white/85 sm:text-[28px] md:text-[34px]">
                CLIMATE-RESILIENT, ZERO-ENERGY
              </div>

              <div className="mt-4 text-[56px] font-extrabold leading-[0.92] tracking-[-0.02em] text-white sm:text-[86px] md:text-[120px] lg:text-[140px]">
                POP WATER TOWER
              </div>
            </div>
          </div>
        </div>

        {/* ===== Bottom row (video + text) ===== */}
        <div className="mt-auto pl-0 md:pl-16 lg:pl-20 xl:pl-26 2xl:pl-30">
          {/* CTA row */}

          <VideoSection />
        </div>
      </div>

      {/* ===== Right floating image ===== */}
      <div className="pointer-events-none absolute bottom-20 right-6 hidden md:block xl:right-12 z-50">
        <img
          src={HeroImagePath.image2}
          alt="Right floating"
          className="w-24 opacity-90 drop-shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
          loading="lazy"
        />
      </div>
      <div className="absolute left-0 right-0 bottom-20 flex justify-center z-50">
        <button
          type="button"
          onClick={scrollToHowItWorks}
          className="flex items-center cursor-pointer text-xs text-white/80"
        >
          <MoveDownIcon className="mr-2 h-4 w-4" />
          How it works
        </button>
      </div>
    </section>
  )
}
