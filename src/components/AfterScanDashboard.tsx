'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * AfterScanDashboard — dark-themed dashboard shown in the dark zone directly
 * below the Container3D scan animation. Carries forward only the 8 touchpoint
 * cards + 4 stat cards from the (deleted) light JourneyMapHighlight. Background
 * is #0A0F1A to read as a seamless continuation of the Container3D section.
 * Content verbatim per spec; product claims ("5 of 8" / "7–10 min" / "< 2 min")
 * are not paraphrased.
 */

type DataRow = {
  title: string
  detail: string
  tag: string
  tagClass: string
  cardClass: string
}

const containerData: DataRow[] = [
  {
    title: 'Container ID at DC Gate',
    detail: 'Security guard or WMS scan — often just truck plate',
    tag: 'MANUAL/PAPER',
    tagClass: 'text-red-400',
    cardClass: 'bg-red-950/30 border border-red-900/50 border-l-4 border-l-red-500',
  },
  {
    title: 'Seal Verification',
    detail: 'Manually checked against B/L — often skipped',
    tag: 'MANUAL/PAPER',
    tagClass: 'text-red-400',
    cardClass: 'bg-red-950/30 border border-red-900/50 border-l-4 border-l-red-500',
  },
  {
    title: 'Cargo Condition at Opening',
    detail: 'Receiving team inspects cargo, not container',
    tag: 'MANUAL/PAPER',
    tagClass: 'text-red-400',
    cardClass: 'bg-red-950/30 border border-red-900/50 border-l-4 border-l-red-500',
  },
  {
    title: 'Container Departure',
    detail: 'Empty departure rarely logged',
    tag: 'NOT CAPTURED',
    tagClass: 'text-slate-400',
    cardClass: 'bg-slate-800/50 border border-slate-700 border-l-4 border-l-slate-500',
  },
]

type Status = 'full' | 'half' | 'empty'

const systems: { status: Status; name: string; detail: string }[] = [
  {
    status: 'full',
    name: 'WMS (Manhattan, SAP EWM)',
    detail: 'Manages cargo inside DC; container data not captured',
  },
  {
    status: 'half',
    name: 'Yard Management System',
    detail: 'Only at large DCs; tracks trailers, not containers well',
  },
  { status: 'empty', name: 'Gate System', detail: 'Usually a barrier + guard; no OCR' },
  {
    status: 'empty',
    name: 'Carrier System Integration',
    detail: 'WMS and carrier systems are siloed',
  },
]

type Part = { t: string } | { n: number }

type Stat = {
  parts: Part[]
  label: string
  numClass: string
  cardClass: string
}

const stats: Stat[] = [
  {
    parts: [{ n: 5 }, { t: ' of 8' }],
    label: 'Gate touchpoints with NO digital system',
    numClass: 'text-red-400',
    cardClass: 'bg-red-950/30 border border-red-900/50',
  },
  {
    parts: [{ n: 3 }, { t: ' sites' }],
    label: 'Primary gatein.ai target sites',
    numClass: 'text-cyan-400',
    cardClass: 'bg-cyan-950/30 border border-cyan-900/50',
  },
  {
    parts: [{ n: 7 }, { t: '–' }, { n: 10 }, { t: ' min' }],
    label: 'Avg gate time without AI',
    numClass: 'text-amber-400',
    cardClass: 'bg-amber-950/30 border border-amber-900/50',
  },
  {
    parts: [{ t: '< ' }, { n: 2 }, { t: ' min' }],
    label: 'Avg gate time with gatein.ai',
    numClass: 'text-emerald-400',
    cardClass: 'bg-emerald-950/30 border border-emerald-900/50',
  },
]

function StatusDot({ status }: { status: Status }) {
  if (status === 'full') {
    return <span aria-hidden className="mt-1 h-3 w-3 shrink-0 rounded-full bg-emerald-400" />
  }
  if (status === 'half') {
    return (
      <span
        aria-hidden
        className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-amber-400"
        style={{ background: 'linear-gradient(90deg, #fbbf24 50%, transparent 50%)' }}
      />
    )
  }
  return <span aria-hidden className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-red-400" />
}

/** Counts a whole integer 0 → target over 1500ms (easeOutCubic), once on view. */
function CountUp({ to, active }: { to: number; active: boolean }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!active) return
    let raf = 0
    const startTs = performance.now()
    const dur = 1500
    const tick = (now: number) => {
      const p = Math.min((now - startTs) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, to])

  return <span>{n}</span>
}

const card = (delayMs: number, inView: boolean) => ({
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 },
  transition: { duration: 0.4, ease: 'easeOut' as const, delay: delayMs / 1000 },
})

// Interleaved L-R-L-R cascade (120ms between sides, 240ms down a column).
const LEFT_DELAYS = [0, 240, 480, 720]
const RIGHT_DELAYS = [120, 360, 600, 840]
const STAT_STAGGER = 100

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <h4 className="border-b border-slate-800 pb-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
    {children}
  </h4>
)

export function AfterScanDashboard() {
  const sectionRef = useRef<HTMLElement>(null)
  // Single section-level trigger: fires when the dashboard is ~30% in view,
  // so the staggered entrance + count-up run when the user actually sees the
  // section — not 1px-into-viewport while still scrolling the Container3D pin
  // above (which played the once:true animation off-screen → static end state).
  const inView = useInView(sectionRef, { once: true, amount: 0.3 })
  // Issue 13: the stat row is at the very bottom of this tall section, so the
  // section-level trigger fired (top 30% visible) while the stat row was still
  // below the fold — its fade-in + count-up ran off-screen → static end state.
  // Dedicated trigger so the stat row animates when IT is ~30% in view.
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 })
  return (
    <section ref={sectionRef} className="bg-[#0A0F1A] text-slate-100 pt-10 pb-24 md:pt-14 md:pb-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Two columns — 8 cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* LEFT */}
          <div>
            <Eyebrow>Container Data at This Point</Eyebrow>
            <div className="space-y-3">
              {containerData.map((row, i) => (
                <motion.div
                  key={row.title}
                  {...card(LEFT_DELAYS[i], inView)}
                  className={`rounded-lg p-4 ${row.cardClass}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-slate-100">{row.title}</div>
                      <div className="mt-1 text-sm text-slate-400">{row.detail}</div>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-bold uppercase tracking-wide ${row.tagClass}`}
                    >
                      {row.tag}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <Eyebrow>Systems in Use</Eyebrow>
            <div className="space-y-3">
              {systems.map((sys, i) => (
                <motion.div
                  key={sys.name}
                  {...card(RIGHT_DELAYS[i], inView)}
                  className="rounded-lg border border-slate-800 bg-slate-900/50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <StatusDot status={sys.status} />
                    <div>
                      <div className="font-semibold text-slate-100">{sys.name}</div>
                      <div className="mt-1 text-sm text-slate-400">{sys.detail}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stat row */}
        <div ref={statsRef} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...card(i * STAT_STAGGER, statsInView)}
              className={`rounded-2xl p-6 ${s.cardClass}`}
            >
              <div className={`text-4xl font-extrabold ${s.numClass}`}>
                {s.parts.map((p, idx) =>
                  'n' in p ? <CountUp key={idx} to={p.n} active={statsInView} /> : <span key={idx}>{p.t}</span>
                )}
              </div>
              <div className="mt-2 text-sm text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
