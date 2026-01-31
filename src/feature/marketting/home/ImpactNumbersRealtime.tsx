'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import { useFetch } from '@/hooks/useFetch'
import {
  Activity,
  Droplets,
  MapPin,
  RefreshCcw,
  TowerControl,
  Trees,
  Users,
  Clock,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import CountUp from 'react-countup'

function formatCompact(n: number) {
  if (!Number.isFinite(n)) return '—'
  try {
    return new Intl.NumberFormat('en', { notation: 'compact' }).format(n)
  } catch {
    return String(n)
  }
}
function formatNumber(n: number) {
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat('en').format(Math.round(n))
}

function parseToNumber(value: number | undefined | null) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null
  return value
}

function ShimmerLine({ w = 'w-24' }: { w?: string }) {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-full bg-white/7',
        'h-[14px]',
        w,
      ].join(' ')}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.35s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]" />
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}

function AnimatedValue({
  value,
  suffix,
  format,
  isLoading,
  updatedAtKey,
}: {
  value: number | null
  suffix?: string
  format: (n: number) => string
  isLoading: boolean
  updatedAtKey: number // changes when data updates
}) {
  const reduce = useReducedMotion()

  // When loading or missing number
  if (isLoading || value === null) {
    return (
      <div className="mt-2">
        <div className="h-9 w-28 rounded-xl bg-white/7" />
      </div>
    )
  }

  // If user prefers reduced motion: no count animation
  if (reduce) {
    return (
      <div className="mt-2 text-3xl font-extrabold tracking-tight text-white">
        {format(value)}
        {suffix ? <span className="text-white/80"> {suffix}</span> : null}
      </div>
    )
  }

  // CountUp needs numeric end; we format the displayed value using formatter
  return (
    <div className="mt-2 text-3xl font-extrabold tracking-tight text-white">
      <CountUp
        key={updatedAtKey} // re-run on refresh/update
        end={value}
        duration={0.85}
        preserveValue={false}
        separator=","
        decimals={0}
        formattingFn={(n) => format(n)}
      />
      {suffix ? <span className="text-white/80"> {suffix}</span> : null}
    </div>
  )
}

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  isLoading,
  updatedAtKey,
  format,
  suffix,
}: {
  title: string
  value: number | null
  sub?: string
  icon: React.ElementType
  isLoading: boolean
  updatedAtKey: number
  format: (n: number) => string
  suffix?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-b from-[#0B1A2D] via-[#071425] to-[#050C14] p-6 shadow-[0_26px_90px_rgba(0,0,0,0.6)]"
    >
      {/* subtle moving sheen */}
      <div className="pointer-events-none absolute -inset-16 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="h-full w-full rotate-12 bg-[radial-gradient(40%_40%_at_30%_30%,rgba(255,255,255,0.10),rgba(0,0,0,0)_60%)] blur-2xl" />
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-wide text-white/55">
            {title}
          </div>

          <AnimatedValue
            value={value}
            suffix={suffix}
            format={format}
            isLoading={isLoading}
            updatedAtKey={updatedAtKey}
          />

          {isLoading ? (
            <div className="mt-2">
              <ShimmerLine w="w-36" />
            </div>
          ) : sub ? (
            <div className="mt-1 text-xs text-white/50">{sub}</div>
          ) : null}
        </div>

        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -2, 0],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: 2.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
          className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5"
        >
          <Icon className="h-5 w-5 text-white/75" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ImpactNumbersRealtime() {
  // ✅ just fetch once (manual refresh only)
  const { data, isLoading, isError, error, refetch, dataUpdatedAt } =
    useFetch<any>('impact-numbers', '/tower/stats/', {
      // refetchInterval: 10000, // 10 seconds
    })

  const stats = data?.data?.stats

  const updatedText =
    typeof dataUpdatedAt === 'number' && dataUpdatedAt > 0
      ? new Date(dataUpdatedAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '—'

  // Use as a stable "re-run animation key" (CountUp + subtle flash)
  const updatedAtKey = typeof dataUpdatedAt === 'number' ? dataUpdatedAt : 0

  const reduce = useReducedMotion()

  const gridVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: reduce
          ? undefined
          : {
              staggerChildren: 0.08,
              delayChildren: 0.06,
            },
      },
    }),
    [reduce],
  )

  const headerFlashRef = useRef<HTMLDivElement | null>(null)

  // tiny “updated” flash on header pill
  useEffect(() => {
    if (reduce) return
    const el = headerFlashRef.current
    if (!el) return
    el.animate(
      [
        { boxShadow: '0 0 0 rgba(16,185,129,0.0)' },
        { boxShadow: '0 0 22px rgba(16,185,129,0.20)' },
        { boxShadow: '0 0 0 rgba(16,185,129,0.0)' },
      ],
      { duration: 900, easing: 'ease-out' },
    )
  }, [updatedAtKey, reduce])

  return (
    <section className="border-t border-white/10 text-white">
      <div className="container mx-auto py-16">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-wide">
              Live Metrics
            </div>

            <h2 className="mt-6 text-4xl font-extrabold tracking-tight">
              Impact Numbers
            </h2>

            <p className="mt-3 text-sm text-white/60">
              Key totals from tower deployments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              ref={headerFlashRef}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60"
            >
              {/* live pulse dot */}
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-200/80" />
              </span>
              <Activity className="h-4 w-4 text-emerald-200/80" />
              Last updated: <span className="text-white/80">{updatedText}</span>
            </div>

            <button
              type="button"
              onClick={() => refetch?.()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/8 active:scale-[0.98]"
            >
              <RefreshCcw
                className={isLoading ? 'h-4 w-4 animate-spin' : 'h-4 w-4'}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative mt-10">
          <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.10),rgba(0,0,0,0)_70%)] blur-2xl" />

          {isError ? (
            <div className="relative rounded-[24px] border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              Couldn’t load tower stats.
              <div className="mt-2 text-xs text-white/50">
                {String((error as any)?.message ?? '')}
              </div>
            </div>
          ) : (
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
              className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <StatCard
                icon={TowerControl}
                title="Total towers"
                value={parseToNumber(stats?.total_towers)}
                sub="Installed and active"
                isLoading={isLoading || !stats}
                updatedAtKey={updatedAtKey}
                format={formatNumber}
              />

              <StatCard
                icon={MapPin}
                title="Villages covered"
                value={parseToNumber(stats?.total_villages)}
                sub="Communities reached"
                isLoading={isLoading || !stats}
                updatedAtKey={updatedAtKey}
                format={formatNumber}
              />

              <StatCard
                icon={Users}
                title="Lives improved"
                value={parseToNumber(stats?.total_lives_improved)}
                sub="Estimated beneficiaries"
                isLoading={isLoading || !stats}
                updatedAtKey={updatedAtKey}
                format={formatCompact}
              />

              <StatCard
                icon={Droplets}
                title="Water harvested (total)"
                value={parseToNumber(stats?.total_water_harvested_till_now)}
                sub="Cumulative output"
                isLoading={isLoading || !stats}
                updatedAtKey={updatedAtKey}
                format={formatCompact}
                suffix="L"
              />

              <StatCard
                icon={Trees}
                title="CO₂ offset (total)"
                value={parseToNumber(stats?.total_co2_offset_till_now)}
                sub="Total offset so far"
                isLoading={isLoading || !stats}
                updatedAtKey={updatedAtKey}
                format={formatCompact}
              />

              <StatCard
                icon={Clock}
                title="Hours saved (total)"
                value={parseToNumber(stats?.total_hours_saved_till_now)}
                sub="Total time saved"
                isLoading={isLoading || !stats}
                updatedAtKey={updatedAtKey}
                format={formatCompact}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
