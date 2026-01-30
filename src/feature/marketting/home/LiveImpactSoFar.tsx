'use client'

import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { useMemo } from 'react'

type PieDatum = {
  name: string
  value: number
  color: string
}

export default function LiveImpactSoFar() {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  })

  const metricItem = (
    value: number,
    suffix: string,
    label: string,
    decimals?: number,
  ) => (
    <div>
      <div className="text-[22px] font-extrabold tracking-tight text-white">
        {inView ? (
          <CountUp
            start={0}
            end={value}
            duration={1.2}
            decimals={decimals ?? 0}
            separator=","
            suffix={suffix}
          />
        ) : (
          `0${suffix}`
        )}
      </div>
      <div className="mt-2 text-[12px] text-white/55">{label}</div>
    </div>
  )

  const statCard = (value: number, label: string, suffix = '') => (
    <div className="rounded-[22px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] px-6 py-5 shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
      <div className="text-[20px] font-extrabold text-white">
        {inView ? (
          <CountUp
            start={0}
            end={value}
            duration={1.0}
            separator=","
            suffix={suffix}
          />
        ) : (
          `0${suffix}`
        )}
      </div>
      <div className="mt-1 text-[12px] text-white/55">{label}</div>
    </div>
  )

  // ✅ You can change these to match your story
  const pieData: PieDatum[] = useMemo(
    () => [
      { name: 'Water Access', value: 45, color: '#2EE9D1' },
      { name: 'Health', value: 25, color: '#60A5FA' },
      { name: 'Education', value: 20, color: '#A78BFA' },
      { name: 'Climate', value: 10, color: '#34D399' },
    ],
    [],
  )

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-white/10 text-white"
    >
      <div className="container mx-auto py-16">
        {/* glow */}
        <div className="pointer-events-none absolute -inset-10 hidden bg-[radial-gradient(60%_60%_at_25%_30%,rgba(255,255,255,0.12),rgba(0,0,0,0)_70%)] blur-2xl md:block" />

        <div className="relative grid items-start gap-12 lg:grid-cols-[1fr_520px]">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <h2 className="text-[36px] font-extrabold leading-[1.05] tracking-tight">
              Live Impact <br className="hidden sm:block" /> (So Far)
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-white/60">
              <span>Zero energy</span>
              <span className="text-white/25">•</span>
              <span>💧</span>
              <span>Water from air &amp; rain</span>
            </div>

            <div className="mt-6 inline-flex h-10 items-center rounded-full bg-[#2EE9D1]/15 px-5 text-[12px] font-semibold text-white ring-1 ring-[#2EE9D1]/25">
              Live Count
            </div>

            {/* Metrics */}
            <div className="mt-10 grid gap-x-20 gap-y-10 sm:grid-cols-2">
              <div className="space-y-10">
                {metricItem(10000, ' L/week', 'Water Harvested')}
                {metricItem(2, ' hours/day', 'Hours Saved', 0)}
              </div>
              <div className="space-y-10">
                {metricItem(0.6, ' T', 'CO₂ Offset', 1)}
                {metricItem(22, ' Years', 'Lifespan of each tower')}
              </div>
            </div>

            {/* Bottom cards */}
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {statCard(6, 'Villages')}
              {statCard(11, 'Towers')}
              {statCard(895, 'Lives improved')}
            </div>
          </div>

          {/* RIGHT PANEL (Animated Pie Chart) */}
          <div className="mt-4 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white/90">
                  Impact Breakdown
                </div>
                <div className="mt-1 text-xs text-white/55">
                  Community outcomes (illustrative)
                </div>
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70 animate-pulse">
                Updates live
              </div>
            </div>

            {/* Chart */}
            <div className="mt-6 h-full w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={78}
                    outerRadius={118}
                    paddingAngle={2}
                    // ✅ animate when in view
                    isAnimationActive={inView}
                    animationBegin={120}
                    animationDuration={1200}
                    animationEasing="ease-out"
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: 'rgba(5,12,20,0.9)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 14,
                      color: 'white',
                    }}
                    itemStyle={{ color: 'white' }}
                    labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
                  />

                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    wrapperStyle={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 12,
                      paddingTop: 10,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
