'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PenLine, Clock } from 'lucide-react'

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

function Eyebrow({ children, tone }: { children: React.ReactNode; tone: 'manual' | 'ai' }) {
  const cls =
    tone === 'manual'
      ? 'text-[#FF6B6B] bg-[#FF6B6B]/10 border-[#FF6B6B]/30'
      : 'text-[#2563EB] bg-[#2563EB]/10 border-[#2563EB]/30'
  return (
    <span
      className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-mono uppercase tracking-[0.2em] ${cls}`}
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
    </div>
  )
}

function SurveyFormDocument() {
  return (
    <figure className="relative my-2">
      <div
        className="relative overflow-hidden"
        style={{
          transform: 'rotate(-3deg)',
          borderRadius: 4,
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          height: 260,
        }}
      >
        <img
          src="/assets/damage/survey-form.png"
          alt="IICL Container Survey Form sample"
          loading="lazy"
          className="block w-full h-auto"
          style={{ filter: 'sepia(0.08) contrast(0.95)' }}
        />
        {/* Hand-annotation: red pen mark over a damage row */}
        <svg
          className="absolute pointer-events-none"
          width="82"
          height="38"
          viewBox="0 0 82 38"
          style={{ top: '44%', left: '26%', transform: 'rotate(-6deg)' }}
          aria-hidden="true"
        >
          <ellipse
            cx="41"
            cy="19"
            rx="36"
            ry="14"
            fill="none"
            stroke="#DC2626"
            strokeWidth="2.2"
            strokeDasharray="5 3"
            opacity="0.78"
          />
        </svg>
        {/* Fade to section background at bottom edge */}
        <div
          className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{
            height: 90,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(10,22,40,0.85) 70%, #0A1628 100%)',
          }}
        />
      </div>
      <figcaption className="mt-6 font-mono text-sm md:text-base text-white/70 leading-relaxed">
        Container Survey Form — still filled by hand at most facilities
      </figcaption>
    </figure>
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
  const iconBg = tone === 'manual' ? 'bg-[#FF6B6B]/10' : 'bg-[#2563EB]/15'
  return (
    <div className={`flex items-center gap-5 rounded-xl border ${ring} px-6 py-5 md:px-7 md:py-6`}>
      <div className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${iconBg}`}>
        <Icon className={`w-6 h-6 ${accent}`} />
      </div>
      <div className="min-w-0">
        <div className="font-mono text-xs md:text-sm uppercase tracking-[0.16em] text-white/55 mb-1">
          {label}
        </div>
        <div className="text-white font-bold text-xl md:text-2xl leading-tight">{value}</div>
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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 max-w-3xl mx-auto">
            From paper forms to pixel-perfect detection.
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Today&apos;s damage audits rely on clipboards, handwritten codes, and the inspector&apos;s line of sight.
            GateIn AI scans every surface in under 30 seconds and ships a digital record of what it found.
          </p>
        </motion.div>

        {/* BEFORE — Manual process (full-width) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 flex flex-col"
        >
          <div className="flex items-center mb-6">
            <Eyebrow tone="manual">How damage is done today · Manual</Eyebrow>
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold mb-3">Clipboards, codes, and best-guess visibility.</h3>
          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-5xl">
            Inspectors walk the container, eyeball the damage, and mark handwritten codes on a paper form.
            Photos live on someone&apos;s phone. The record is a faxable scan.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-10">
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

          <SurveyFormDocument />

          <div className="grid grid-cols-2 gap-4 mt-auto pt-10">
            <StatPill icon={Clock} tone="manual" label="Time per audit" value="~30 min" />
            <StatPill icon={PenLine} tone="manual" label="Record type" value="Handwritten" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
