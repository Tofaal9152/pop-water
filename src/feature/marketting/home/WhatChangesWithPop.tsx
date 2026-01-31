'use client'

import React from 'react'
import { WhatChangesWithPopPath } from '@/constants/imagePath'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type Slide = {
  title: string
  desc: string
  image: string
}

const wrap =
  'rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.75)]'

function SectionTitle({
  pill,
  title,
  subtitle,
}: {
  pill: string
  title: string
  subtitle: string
}) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-wide">
        {pill}
      </div>
      <h2 className="mt-6 text-4xl font-extrabold tracking-tight">{title}</h2>
      <p className="mt-3 text-sm text-white/60">{subtitle}</p>
    </div>
  )
}

function CarouselBlock({
  label,
  hint,
  items,
}: {
  label: string
  hint: string
  items: Slide[]
}) {
  return (
    <div className={wrap}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-semibold tracking-wide text-white/55">
            {label}
          </div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight text-white">
            {hint}
          </div>
        </div>

        <div className="text-[11px] text-white/45">
          Drag / Swipe • Use arrows
        </div>
      </div>

      <div className="relative mt-6">
        <Carousel opts={{ align: 'start', loop: true }}>
          <CarouselContent className="-ml-4">
            {items.map((s, idx) => (
              <CarouselItem
                key={idx}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <ImpactCard title={s.title} desc={s.desc} image={s.image} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* arrows */}
          <CarouselPrevious className="-left-3 border-white/10 bg-black/35 text-white/85 hover:bg-black/55" />
          <CarouselNext className="-right-3 border-white/10 bg-black/35 text-white/85 hover:bg-black/55" />
        </Carousel>
      </div>
    </div>
  )
}

function ImpactCard({
  title,
  desc,
  image,
}: {
  title: string
  desc: string
  image: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 shadow-[0_22px_70px_rgba(0,0,0,0.55)]">
      {/* image */}
      <img
        src={image}
        alt={title}
        className="h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
      />

      {/* overlay (Apple-like) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="text-[18px] font-extrabold leading-tight text-white drop-shadow">
          {title}
        </div>
        <div className="mt-1 text-[12px] leading-relaxed text-white/80">
          {desc}
        </div>
      </div>

      {/* subtle shine */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-white/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-60" />
    </div>
  )
}

export default function WhatChangesWithPop() {
  // ✅ Replace these images with your real ones later
  const beforeSlides: Slide[] = [
    {
      title: '60%',
      desc: 'Families drink unsafe water',
      image: WhatChangesWithPopPath.image1,
    },
    {
      title: 'Water disease risk',
      desc: 'Among top causes of death',
      image: WhatChangesWithPopPath.image3,
    },
    {
      title: '1–2 hours daily',
      desc: 'Women & girls walk for water',
      image: WhatChangesWithPopPath.image2,
    },
  ]

  const afterSlides: Slide[] = [
    {
      title: 'Safe water',
      desc: 'Available all year',
      image: WhatChangesWithPopPath.image7,
    },
    {
      title: 'Girls go to school',
      desc: 'No daily water walks',
      image: WhatChangesWithPopPath.image5,
    },
    {
      title: 'Safer monsoons',
      desc: 'Reduced risky crossings',
      image: WhatChangesWithPopPath.image4,
    },
    {
      title: 'Health improves',
      desc: 'Fewer waterborne illnesses',
      image: WhatChangesWithPopPath.image6,
    },
  ]

  return (
    <section className="border-t border-white/10 text-white">
      <div className="container mx-auto py-16">
        <SectionTitle
          pill="The Ripple Effect"
          title="What Changes With PoP"
          subtitle="Before vs After—real outcomes for families in hill tracts."
        />

        <div className="relative mt-12 space-y-8">
          {/* glow */}
          <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.10),rgba(0,0,0,0)_70%)] blur-2xl" />

          {/* ✅ Only 2 carousels */}
          <CarouselBlock
            label="Before"
            hint="The struggle (Hill Tracts)"
            items={beforeSlides}
          />

          <CarouselBlock
            label="After"
            hint="The change with PoP"
            items={afterSlides}
          />
        </div>

        <div className="mt-8 h-px w-full bg-white/10" />
      </div>
    </section>
  )
}
