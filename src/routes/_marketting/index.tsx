import Footer from '@/components/web/Footer'
import Hero from '@/feature/marketting/home/hero/Hero'
import HowWaterComesFromAir from '@/feature/marketting/home/HowWaterComesFromAir'
import ImpactHighlights from '@/feature/marketting/home/ImpactHighlights'
import ImpactNumbersRealtime from '@/feature/marketting/home/ImpactNumbersRealtime'
import JoinHarvestSection from '@/feature/marketting/home/JoinHarvestSection'
import WhatChangesWithPop from '@/feature/marketting/home/WhatChangesWithPop'
import WhatWaterMakesPossible from '@/feature/marketting/home/WhatWaterMakesPossible'
import WherePopIsWorking from '@/feature/marketting/home/WherePopIsWorking/WherePopIsWorking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketting/')({ component: App })

function App() {
  return (
    <section className="bg-[#010e1f]  overflow-hidden">
      <Hero />
      <div className="md:px-0 px-4">
        <ImpactHighlights />
        <HowWaterComesFromAir />
        <WhatChangesWithPop />
        <ImpactNumbersRealtime />
        <WherePopIsWorking />
        <WhatWaterMakesPossible />
        <JoinHarvestSection />
        <Footer />
      </div>
    </section>
  )
}
