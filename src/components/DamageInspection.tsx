'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, PenLine, Clock, Scan, Box, Database } from 'lucide-react'

type DamageType = {
  label: string
  images: string[]
  gradient: string
}

const DAMAGE_TYPES: DamageType[] = [
  { label: 'Dent damage',      images: ['1.jpeg', '2.jpeg', '10.jpeg'], gradient: 'linear-gradient(135deg, #3F3120 0%, #7C5A3A 100%)' },
  { label: 'Rust / corrosion', images: ['3.jpeg', '9.jpeg'],            gradient: 'linear-gradient(135deg, #4A2818 0%, #B55B2E 100%)' },
  { label: 'Panel hole',       images: ['4.jpeg', '5.jpeg', '6.jpeg'],  gradient: 'linear-gradient(135deg, #1F2937 0%, #475569 100%)' },
  { label: 'Door damage',      images: ['7.jpeg', '8.jpeg'],            gradient: 'linear-gradient(135deg, #312E2A 0%, #6B5B47 100%)' },
  { label: 'Floor damage',     images: ['11.jpeg', '12.jpeg'],          gradient: 'linear-gradient(135deg, #2A2218 0%, #5A4530 100%)' },
  { label: 'Roof damage',      images: ['13.jpeg', '14.jpeg'],          gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)' },
]

const SURVEY_ROWS = [
  { code: 'DTB', desc: 'Dent, top, bowed' },
  { code: 'HBL', desc: 'Hole, bottom, left' },
  { code: 'RST', desc: 'Rust, side, top' },
  { code: 'CRP', desc: 'Corner post, dmg' },
]

const DETECTION_ROWS = [
  { code: 'DT-04',  conf: 98.7, label: 'Dent — top panel'        },
  { code: 'RST-11', conf: 96.1, label: 'Rust — side panel'       },
  { code: 'HBL-02', conf: 94.8, label: 'Hole — lower rail'       },
  { code: 'DR-07',  conf: 99.2, label: 'Door — hinge deformed'   },
]

function Eyebrow({ children, tone }: { children: React.ReactNode; tone: 'manual' | 'ai' }) {
  const cls =
    tone === 'manual'
      ? 'text-[#FF6B6B] bg-[#FF6B6B]/10 border-[#FF6B6B]/30'
      : 'text-[#2563EB] bg-[#2563EB]/10 border-[#2563EB]/30'
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono uppercase tracking-[0.18em] ${cls}`}
    >
      {children}
    </span>
  )
}

const CROSSFADE_CYCLE_MS = 3500
const STAGGER_STEP_MS = 500

function DamageCard({
  label,
  images,
  gradient,
  staggerIndex,
}: {
  label: string
  images: string[]
  gradient: string
  staggerIndex: number
}) {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    let intervalId: ReturnType<typeof setInterval> | undefined
    const startDelay = staggerIndex * STAGGER_STEP_MS
    const startTimeout = setTimeout(() => {
      setActiveIdx((i) => (i + 1) % images.length)
      intervalId = setInterval(() => {
        setActiveIdx((i) => (i + 1) % images.length)
      }, CROSSFADE_CYCLE_MS)
    }, startDelay)
    return () => {
      clearTimeout(startTimeout)
      if (intervalId) clearInterval(intervalId)
    }
  }, [images.length, staggerIndex])

  const currentFile = images[activeIdx] ?? ''

  return (
    <div
      className="relative rounded-lg overflow-hidden aspect-[4/3]"
      style={{ background: gradient, boxShadow: '0 6px 18px -6px rgba(0,0,0,0.4)' }}
    >
      {images.map((file, i) => (
        <div
          key={file}
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out"
          style={{
            backgroundImage: `url(/assets/damage/${file})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === activeIdx ? 1 : 0,
          }}
        />
      ))}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 100%)',
        }}
      />
      <span className="absolute bottom-2.5 left-3 right-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/95">
        {label}
      </span>
      <span className="absolute top-2.5 left-3 font-mono text-[9px] uppercase tracking-[0.1em] text-white/70 bg-black/30 px-1.5 py-0.5 rounded-sm backdrop-blur-[2px]">
        {currentFile}
      </span>
    </div>
  )
}

function SurveyFormMock() {
  return (
    <div className="relative bg-[#F5EFE2] text-[#1B1B1B] rounded-md p-5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] rotate-[-1.2deg] font-mono">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1B1B1B]/20">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#1B1B1B]/60">
            Container Survey Form
          </div>
          <div className="text-sm font-bold">Gate Audit — Manual Record</div>
        </div>
        <FileText className="w-5 h-5 opacity-40" />
      </div>
      <div className="space-y-2 text-[11px]">
        {SURVEY_ROWS.map((r) => (
          <div key={r.code} className="flex items-center gap-3 border-b border-dashed border-[#1B1B1B]/20 pb-1.5">
            <span className="inline-flex w-3 h-3 border border-[#1B1B1B]/50 rounded-sm" />
            <span className="font-bold tracking-wider">{r.code}</span>
            <span className="text-[#1B1B1B]/70">{r.desc}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-[#1B1B1B]/20 flex items-center gap-2 text-[10px] text-[#1B1B1B]/60">
        <PenLine className="w-3.5 h-3.5" />
        <span>Inspector signature required</span>
      </div>
    </div>
  )
}

function ContainerDetectionMock() {
  return (
    <div className="relative bg-[#0B1423] border border-[#2563EB]/20 rounded-lg p-5 shadow-[0_20px_60px_-10px_rgba(37,99,235,0.25)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#2563EB]">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-[#2563EB] opacity-60 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-[#2563EB]" />
          </span>
          Live Scan · Container Inspector V4
        </div>
        <span className="font-mono text-[10px] text-white/40">0:27s</span>
      </div>

      <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-white/10 bg-[radial-gradient(ellipse_at_center,#1E293B_0%,#0B1423_70%)]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(37,99,235,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.25) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '70%',
            height: '50%',
            background: 'linear-gradient(160deg, #334155 0%, #1E293B 60%, #0F172A 100%)',
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          <div className="absolute inset-y-3 left-[10%] w-px bg-white/10" />
          <div className="absolute inset-y-3 left-[30%] w-px bg-white/10" />
          <div className="absolute inset-y-3 left-[50%] w-px bg-white/10" />
          <div className="absolute inset-y-3 left-[70%] w-px bg-white/10" />
          <div className="absolute inset-y-3 left-[90%] w-px bg-white/10" />
        </div>

        <motion.div
          className="absolute border-2 border-[#FF6B6B] rounded-sm"
          style={{ top: '28%', left: '22%', width: '14%', height: '16%' }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span className="absolute -top-5 left-0 font-mono text-[9px] uppercase tracking-wider text-[#FF6B6B] bg-[#0B1423] px-1.5 py-0.5 rounded-sm border border-[#FF6B6B]/40">
            DT-04 · 98.7
          </span>
        </motion.div>
        <motion.div
          className="absolute border-2 border-[#F59E0B] rounded-sm"
          style={{ top: '52%', left: '44%', width: '18%', height: '14%' }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span className="absolute -top-5 left-0 font-mono text-[9px] uppercase tracking-wider text-[#F59E0B] bg-[#0B1423] px-1.5 py-0.5 rounded-sm border border-[#F59E0B]/40">
            RST-11 · 96.1
          </span>
        </motion.div>
        <motion.div
          className="absolute border-2 border-[#2563EB] rounded-sm"
          style={{ top: '64%', left: '20%', width: '10%', height: '10%' }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <span className="absolute -top-5 left-0 font-mono text-[9px] uppercase tracking-wider text-[#2563EB] bg-[#0B1423] px-1.5 py-0.5 rounded-sm border border-[#2563EB]/40">
            HBL-02 · 94.8
          </span>
        </motion.div>
      </div>

      <div className="mt-4 space-y-1.5">
        {DETECTION_ROWS.map((r) => (
          <div key={r.code} className="flex items-center gap-3 text-[11px] font-mono">
            <span className="text-[#2563EB] font-semibold w-14">{r.code}</span>
            <span className="text-white/80 flex-1 truncate">{r.label}</span>
            <span className="text-white/50 tabular-nums">{r.conf.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatPill({ icon: Icon, label, value, tone }: {
  icon: React.ElementType
  label: string
  value: string
  tone: 'manual' | 'ai'
}) {
  const ring = tone === 'manual' ? 'border-white/10 bg-white/5' : 'border-[#2563EB]/30 bg-[#2563EB]/5'
  const accent = tone === 'manual' ? 'text-[#FF6B6B]' : 'text-[#2563EB]'
  return (
    <div className={`flex items-center gap-3 rounded-lg border ${ring} px-4 py-3`}>
      <Icon className={`w-4 h-4 ${accent}`} />
      <div>
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">{label}</div>
        <div className="text-white font-semibold text-sm">{value}</div>
      </div>
    </div>
  )
}

export function DamageInspection() {
  return (
    <section id="damage" className="relative py-32 bg-[#0A1628] text-white overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.03] text-white/70 font-mono text-[11px] uppercase tracking-[0.18em] mb-6">
            How damage is done today
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 max-w-3xl mx-auto">
            From paper forms to pixel-perfect detection.
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Today&apos;s damage audits rely on clipboards, handwritten codes, and the inspector&apos;s line of sight.
            GateIn AI scans every surface in under 30 seconds and ships a digital record of what it found.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* BEFORE — Manual process */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <Eyebrow tone="manual">Before · Manual</Eyebrow>
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Ref: UBICACIONES.xlsx</span>
            </div>

            <h3 className="text-xl font-semibold mb-2">Clipboards, codes, and best-guess visibility.</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Inspectors walk the container, eyeball the damage, and mark handwritten codes on a paper form.
              Photos live on someone&apos;s phone. The record is a faxable scan.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {DAMAGE_TYPES.map((d, i) => (
                <DamageCard
                  key={d.label}
                  label={d.label}
                  images={d.images}
                  gradient={d.gradient}
                  staggerIndex={i}
                />
              ))}
            </div>

            <SurveyFormMock />

            <div className="grid grid-cols-2 gap-3 mt-8">
              <StatPill icon={Clock} tone="manual" label="Time per audit" value="4–6 min" />
              <StatPill icon={PenLine} tone="manual" label="Record type" value="Handwritten" />
            </div>
          </motion.div>

          {/* AFTER — GateIn AI */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative rounded-2xl border border-[#2563EB]/25 bg-gradient-to-br from-[#2563EB]/[0.06] to-transparent p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <Eyebrow tone="ai">After · GateIn AI</Eyebrow>
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">Container Inspector V4</span>
            </div>

            <h3 className="text-xl font-semibold mb-2">Automated scan. Bounded detections. Digital record.</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Cameras sweep every side as the container moves through the gate. The model returns damage
              classes, bounding boxes, and confidence scores — written to the yard system in real time.
            </p>

            <ContainerDetectionMock />

            <div className="grid grid-cols-2 gap-3 mt-8">
              <StatPill icon={Scan}     tone="ai" label="Time per audit"  value="< 30 sec" />
              <StatPill icon={Database} tone="ai" label="Record type"     value="Digital evidence" />
            </div>

            <div className="flex items-center gap-2 mt-6 text-[11px] font-mono uppercase tracking-wider text-white/40">
              <Box className="w-3.5 h-3.5" />
              Every container. Every side. Every pass.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
