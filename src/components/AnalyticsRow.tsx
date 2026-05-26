'use client'

/**
 * AP-3 — AnalyticsPreview bottom row inside V6 DamageInspection.
 *
 * Three dark translucent chart cards below the V6 walkthrough, fronted by
 * a "Repair Management Dashboard Across Your Fleet" heading. Self-gated
 * reveal via useInView (no parent-state coupling), staggered fade + slide-up
 * via Framer Motion.
 *
 * Mock data ships first; Bernardo will swap to real numbers in a
 * follow-up commit after preview-deploy review.
 *
 * Charts are hand-coded inline SVG — no chart-library dependency.
 */

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ──────────────────────────────────────────────────────────────────────────
// Data (mock — Bernardo swaps later)
// ──────────────────────────────────────────────────────────────────────────

const WEEKLY = [8, 14, 22, 11, 17, 24, 13, 18]
const WEEKLY_LABELS = [
  'Jan 8',
  'Jan 15',
  'Jan 22',
  'Jan 29',
  'Feb 5',
  'Feb 12',
  'Feb 19',
  'Feb 26',
]

type MonthRow = {
  month: string
  frame: number
  panel: number
  rust: number
  corner: number
  other: number
}

// Fabricated 12 months × 5 categories. Totals 30–80 with slight Q3–Q4 lift.
// Bottom-up stack order: frame → panel → rust → corner → other.
const MONTHLY: MonthRow[] = [
  { month: 'Jan', frame: 18, panel: 12, rust: 9, corner: 7, other: 5 },
  { month: 'Feb', frame: 14, panel: 11, rust: 8, corner: 6, other: 4 },
  { month: 'Mar', frame: 16, panel: 10, rust: 7, corner: 5, other: 4 },
  { month: 'Apr', frame: 12, panel: 9, rust: 8, corner: 6, other: 5 },
  { month: 'May', frame: 13, panel: 10, rust: 9, corner: 7, other: 4 },
  { month: 'Jun', frame: 17, panel: 11, rust: 10, corner: 6, other: 5 },
  { month: 'Jul', frame: 22, panel: 15, rust: 13, corner: 9, other: 6 },
  { month: 'Aug', frame: 24, panel: 14, rust: 12, corner: 10, other: 7 },
  { month: 'Sep', frame: 26, panel: 16, rust: 14, corner: 11, other: 8 },
  { month: 'Oct', frame: 23, panel: 14, rust: 11, corner: 9, other: 6 },
  { month: 'Nov', frame: 19, panel: 12, rust: 9, corner: 8, other: 5 },
  { month: 'Dec', frame: 16, panel: 11, rust: 8, corner: 7, other: 4 },
]

const CATEGORY_COLORS = {
  frame: '#F59E0B',
  panel: '#14B8A6',
  rust: '#16A34A',
  corner: '#3B82F6',
  other: '#94A3B8',
} as const

const CATEGORY_LABELS = {
  frame: 'Frame Distortion',
  panel: 'Panel Puncture',
  rust: 'Rusted Floor',
  corner: 'Corner Post',
  other: 'Others',
} as const

const STACK_KEYS = ['frame', 'panel', 'rust', 'corner', 'other'] as const

const CONTAINER_TIME = [
  { code: 'REE', display: 'Reefer', mean: 3.0, err: 1.0 },
  { code: '4HC', display: "40' High Cube", mean: 2.7, err: 0.9 },
  { code: '40S', display: "40' Standard", mean: 2.4, err: 0.8 },
  { code: 'TNK', display: 'Tank', mean: 2.3, err: 0.8 },
  { code: 'OPN', display: 'Open Top', mean: 2.15, err: 0.7 },
  { code: 'FLT', display: 'Flat Rack', mean: 2.0, err: 0.7 },
  { code: '20S', display: "20' Standard", mean: 1.9, err: 0.6 },
]

// ──────────────────────────────────────────────────────────────────────────
// Animation variants
// ──────────────────────────────────────────────────────────────────────────

const childVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const rootVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

// ──────────────────────────────────────────────────────────────────────────
// Chart card chrome
// ──────────────────────────────────────────────────────────────────────────

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      variants={childVariants}
      className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col gap-3"
    >
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-xs text-white/60">{subtitle}</p>
      </div>
      <div className="min-h-[180px]">{children}</div>
    </motion.div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Chart 1 — Weekly container repairs (vertical bars)
// ──────────────────────────────────────────────────────────────────────────

function WeeklyChart() {
  const W = 320
  const H = 180
  const padL = 16
  const padR = 12
  const padT = 12
  const padB = 28
  const innerW = W - padL - padR
  const innerH = H - padT - padB
  const max = Math.max(...WEEKLY)
  const gap = 8
  const barCount = WEEKLY.length
  const barW = (innerW - gap * (barCount - 1)) / barCount

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Weekly container repairs over the last 8 weeks"
    >
      {/* Faint dashed midline gridline */}
      <line
        x1={padL}
        x2={W - padR}
        y1={padT + innerH / 2}
        y2={padT + innerH / 2}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      {WEEKLY.map((value, i) => {
        const h = (value / max) * innerH
        const x = padL + i * (barW + gap)
        const y = padT + innerH - h
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={h}
              rx="2"
              fill="#F59E0B"
              className="transition-colors duration-150 hover:fill-[#D97706]"
            >
              <title>
                {WEEKLY_LABELS[i]} · {value} repairs
              </title>
            </rect>
            <text
              x={x + barW / 2}
              y={H - 10}
              textAnchor="middle"
              fontSize="9"
              fill="#94A3B8"
            >
              {WEEKLY_LABELS[i]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Chart 2 — Monthly damage by category (stacked vertical bars, no legend)
// ──────────────────────────────────────────────────────────────────────────

function MonthlyChart() {
  const W = 320
  const H = 180
  const padL = 16
  const padR = 12
  const padT = 12
  const padB = 28
  const innerW = W - padL - padR
  const innerH = H - padT - padB
  const max = Math.max(
    ...MONTHLY.map((m) => m.frame + m.panel + m.rust + m.corner + m.other),
  )
  const gap = 5
  const barCount = MONTHLY.length
  const barW = (innerW - gap * (barCount - 1)) / barCount

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Monthly damage by category — trailing 12 months, stacked bars"
    >
      {/* Faint dashed midline gridline */}
      <line
        x1={padL}
        x2={W - padR}
        y1={padT + innerH / 2}
        y2={padT + innerH / 2}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      {MONTHLY.map((m, i) => {
        const x = padL + i * (barW + gap)
        let yBottom = padT + innerH
        return (
          <g key={i}>
            {STACK_KEYS.map((cat) => {
              const v = m[cat]
              const h = (v / max) * innerH
              const y = yBottom - h
              yBottom = y
              return (
                <rect
                  key={cat}
                  x={x}
                  y={y}
                  width={barW}
                  height={h}
                  fill={CATEGORY_COLORS[cat]}
                >
                  <title>
                    {CATEGORY_LABELS[cat]} · {m.month} · {v}
                  </title>
                </rect>
              )
            })}
            <text
              x={x + barW / 2}
              y={H - 10}
              textAnchor="middle"
              fontSize="9"
              fill="#94A3B8"
            >
              {m.month}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Chart 3 — Inspection time by container type (horizontal bars + error bars)
// ──────────────────────────────────────────────────────────────────────────

function InspectionTimeChart() {
  const W = 320
  const H = 180
  const padL = 40 // gutter for 3-letter container code labels
  const padR = 12
  const padT = 8
  const padB = 8
  const innerW = W - padL - padR
  const innerH = H - padT - padB
  // Include the upper error tail in the X-axis so caps stay inside frame.
  const maxX = Math.max(...CONTAINER_TIME.map((c) => c.mean + c.err))
  const rowCount = CONTAINER_TIME.length
  const rowH = innerH / rowCount
  const barH = Math.min(rowH * 0.6, 16)
  const capHalf = 3

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Inspection time by container type — mean ± 1σ in minutes"
    >
      {CONTAINER_TIME.map((c, i) => {
        const cy = padT + i * rowH + rowH / 2
        const barY = cy - barH / 2
        const barLen = (c.mean / maxX) * innerW
        const errStartX = padL + ((c.mean - c.err) / maxX) * innerW
        const errEndX = padL + ((c.mean + c.err) / maxX) * innerW
        return (
          <g key={c.code}>
            {/* 3-letter container code on the left */}
            <text
              x={padL - 6}
              y={cy}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="10"
              fill="#CBD5E1"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {c.code}
            </text>
            {/* Bar */}
            <rect
              x={padL}
              y={barY}
              width={barLen}
              height={barH}
              rx="2"
              fill="#0D9488"
              className="transition-colors duration-150 hover:fill-[#0F766E]"
            >
              <title>
                {c.display} · {c.mean.toFixed(2)} min ± {c.err.toFixed(2)}
              </title>
            </rect>
            {/* T-shaped error bar: horizontal line + two end caps */}
            <line
              x1={errStartX}
              x2={errEndX}
              y1={cy}
              y2={cy}
              stroke="#94A3B8"
              strokeWidth="1"
            />
            <line
              x1={errStartX}
              x2={errStartX}
              y1={cy - capHalf}
              y2={cy + capHalf}
              stroke="#94A3B8"
              strokeWidth="1"
            />
            <line
              x1={errEndX}
              x2={errEndX}
              y1={cy - capHalf}
              y2={cy + capHalf}
              stroke="#94A3B8"
              strokeWidth="1"
            />
          </g>
        )
      })}
    </svg>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Root component
// ──────────────────────────────────────────────────────────────────────────

export default function AnalyticsRow() {
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={rootRef}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={rootVariants}
      className="mt-16 md:mt-20"
    >
      <motion.h3
        variants={childVariants}
        className="text-xl md:text-2xl font-semibold text-white text-center mb-8 md:mb-10"
      >
        Repair Management Dashboard Across Your Fleet
      </motion.h3>

      {/* 3-card grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        <ChartCard
          title="Weekly container repairs"
          subtitle="Last 8 weeks"
        >
          <WeeklyChart />
        </ChartCard>
        <ChartCard
          title="Monthly damage by category"
          subtitle="Trailing 12 months"
        >
          <MonthlyChart />
        </ChartCard>
        <ChartCard
          title="Inspection time by type"
          subtitle="Mean ± 1σ (minutes)"
        >
          <InspectionTimeChart />
        </ChartCard>
      </div>
    </motion.div>
  )
}
