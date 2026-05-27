'use client'

/**
 * F19 — DashboardPreviewRow.
 *
 * 2x2 widget grid below the HowItWorks 4-step strip: two stored-container
 * tables (30d / 60d) + two detention&demurrage charts (accumulated days line
 * + accumulated cost bars). All four widgets animate in on a synchronized
 * 7-second loop using the [0, 1, 1, 0] keyframe pattern (fill in over 1s,
 * hold for ~5.95s, snap-reset, repeat).
 *
 * Reveal gate: section-level useInView({once:true, amount:0.3}) — animation
 * loop starts when the row scrolls into view; doesn't re-trigger when it
 * scrolls back out.
 *
 * Mock data ships first; Bernardo swaps real fleet numbers post-launch. The
 * four arrays below (TABLE_30D / TABLE_60D / DAYS_DATA / COST_DATA) are the
 * single-file edit site — AP-3 precedent.
 *
 * Tokens are reused from AnalyticsRow + V6 (bg-white/[0.04], border-white/10,
 * #94A3B8 axis labels, rgba(255,255,255,0.08) gridlines). New per-component
 * accents: #60A5FA sky-400 for the line/eyebrow, #A78BFA violet-400 for bars.
 */

import { motion, useInView, useReducedMotion } from 'framer-motion'
import React, { useRef } from 'react'

// ──────────────────────────────────────────────────────────────────────────
// Animation constants (match AnalyticsRow)
// ──────────────────────────────────────────────────────────────────────────

const LOOP_CYCLE = 7 // seconds, full repeat cycle
const FILL_DURATION = 1.0 // chart fill-in
const FILL_STAGGER = 0.05 // inter-bar stagger (Chart 2)
const ROW_STAGGER = 0.08 // inter-row stagger (tables)

// ──────────────────────────────────────────────────────────────────────────
// Mock data (Bernardo swaps real fleet numbers post-launch — single-file edit)
// ──────────────────────────────────────────────────────────────────────────

type TableRow = {
  container: string
  duration: number
  eventDay: string
  eventTime: string
  exit: string
  frame: number
}

const TABLE_30D: TableRow[] = [
  { container: 'TEBU7612720', duration: 34.52, eventDay: '24/9/2025', eventTime: '17:19', exit: 'No', frame: 21 },
  { container: 'TRHU5304432', duration: 34.50, eventDay: '24/9/2025', eventTime: '17:51', exit: 'No', frame: 15 },
  { container: 'MILE1000730', duration: 34.04, eventDay: '25/9/2025', eventTime: '04:50', exit: 'No', frame: 26 },
  { container: 'ICNU6150580', duration: 33.99, eventDay: '25/9/2025', eventTime: '06:07', exit: 'No', frame: 16 },
  { container: 'MSBU5521663', duration: 34.00, eventDay: '25/9/2025', eventTime: '06:01', exit: 'No', frame: 24 },
  { container: 'SZLU9811953', duration: 33.94, eventDay: '25/9/2025', eventTime: '07:25', exit: 'No', frame: 25 },
  { container: 'CSUZ3258322', duration: 33.87, eventDay: '25/9/2025', eventTime: '09:09', exit: 'No', frame: 20 },
  { container: 'MSKU9501610', duration: 33.86, eventDay: '25/9/2025', eventTime: '09:19', exit: 'No', frame: 12 },
]

const TABLE_60D: TableRow[] = [
  { container: 'MSAU3471340', duration: 92.99, eventDay: '5/11/2025', eventTime: '06:14', exit: 'No', frame: 20 },
  { container: 'MNBU9124069', duration: 92.93, eventDay: '5/11/2025', eventTime: '07:41', exit: 'No', frame: 15 },
  { container: 'SUDU8989504', duration: 92.88, eventDay: '5/11/2025', eventTime: '08:50', exit: 'No', frame: 18 },
  { container: 'CIMU0238994', duration: 92.79, eventDay: '5/11/2025', eventTime: '10:54', exit: 'No', frame: 21 },
  { container: 'MEDU9896230', duration: 92.77, eventDay: '5/11/2025', eventTime: '11:26', exit: 'No', frame: 33 },
  { container: 'CAAU6549321', duration: 92.69, eventDay: '5/11/2025', eventTime: '13:20', exit: 'No', frame: 69 },
  { container: 'WNGU3033822', duration: 92.69, eventDay: '5/11/2025', eventTime: '13:21', exit: 'No', frame: 38 },
  { container: 'COCU6995112', duration: 92.60, eventDay: '5/11/2025', eventTime: '15:35', exit: 'No', frame: 15 },
]

// 28 evenly-spaced points across 4 calendar days, shape approximates Bernardo's
// line-chart screenshot (flat near-zero start → accelerating ramp to ~1600).
const DAYS_DATA = [
  0, 0, 0, 0, 0, 0,
  40, 90, 150,
  220, 310, 400, 480, 560, 620,
  680, 760, 850, 920, 990, 1060,
  1150, 1240, 1320, 1400, 1480, 1560, 1600,
]

// Same 28-day axis, dollar amounts scaled ~×100 from DAYS_DATA shape.
const COST_DATA = [
  0, 0, 0, 0, 0, 0,
  4000, 9000, 15000,
  22000, 31000, 40000, 48000, 56000, 62000,
  68000, 76000, 85000, 92000, 99000, 106000,
  115000, 124000, 132000, 140000, 148000, 156000, 160000,
]

const DATE_LABELS = ['1/9/2025', '1/10/2025', '1/11/2025', '1/12/2025']

// ──────────────────────────────────────────────────────────────────────────
// Shared types + card shell
// ──────────────────────────────────────────────────────────────────────────

type WidgetProps = {
  inView: boolean
  reducedMotion: boolean | null
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[#60A5FA] text-xs md:text-sm font-semibold uppercase tracking-wide leading-snug">
          {title}
        </h3>
        <span aria-hidden="true" className="text-white/30 text-lg leading-none select-none shrink-0">
          ···
        </span>
      </div>
      {children}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Table widget — per-row staggered reveal on the 7s loop
// ──────────────────────────────────────────────────────────────────────────

function DTable({ rows, inView, reducedMotion }: WidgetProps & { rows: TableRow[] }) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.06] text-[#60A5FA] text-[10px] md:text-xs uppercase tracking-wide">
              <th className="px-2 py-2 font-medium">Container Number</th>
              <th className="px-2 py-2 font-medium text-right">Storage Dura...</th>
              <th className="px-2 py-2 font-medium">Event Day: Day</th>
              <th className="px-2 py-2 font-medium">Event Time</th>
              <th className="px-2 py-2 font-medium">Exit Status</th>
              <th className="px-2 py-2 font-medium">Image Link</th>
              <th className="px-2 py-2 font-medium text-right">Frame #</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row, i) => {
              const cells = (
                <>
                  <td className="px-2 py-2 text-white/90 text-xs md:text-sm tabular-nums whitespace-nowrap">{row.container}</td>
                  <td className="px-2 py-2 text-white/90 text-xs md:text-sm tabular-nums text-right">{row.duration.toFixed(2)}</td>
                  <td className="px-2 py-2 text-white/90 text-xs md:text-sm tabular-nums whitespace-nowrap">{row.eventDay}</td>
                  <td className="px-2 py-2 text-white/90 text-xs md:text-sm tabular-nums">{row.eventTime}</td>
                  <td className="px-2 py-2 text-white/90 text-xs md:text-sm">{row.exit}</td>
                  <td className="px-2 py-2 text-[#60A5FA] text-xs md:text-sm underline-offset-2 whitespace-nowrap">http://localho...</td>
                  <td className="px-2 py-2 text-white/90 text-xs md:text-sm tabular-nums text-right">{row.frame}</td>
                </>
              )
              if (reducedMotion) {
                return <tr key={i}>{cells}</tr>
              }
              return (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={
                    inView
                      ? { opacity: [0, 1, 1, 0], y: [4, 0, 0, 4] }
                      : { opacity: 0, y: 4 }
                  }
                  transition={{
                    duration: LOOP_CYCLE,
                    times: [
                      0,
                      (i * ROW_STAGGER + 0.4) / LOOP_CYCLE,
                      (LOOP_CYCLE - 0.05) / LOOP_CYCLE,
                      1,
                    ],
                    ease: 'easeOut',
                    repeat: Infinity,
                  }}
                >
                  {cells}
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="text-white/40 text-xs italic text-right mt-2">Showing first 2,000 rows</p>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Chart 1 — Accumulated D&D total days (line, stroke pathLength reveal)
// ──────────────────────────────────────────────────────────────────────────

function ChartDays({ inView, reducedMotion }: WidgetProps) {
  const W = 400
  const H = 220
  const padL = 48
  const padR = 16
  const padT = 12
  const padB = 36
  const innerW = W - padL - padR
  const innerH = H - padT - padB
  const maxY = 1800
  const yTicks = [0, 300, 600, 900, 1200, 1500, 1800]

  const points = DAYS_DATA.map((v, i) => {
    const x = padL + (i / (DAYS_DATA.length - 1)) * innerW
    const y = padT + innerH - (v / maxY) * innerH
    return [x, y] as const
  })
  const pathD = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(' ')

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Accumulated detention and demurrage total days over time"
    >
      {/* Y-axis title (rotated) */}
      <text
        x={10}
        y={padT + innerH / 2}
        fill="#94A3B8"
        fontSize="9"
        textAnchor="middle"
        transform={`rotate(-90, 10, ${padT + innerH / 2})`}
      >
        Total Days of Detention&amp;Demurrage
      </text>
      {/* Y-axis gridlines + labels */}
      {yTicks.map((t) => {
        const y = padT + innerH - (t / maxY) * innerH
        return (
          <g key={t}>
            <line
              x1={padL}
              x2={W - padR}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            <text x={padL - 6} y={y + 3} fill="#94A3B8" fontSize="9" textAnchor="end">
              {t}
            </text>
          </g>
        )
      })}
      {/* X-axis labels */}
      {DATE_LABELS.map((label, i) => {
        const x = padL + (i / (DATE_LABELS.length - 1)) * innerW
        return (
          <text key={label} x={x} y={H - padB + 14} fill="#94A3B8" fontSize="9" textAnchor="middle">
            {label}
          </text>
        )
      })}
      {/* X-axis title */}
      <text
        x={padL + innerW / 2}
        y={H - 6}
        fill="#94A3B8"
        fontSize="9"
        textAnchor="middle"
      >
        Calculation Date
      </text>
      {/* The line — pathLength stroke reveal on 7s loop */}
      {reducedMotion ? (
        <path d={pathD} stroke="#60A5FA" strokeWidth="2.5" fill="none" />
      ) : (
        <motion.path
          d={pathD}
          stroke="#60A5FA"
          strokeWidth="2.5"
          fill="none"
          animate={
            inView
              ? { pathLength: [0, 1, 1, 0] }
              : { pathLength: 0 }
          }
          transition={{
            duration: LOOP_CYCLE,
            times: [
              0,
              FILL_DURATION / LOOP_CYCLE,
              (LOOP_CYCLE - 0.05) / LOOP_CYCLE,
              1,
            ],
            ease: ['easeOut', 'linear', 'easeIn'],
            repeat: Infinity,
          }}
        />
      )}
    </svg>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Chart 2 — Accumulated D&D cost (bars, per-bar scaleY reveal)
// ──────────────────────────────────────────────────────────────────────────

function ChartCost({ inView, reducedMotion }: WidgetProps) {
  const W = 400
  const H = 220
  const padL = 48
  const padR = 16
  const padT = 12
  const padB = 36
  const innerW = W - padL - padR
  const innerH = H - padT - padB
  const maxY = 180000
  const yTicks = [0, 30000, 60000, 90000, 120000, 150000, 180000]

  const barCount = COST_DATA.length
  const gap = 2
  const barW = (innerW - gap * (barCount - 1)) / barCount

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Accumulated detention and demurrage cost over time"
    >
      {/* Y-axis title (rotated) */}
      <text
        x={10}
        y={padT + innerH / 2}
        fill="#94A3B8"
        fontSize="9"
        textAnchor="middle"
        transform={`rotate(-90, 10, ${padT + innerH / 2})`}
      >
        Total Daily Accumulated Cost
      </text>
      {/* Y-axis gridlines + labels */}
      {yTicks.map((t) => {
        const y = padT + innerH - (t / maxY) * innerH
        const label = t === 0 ? '$0' : `$${t / 1000}K`
        return (
          <g key={t}>
            <line
              x1={padL}
              x2={W - padR}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            <text x={padL - 6} y={y + 3} fill="#94A3B8" fontSize="9" textAnchor="end">
              {label}
            </text>
          </g>
        )
      })}
      {/* X-axis labels */}
      {DATE_LABELS.map((label, i) => {
        const x = padL + (i / (DATE_LABELS.length - 1)) * innerW
        return (
          <text key={label} x={x} y={H - padB + 14} fill="#94A3B8" fontSize="9" textAnchor="middle">
            {label}
          </text>
        )
      })}
      {/* X-axis title */}
      <text
        x={padL + innerW / 2}
        y={H - 6}
        fill="#94A3B8"
        fontSize="9"
        textAnchor="middle"
      >
        Calculation Date
      </text>
      {/* Bars — per-bar scaleY reveal on 7s loop with 0.05s stagger */}
      {COST_DATA.map((v, i) => {
        const x = padL + i * (barW + gap)
        const h = (v / maxY) * innerH
        const y = padT + innerH - h
        if (reducedMotion || h === 0) {
          return <rect key={i} x={x} y={y} width={barW} height={h} fill="#A78BFA" />
        }
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={h}
            fill="#A78BFA"
            style={{ originY: 1, transformBox: 'fill-box' }}
            animate={
              inView
                ? { scaleY: [0, 1, 1, 0] }
                : { scaleY: 0 }
            }
            transition={{
              duration: LOOP_CYCLE,
              times: [
                0,
                FILL_DURATION / LOOP_CYCLE,
                (LOOP_CYCLE - 0.05) / LOOP_CYCLE,
                1,
              ],
              delay: i * FILL_STAGGER,
              ease: ['easeOut', 'linear', 'easeIn'],
              repeat: Infinity,
            }}
          />
        )
      })}
    </svg>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Root export
// ──────────────────────────────────────────────────────────────────────────

export default function DashboardPreviewRow() {
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { once: true, amount: 0.3 })
  const reducedMotion = useReducedMotion()

  return (
    <section
      ref={rootRef}
      className="mt-12 md:mt-16 max-w-7xl mx-auto px-4 md:px-6"
      aria-label="Dashboard preview"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card title="Containers Stored longer than 30 days (not Exited)">
          <DTable rows={TABLE_30D} inView={inView} reducedMotion={reducedMotion} />
        </Card>
        <Card title="Containers Stored longer than 60 days (not Exited)">
          <DTable rows={TABLE_60D} inView={inView} reducedMotion={reducedMotion} />
        </Card>
        <Card title="Accumulated Detention&Demurrage Total Days Count">
          <ChartDays inView={inView} reducedMotion={reducedMotion} />
        </Card>
        <Card title="Accumulated Detention and Demurrage Cost">
          <ChartCost inView={inView} reducedMotion={reducedMotion} />
        </Card>
      </div>
    </section>
  )
}
