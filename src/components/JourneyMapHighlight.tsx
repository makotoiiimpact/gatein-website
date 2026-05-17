'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Building2, AlertTriangle } from 'lucide-react'

/**
 * JourneyMapHighlight — abbreviated view of Bernardo's gatein.ai opportunity
 * journey map. Content is verbatim per the May 16 2026 v2 spec; product claims
 * ("5 of 8", "7–10 min", "< 2 min") are not paraphrased.
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
    valueClass: 'text-cyan-600',
    bgClass: 'bg-sky-100',
    borderClass: 'border-sky-200',
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
    valueClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
  },
]

type DataRow = {
  title: string
  detail: string
  tag: string
  tagClass: string
  rowClass: string
}

const containerData: DataRow[] = [
  {
    title: 'Container ID at DC Gate',
    detail: 'Security guard or WMS scan — often just truck plate',
    tag: 'MANUAL/PAPER',
    tagClass: 'text-red-600',
    rowClass: 'bg-red-50 border border-red-200 border-l-4 border-l-red-600',
  },
  {
    title: 'Seal Verification',
    detail: 'Manually checked against B/L — often skipped',
    tag: 'MANUAL/PAPER',
    tagClass: 'text-red-600',
    rowClass: 'bg-red-50 border border-red-200 border-l-4 border-l-red-600',
  },
  {
    title: 'Cargo Condition at Opening',
    detail: 'Receiving team inspects cargo, not container',
    tag: 'MANUAL/PAPER',
    tagClass: 'text-red-600',
    rowClass: 'bg-red-50 border border-red-200 border-l-4 border-l-red-600',
  },
  {
    title: 'Container Departure',
    detail: 'Empty departure rarely logged',
    tag: 'NOT CAPTURED',
    tagClass: 'text-neutral-500',
    rowClass: 'bg-neutral-50 border border-neutral-200 border-l-4 border-l-neutral-400',
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

const opportunities: string[] = [
  'AI gate captures container at DC arrival and departure — stops demurrage bleeding',
  'Seal verified automatically against customs database',
  'Condition at opening documented before cargo is touched',
  'Triggers automated empty return booking to depot via agentic workflow',
]

function StatusDot({ status }: { status: Status }) {
  if (status === 'full') {
    return <span aria-hidden className="mt-1 h-3 w-3 shrink-0 rounded-full bg-emerald-600" />
  }
  if (status === 'half') {
    return (
      <span
        aria-hidden
        className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-amber-600"
        style={{ background: 'linear-gradient(90deg, #d97706 50%, transparent 50%)' }}
      />
    )
  }
  return <span aria-hidden className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-red-600" />
}

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

const EyebrowHeading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="border-b border-neutral-100 pb-2 mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
    {children}
  </h4>
)

export function JourneyMapHighlight() {
  return (
    <section className="bg-white text-slate-900 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* 1. Section header */}
        <motion.div {...reveal} transition={{ delay: 0 }} className="mb-12 max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Container Journey · System Gaps
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Where containers go dark — and where gatein.ai fits
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            Mapping the 9 touchpoints from factory to distribution centre.
          </p>
        </motion.div>

        {/* 2. Stat row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              {...reveal}
              transition={{ delay: 0.05 + i * 0.05 }}
              className={`rounded-2xl p-6 border ${s.borderClass} ${s.bgClass}`}
            >
              <div className={`text-3xl md:text-4xl font-extrabold ${s.valueClass}`}>{s.value}</div>
              <div className="mt-2 text-sm text-neutral-600">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* 3. Featured touchpoint: Distribution Centre */}
        <motion.div {...reveal} transition={{ delay: 0.35 }} className="mt-16">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-cyan-600">
              <Building2 className="h-5 w-5" />
            </span>
            <h3 className="text-2xl font-bold tracking-tight">Distribution Centre</h3>
          </div>
          <div className="mt-3">
            <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Destination Phase
            </span>
          </div>
          <p className="mt-2 max-w-3xl text-base text-neutral-600">
            Container arrives at the consignee&apos;s distribution centre. Cargo is stripped and
            the empty container is returned to the depot.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* LEFT — Container data */}
            <motion.div {...reveal} transition={{ delay: 0.4 }}>
              <EyebrowHeading>Container Data at This Point</EyebrowHeading>
              <div className="space-y-3">
                {containerData.map((row) => (
                  <div key={row.title} className={`rounded-lg p-4 ${row.rowClass}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-slate-900">{row.title}</div>
                        <div className="mt-1 text-sm text-neutral-600">{row.detail}</div>
                      </div>
                      <span
                        className={`shrink-0 text-xs font-bold uppercase tracking-wide ${row.tagClass}`}
                      >
                        {row.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Systems in use */}
            <motion.div {...reveal} transition={{ delay: 0.4 }}>
              <EyebrowHeading>Systems in Use</EyebrowHeading>
              <div className="space-y-3">
                {systems.map((sys) => (
                  <div
                    key={sys.name}
                    className="rounded-lg border border-neutral-200 bg-neutral-50 p-4"
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
            </motion.div>
          </div>
        </motion.div>

        {/* 4. Operational problems */}
        <motion.div {...reveal} transition={{ delay: 0.45 }} className="mt-12">
          <EyebrowHeading>Operational Problems</EyebrowHeading>
          <div className="flex flex-col gap-3">
            {problems.map((p) => (
              <div
                key={p}
                className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <span className="text-sm text-neutral-700">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 5. gatein.ai opportunity panel */}
        <motion.div
          {...reveal}
          transition={{ delay: 0.55 }}
          className="mt-12 rounded-lg border-l-4 border-cyan-600 bg-gradient-to-br from-sky-50 to-sky-100 p-6"
        >
          <span className="inline-block rounded bg-violet-600 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white">
            gatein.ai — Growing Opportunity
          </span>
          <div className="mt-4 flex flex-col gap-3">
            {opportunities.map((o) => (
              <div key={o} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 shrink-0 text-cyan-600">
                  ◆
                </span>
                <span className="text-base leading-relaxed text-sky-900">{o}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
