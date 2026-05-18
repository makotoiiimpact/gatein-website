'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Camera, Cpu } from 'lucide-react';

/**
 * "From camera to dashboard in under 2 seconds" — 4-step pipeline.
 * Each step icon plays a short micro-animation; the sequence runs L→R on
 * scroll-in and loops (~6s cycle) while the section is in view, reinforcing
 * the speed pitch. prefers-reduced-motion → static final-state icons, no loop.
 *
 * Steps 01/02 keep their lucide icon with layered overlays; 03/04 are custom
 * inline SVGs because lucide's static paths can't be drawn "from empty".
 */

type Step = { title: string; desc: string };

const steps: Step[] = [
  { title: 'Image Capture', desc: 'Multi-camera array captures every angle' },
  { title: 'AI Processing', desc: 'Edge AI processes locally, no cloud needed' },
  { title: 'Validation', desc: 'Automatic validation against databases' },
  { title: 'Output', desc: 'Real-time results via API or dashboard' },
];

// Sequential L→R: ~0.6s/step with ~0.15s overlap → 0.45 stagger.
const STAGGER = 0.45;

type IconProps = { idx: number; play: boolean; cycle: number; reduce: boolean };

function StepIcon({ idx, play, cycle, reduce }: IconProps) {
  const delay = idx * STAGGER;

  // ---- Step 01: Image Capture — kept <Camera> + flash + ISO glimpse ----
  if (idx === 0) {
    return (
      <div className="relative flex items-center justify-center w-full h-full">
        <Camera size={32} />
        {!reduce && (
          <>
            <motion.div
              key={`flash-${cycle}`}
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(186,230,253,0.95) 0%, rgba(6,182,212,0.45) 40%, transparent 70%)',
              }}
              initial={{ opacity: 0 }}
              animate={play ? { opacity: [0, 0.9, 0] } : { opacity: 0 }}
              transition={{ duration: 0.22, times: [0, 0.4, 1], delay }}
            />
            <motion.div
              key={`iso-${cycle}`}
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-wider text-[#06B6D4] whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, y: 3 }}
              animate={play ? { opacity: [0, 1, 1, 0], y: [3, 0, 0, 0] } : { opacity: 0, y: 3 }}
              transition={{ duration: 0.45, times: [0, 0.25, 0.7, 1], delay: delay + 0.15 }}
            >
              ISO 45G1
            </motion.div>
          </>
        )}
      </div>
    );
  }

  // ---- Step 02: AI Processing — kept <Cpu> + side traces + power-up ----
  if (idx === 1) {
    const traces = [
      { side: 'left' as const, top: '40%' },
      { side: 'left' as const, top: '60%' },
      { side: 'right' as const, top: '40%' },
      { side: 'right' as const, top: '60%' },
    ];
    return (
      <div className="relative flex items-center justify-center w-full h-full">
        {!reduce &&
          traces.map((t, i) => (
            <motion.div
              key={`trace-${i}-${cycle}`}
              className="absolute h-[2px] w-4 bg-[#06B6D4]"
              style={{
                top: t.top,
                [t.side]: '0.5rem',
                transformOrigin: t.side,
                boxShadow: '0 0 4px rgba(6,182,212,0.8)',
              }}
              initial={{ scaleX: 0 }}
              animate={play ? { scaleX: [0, 1] } : { scaleX: 0 }}
              transition={{ duration: 0.35, delay }}
            />
          ))}
        <motion.div
          key={`cpu-${cycle}`}
          className="relative flex items-center justify-center"
          style={{ color: '#2563EB' }}
          animate={
            play && !reduce
              ? {
                  color: ['#2563EB', '#06B6D4', '#3B82F6'],
                  filter: [
                    'drop-shadow(0 0 0 rgba(6,182,212,0))',
                    'drop-shadow(0 0 8px rgba(6,182,212,0.85))',
                    'drop-shadow(0 0 3px rgba(6,182,212,0.4))',
                  ],
                }
              : {}
          }
          transition={{ duration: 0.5, times: [0, 0.5, 1], delay: delay + 0.3 }}
        >
          <Cpu size={32} />
        </motion.div>
      </div>
    );
  }

  // ---- Step 03: Validation — custom SVG, circle + check draw in ----
  if (idx === 2) {
    return (
      <motion.div
        key={`val-${cycle}`}
        className="flex items-center justify-center"
        animate={
          play && !reduce
            ? {
                scale: [1, 1, 1.08, 1],
                filter: [
                  'drop-shadow(0 0 0 rgba(34,197,94,0))',
                  'drop-shadow(0 0 0 rgba(34,197,94,0))',
                  'drop-shadow(0 0 9px rgba(34,197,94,0.8))',
                  'drop-shadow(0 0 4px rgba(34,197,94,0.4))',
                ],
              }
            : {}
        }
        transition={{ duration: 0.9, times: [0, 0.78, 0.9, 1], delay }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <motion.circle
            key={`vc-${cycle}`}
            cx="12"
            cy="12"
            r="9"
            stroke="#2563EB"
            strokeWidth="2"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={play && !reduce ? { pathLength: 1 } : { pathLength: reduce ? 1 : 0 }}
            transition={{ duration: 0.4, delay }}
          />
          <motion.path
            key={`vk-${cycle}`}
            d="M7.5 12.5 L10.5 15.5 L16.5 8.5"
            stroke="#22C55E"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={play && !reduce ? { pathLength: 1 } : { pathLength: reduce ? 1 : 0 }}
            transition={{ duration: 0.3, delay: delay + 0.4 }}
          />
        </svg>
      </motion.div>
    );
  }

  // ---- Step 04: Output — custom SVG, bars grow + sparkline draws ----
  const bars = [
    { x: 4.5, y: 13, h: 7, fill: '#2563EB' },
    { x: 10.2, y: 7, h: 13, fill: '#06B6D4' },
    { x: 15.9, y: 10, h: 10, fill: '#2563EB' },
  ];
  return (
    <div className="flex items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <line x1="3" y1="20" x2="21" y2="20" stroke="#334155" strokeWidth="1.5" />
        {bars.map((b, i) => (
          <motion.rect
            key={`bar-${i}-${cycle}`}
            x={b.x}
            y={b.y}
            width="3.4"
            height={b.h}
            rx="0.5"
            fill={b.fill}
            style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
            initial={{ scaleY: reduce ? 1 : 0 }}
            animate={play && !reduce ? { scaleY: 1 } : { scaleY: reduce ? 1 : 0 }}
            transition={{ duration: 0.45, delay: delay + i * 0.08, ease: 'easeOut' }}
          />
        ))}
        <motion.path
          key={`spark-${cycle}`}
          d="M4 12 L9 8 L14 11 L20 5"
          stroke="#22D3EE"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={play && !reduce ? { pathLength: 1 } : { pathLength: reduce ? 1 : 0 }}
          transition={{ duration: 0.35, delay: delay + 0.55 }}
        />
      </svg>
    </div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const reduce = useReducedMotion() ?? false;
  const [cycle, setCycle] = useState(0);
  const play = inView && !reduce;

  // Loop the sequence every ~6s while in view; pause off-screen (perf).
  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => setCycle((c) => c + 1), 6000);
    return () => clearInterval(id);
  }, [play]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-32 bg-[#0F172A] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            From camera to dashboard in under{' '}
            <span className="font-mono">2</span> seconds.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line — static base */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-slate-800 z-0" />

          {/* Connecting line — one-time entrance draw-in */}
          <motion.div
            className="hidden md:block absolute top-12 left-[10%] h-[1px] bg-[#2563EB] z-0 origin-left"
            style={{ width: '80%' }}
            initial={{ scaleX: reduce ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: reduce ? 0 : 1.5, ease: 'easeInOut' }}
          />

          {/* Connecting line — data-flow pulse (transform/opacity only,
              desktop-only, replays each cycle, hidden under reduced motion) */}
          {!reduce && (
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] z-0 overflow-hidden pointer-events-none">
              <motion.div
                key={`pulse-${cycle}`}
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 42%, #22D3EE 50%, transparent 58%)',
                }}
                initial={{ x: '-55%', opacity: 0 }}
                animate={play ? { x: ['-55%', '55%'], opacity: [0, 1, 1, 0] } : { x: '-55%', opacity: 0 }}
                transition={{
                  x: { duration: 2.1, ease: 'linear', delay: 0.1 },
                  opacity: { duration: 2.1, times: [0, 0.08, 0.88, 1], ease: 'linear', delay: 0.1 },
                }}
              />
            </div>
          )}

          <div className="grid md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-lg bg-[#1E293B] border border-slate-700 shadow-[0_0_0_1px_rgba(37,99,235,0.2)] flex items-center justify-center text-[#2563EB] mb-6 relative overflow-hidden">
                  <StepIcon idx={index} play={play} cycle={cycle} reduce={reduce} />
                </div>
                <div className="text-[#2563EB] font-mono text-sm font-bold mb-2 tracking-widest">
                  STEP 0{index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
