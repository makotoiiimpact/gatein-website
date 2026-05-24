'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

/**
 * AfterScanDashboard — dark-themed panel shown in the dark zone directly below
 * the Container3D scan animation. Renders the 4 "Systems in Use" cards on a
 * single centered column, layered over a faded Detention & Demurrage dashboard
 * backdrop that fills the visual weight the removed stat row vacated.
 * ("Container Data at This Point" column removed per Bernardo round 2 feedback
 * #3; the four-stat row removed pre-launch per the May 21 Bernardo/Jordi
 * meeting — confidentiality of site-count and target-site stats.) Section
 * background is #0A0F1A to read as a seamless continuation of the Container3D
 * section.
 */

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

const card = (delayMs: number, inView: boolean) => ({
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 },
  transition: { duration: 0.4, ease: 'easeOut' as const, delay: delayMs / 1000 },
})

// Staggered entrance cascade for the Systems-in-Use column.
const RIGHT_DELAYS = [0, 120, 240, 360]

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <h4 className="border-b border-slate-800 pb-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
    {children}
  </h4>
)

export function AfterScanDashboard() {
  const sectionRef = useRef<HTMLElement>(null)
  // Section-level trigger: fires when the dashboard is ~30% in view, so the
  // staggered entrance runs when the user actually sees the section — not
  // 1px-into-viewport while still scrolling the Container3D pin above (which
  // played the once:true animation off-screen → static end state).
  const inView = useInView(sectionRef, { once: true, amount: 0.3 })
  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0A0F1A] text-slate-100 pt-10 pb-24 md:pt-14 md:pb-32">
      {/* Faded Detention & Demurrage dashboard backdrop. Decorative — sits
          behind the systems cards and provides visual weight where the four-
          stat row used to be. Starting opacity 0.15 (midpoint of the spec's
          0.10–0.20 range); tune the opacity-[…] class for shallower/deeper
          fade. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.15]">
        <Image
          src="/assets/images/detention-demurrage-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto">
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
    </section>
  )
}
