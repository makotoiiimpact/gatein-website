'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Building2, AlertTriangle } from 'lucide-react'

/**
 * JourneyMapHighlight — abbreviated view of Bernardo's gatein.ai opportunity
 * journey map (React App gatein_ai map opportunity V2.html). Content is
 * verbatim per the May 16 2026 spec; product claims ("5 of 8", "7–10 min",
 * "< 2 min") are not paraphrased.
 */

type Stat = {
  value: string
  label: string
  valueClass: string
  bgClass: string
  borderClass: string
}

const stats: Stat[] = [
  {
    value: '5 of 8',
    label: 'Gate touchpoints with NO digital system',
    valueClass: 'text-red-600',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
  },
  {
    value: '3 sites',
    label: 'Primary gatein.ai target sites',
    valueClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
  },
  {
    value: '7–10 min',
    label: 'Avg gate time without AI',
    valueClass: 'text-amber-600',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
  },
  {
    value: '< 2 min',
    label: 'Avg gate time with gatein.ai',
    valueClass: 'text-green-600',
    bgClass: 'bg-green-50',
    borderClass: 'border-green-200',
  },
]

type DataRow = {
  title: string
  detail: string
  tag: string
  tagClass: string
  rowBg: string
  rowBorder: string
}

const containerData: DataRow[] = [
  {
    title: 'Container ID at DC Gate',
    detail: 'Security guard or WMS scan — often just truck plate',
    tag: 'MANUAL/PAPER',
    tagClass: 'text-red-600',
    rowBg: 'bg-red-50',
    rowBorder: 'border-l-red-500',
  },
  {
    title: 'Seal Verification',
    detail: 'Manually checked against B/L — often skipped',
    tag: 'MANUAL/PAPER',
    tagClass: 'text-red-600',
    rowBg: 'bg-red-50',
    rowBorder: 'border-l-red-500',
  },
  {
    title: 'Cargo Condition at Opening',
    detail: 'Receiving team inspects cargo, not container',
    tag: 'MANUAL/PAPER',
    tagClass: 'text-red-600',
    rowBg: 'bg-red-50',
    rowBorder: 'border-l-red-500',
  },
  {
    title: 'Container Departure',
    detail: 'Empty departure rarely logged',
    tag: 'NOT CAPTURED',
    tagClass: 'text-neutral-500',
    rowBg: 'bg-neutral-50',
    rowBorder: 'border-l-neutral-400',
  },
]

type Status = 'full' | 'half' | 'empty'

type SystemRow = {
  status: Status
  name: string
  detail: string
}

const systems: SystemRow[] = [
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
  {
    status: 'empty',
    name: 'Gate System',
    detail: 'Usually a barrier + guard; no OCR',
  },
  {
    status: 'empty',
    name: 'Carrier System Integration',
    detail: 'WMS and carrier systems are siloed',
  },
]

const problems: string[] = [
  'WMS tracks pallets, not containers — container data chain breaks here',
  'Seal verification inconsistent — security risk',
  'Empty container departure unrecorded → demurrage clock keeps running',
  'No condition documentation before stripping → damage claims impossible',
]

function StatusDot({ status }: { status: Status }) {
  if (status === 'full') {
    return <span aria-hidden className="mt-1 h-3 w-3 shrink-0 rounded-full bg-green-500" />
  }
  if (status === 'half') {
    return (
      <span
        aria-hidden
        className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-amber-500"
        style={{ background: 'linear-gradient(90deg, #f59e0b 50%, transparent 50%)' }}
      />
    )
  }
  return <span aria-hidden className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-red-400" />
}

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export function JourneyMapHighlight() {
  return (
    <section className="bg-white text-slate-900 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section 1 — Stat row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              {...reveal}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl p-6 border ${s.borderClass} ${s.bgClass}`}
            >
              <div className={`text-3xl font-bold ${s.valueClass}`}>{s.value}</div>
              <div className="mt-2 text-sm text-neutral-600">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Section 2 — Featured touchpoint: Distribution Centre */}
        <motion.div
          {...reveal}
          transition={{ delay: 0.25 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Building2 className="h-5 w-5" />
            </span>
            <h3 className="text-2xl font-bold tracking-tight">Distribution Centre</h3>
          </div>
          <div className="mt-3">
            <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
              Destination Phase
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-base text-neutral-600">
            Container arrives at the consignee&apos;s distribution centre. Cargo is stripped and
            the empty container is returned to the depot.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* Left — Container data */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Container Data at This Point
              </h4>
              <div className="mt-4 space-y-3">
                {containerData.map((row) => (
                  <div
                    key={row.title}
                    className={`rounded-lg border-l-4 ${row.rowBorder} ${row.rowBg} p-4`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-slate-900">{row.title}</div>
                        <div className="mt-1 text-sm text-neutral-600">{row.detail}</div>
                      </div>
                      <span
                        className={`shrink-0 text-xs font-semibold uppercase tracking-wide ${row.tagClass}`}
                      >
                        {row.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Systems in use */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Systems in Use
              </h4>
              <div className="mt-4 space-y-3">
                {systems.map((sys) => (
                  <div
                    key={sys.name}
                    className="rounded-lg border border-neutral-200 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <StatusDot status={sys.status} />
                      <div>
                        <div className="font-semibold text-slate-900">{sys.name}</div>
                        <div className="mt-1 text-sm text-neutral-600">{sys.detail}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 3 — Operational problems */}
        <motion.div
          {...reveal}
          transition={{ delay: 0.35 }}
          className="mt-12"
        >
          <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Operational Problems
          </h4>
          <div className="mt-4 flex flex-col gap-3">
            {problems.map((p) => (
              <div
                key={p}
                className="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-3"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <span className="text-sm text-slate-700">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
