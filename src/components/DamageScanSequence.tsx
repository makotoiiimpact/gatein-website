'use client'

import React, { useState } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'

// ─────────── Timing ───────────
const CYCLE_MS = 12000
const T_P1_END = 4000   // grid scan  (0 → 4s)
const T_P2_END = 5000   // rotate     (4 → 5s)
const T_P3_END = 8000   // markers    (5 → 8s)
// Phase 4 (list fills 8 → 10s) and phase 5 (hold + fade 10 → 12s)
// are derived from T_P3_END offsets and CYCLE_MS below.
const T_P5_END = 12000  // hold + fade (10 → 12s)

// ─────────── Grid geometry ───────────
// IICL-style coding: rows = H (head), T (top half), B (bottom half), G (ground);
// cols = 1..5 (door → front end)
const ROWS = ['H', 'T', 'B', 'G']
const COLS = [1, 2, 3, 4, 5]

const CELL_W = 128
const CELL_H = 65
const GRID_X = 80
const GRID_Y = 50
const CONTAINER_W = CELL_W * 5
const CONTAINER_H = CELL_H * 4

function cellX(col: number) {
  return GRID_X + col * CELL_W
}
function cellY(row: number) {
  return GRID_Y + row * CELL_H
}

// ─────────── Damage markers ───────────
type Marker = {
  id: string
  row: number
  col: number
  color: string
  label: string
  conf: number
  popDelay: number
  listDelay: number
}

const MARKERS: Marker[] = [
  {
    id: 'DT-04',
    row: 1,
    col: 3,
    color: '#EF4444',
    label: 'Dent — top panel',
    conf: 98.7,
    popDelay: 200,
    listDelay: 300,
  },
  {
    id: 'RST-11',
    row: 0,
    col: 0,
    color: '#F59E0B',
    label: 'Rust — side panel',
    conf: 96.1,
    popDelay: 700,
    listDelay: 700,
  },
  {
    id: 'HBL-02',
    row: 2,
    col: 1,
    color: '#2563EB',
    label: 'Hole — lower rail',
    conf: 94.8,
    popDelay: 1300,
    listDelay: 1100,
  },
]

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function formatTime(ms: number) {
  const s = Math.floor(ms / 1000)
  const c = Math.floor((ms % 1000) / 10)
  return `T+${String(s).padStart(2, '0')}:${String(c).padStart(2, '0')}`
}

export function DamageScanSequence() {
  const [time, setTime] = useState(0)
  useAnimationFrame((t) => setTime(t % CYCLE_MS))

  // ─── Global fade at start + end of cycle ───
  const globalOp =
    time < 250
      ? time / 250
      : time > T_P5_END - 500
      ? (T_P5_END - time) / 500
      : 1

  // ─── Phase 1: grid scan progress (cell index 0..20) ───
  const scanIdx =
    time < T_P1_END ? Math.floor((time / T_P1_END) * 20) : 20

  // ─── Phase 2: rotation flip (scaleX 1 → 0 → 1) ───
  let rotScaleX = 1
  if (time >= T_P1_END && time < T_P2_END) {
    const p = (time - T_P1_END) / (T_P2_END - T_P1_END)
    rotScaleX = Math.abs(Math.cos(p * Math.PI))
  }

  const isSide2 = time >= T_P1_END + 500

  return (
    <section
      id="automated-scan"
      className="relative py-24 md:py-32 bg-[#0A1628] text-white overflow-hidden"
    >
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
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#2563EB] font-mono text-sm uppercase tracking-[0.2em] mb-6">
            After · GateIn AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 max-w-3xl mx-auto">
            Automated scan. Bounded detections. Digital record.
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Cameras sweep every side as the container moves through the gate. The model returns damage
            classes, bounding boxes, and confidence scores — written to the yard system in real time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ opacity: globalOp }}
          className="relative rounded-2xl border border-[#2563EB]/25 bg-gradient-to-br from-[#2563EB]/[0.06] to-transparent p-6 md:p-8 shadow-[0_20px_80px_-10px_rgba(37,99,235,0.25)]"
        >
          {/* Header strip */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-[0.18em] text-[#2563EB]">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[#2563EB] opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#2563EB]" />
              </span>
              Live Scan · Container Inspector V4
              <span className="ml-2 text-white/40">Side {isSide2 ? 'B' : 'A'}</span>
            </div>
            <span className="font-mono text-xs md:text-sm text-white/50 tabular-nums">
              {formatTime(time)}
            </span>
          </div>

          {/* Stage */}
          <div
            className="relative rounded-lg overflow-hidden border border-white/10 bg-[#0B1423]"
            style={{ transform: `scaleX(${rotScaleX})`, transformOrigin: 'center' }}
          >
            <svg
              viewBox="0 0 800 350"
              className="w-full h-auto block"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern id="ds-dots" width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="16" cy="16" r="1" fill="rgba(37,99,235,0.12)" />
                </pattern>
                <linearGradient id="ds-containerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
              </defs>

              {/* Dotted field */}
              <rect x="0" y="0" width="800" height="350" fill="url(#ds-dots)" />

              {/* Container body */}
              <rect
                x={GRID_X}
                y={GRID_Y}
                width={CONTAINER_W}
                height={CONTAINER_H}
                fill="url(#ds-containerGrad)"
                stroke="rgba(37,99,235,0.35)"
                strokeWidth="1"
                rx="2"
              />

              {/* Inner grid lines */}
              {Array.from({ length: 4 }, (_, c) => c + 1).map((c) => (
                <line
                  key={`vl${c}`}
                  x1={GRID_X + c * CELL_W}
                  y1={GRID_Y}
                  x2={GRID_X + c * CELL_W}
                  y2={GRID_Y + CONTAINER_H}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: 3 }, (_, r) => r + 1).map((r) => (
                <line
                  key={`hl${r}`}
                  x1={GRID_X}
                  y1={GRID_Y + r * CELL_H}
                  x2={GRID_X + CONTAINER_W}
                  y2={GRID_Y + r * CELL_H}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
              ))}

              {/* Already-scanned cells */}
              {Array.from({ length: 20 }, (_, i) => i).map((i) => {
                if (i >= scanIdx) return null
                const row = Math.floor(i / 5)
                const col = i % 5
                return (
                  <rect
                    key={`sc${i}`}
                    x={cellX(col) + 1}
                    y={cellY(row) + 1}
                    width={CELL_W - 2}
                    height={CELL_H - 2}
                    fill="rgba(37,99,235,0.10)"
                    stroke="rgba(37,99,235,0.28)"
                    strokeWidth="0.6"
                  />
                )
              })}

              {/* Active scan cell */}
              {scanIdx < 20 && (
                <g>
                  {(() => {
                    const row = Math.floor(scanIdx / 5)
                    const col = scanIdx % 5
                    const x = cellX(col)
                    const y = cellY(row)
                    return (
                      <>
                        <rect
                          x={x + 1}
                          y={y + 1}
                          width={CELL_W - 2}
                          height={CELL_H - 2}
                          fill="#06B6D4"
                          opacity="0.28"
                        />
                        <rect
                          x={x}
                          y={y}
                          width={CELL_W}
                          height={CELL_H}
                          fill="none"
                          stroke="#06B6D4"
                          strokeWidth="2"
                        />
                        <g stroke="#06B6D4" strokeWidth="2" fill="none" strokeLinecap="round">
                          <polyline points={`${x + 10},${y} ${x},${y} ${x},${y + 10}`} />
                          <polyline
                            points={`${x + CELL_W - 10},${y} ${x + CELL_W},${y} ${x + CELL_W},${y + 10}`}
                          />
                          <polyline
                            points={`${x + 10},${y + CELL_H} ${x},${y + CELL_H} ${x},${y + CELL_H - 10}`}
                          />
                          <polyline
                            points={`${x + CELL_W - 10},${y + CELL_H} ${x + CELL_W},${y + CELL_H} ${x + CELL_W},${y + CELL_H - 10}`}
                          />
                        </g>
                        {/* Camera dot above current cell */}
                        <g transform={`translate(${x + CELL_W / 2}, ${y - 18})`}>
                          <circle r="9" fill="#06B6D4" opacity="0.18" />
                          <circle r="4" fill="#06B6D4" />
                          <circle r="2" fill="#0B1423" />
                        </g>
                      </>
                    )
                  })()}
                </g>
              )}

              {/* Row labels: H / T / B / G */}
              {ROWS.map((r, i) => (
                <text
                  key={`rl${r}`}
                  x={GRID_X - 22}
                  y={GRID_Y + i * CELL_H + CELL_H / 2 + 4}
                  fill="#2563EB"
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="'JetBrains Mono', monospace"
                  textAnchor="middle"
                >
                  {r}
                </text>
              ))}

              {/* Column labels: 1..5 */}
              {COLS.map((c, i) => (
                <text
                  key={`cl${c}`}
                  x={GRID_X + i * CELL_W + CELL_W / 2}
                  y={GRID_Y + CONTAINER_H + 22}
                  fill="#2563EB"
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="'JetBrains Mono', monospace"
                  textAnchor="middle"
                >
                  {c}
                </text>
              ))}

              {/* Axis hint */}
              <text
                x={GRID_X - 22}
                y={GRID_Y + CONTAINER_H + 22}
                fill="rgba(255,255,255,0.25)"
                fontSize="9"
                fontFamily="'JetBrains Mono', monospace"
                textAnchor="middle"
              >
                IICL
              </text>

              {/* Damage markers — pop-in during phase 3 */}
              {MARKERS.map((m) => {
                const popStart = T_P2_END + m.popDelay
                if (time < popStart) return null
                const since = time - popStart
                const op = since < 300 ? since / 300 : 1
                const scale = since < 300 ? 0.6 + (since / 300) * 0.4 : 1
                const x = cellX(m.col)
                const y = cellY(m.row)
                return (
                  <g key={m.id} style={{ opacity: op }}>
                    <g
                      style={{
                        transformOrigin: `${x + CELL_W / 2}px ${y + CELL_H / 2}px`,
                        transform: `scale(${scale})`,
                      }}
                    >
                      <rect
                        x={x}
                        y={y}
                        width={CELL_W}
                        height={CELL_H}
                        fill={`${m.color}22`}
                        stroke={m.color}
                        strokeWidth="2"
                        strokeDasharray="6 3"
                      />
                      {/* Corner ticks */}
                      <g stroke={m.color} strokeWidth="2" fill="none" strokeLinecap="round">
                        <polyline points={`${x + 10},${y} ${x},${y} ${x},${y + 10}`} />
                        <polyline
                          points={`${x + CELL_W - 10},${y} ${x + CELL_W},${y} ${x + CELL_W},${y + 10}`}
                        />
                      </g>
                    </g>
                    {/* Label tag */}
                    <g transform={`translate(${x}, ${y - 22})`}>
                      <rect
                        x="0"
                        y="0"
                        width="96"
                        height="18"
                        rx="2"
                        fill="#0B1423"
                        stroke={m.color}
                        strokeWidth="1"
                      />
                      <text
                        x="6"
                        y="13"
                        fill={m.color}
                        fontSize="10"
                        fontWeight="700"
                        fontFamily="'JetBrains Mono', monospace"
                        letterSpacing="0.8"
                      >
                        {m.id} · {m.conf.toFixed(1)}%
                      </text>
                    </g>
                  </g>
                )
              })}

              {/* Container ID validation — top-right, appears at phase 3 end */}
              {time >= T_P3_END && (
                <g style={{ opacity: clamp((time - T_P3_END) / 400, 0, 1) }}>
                  <rect
                    x={GRID_X + CONTAINER_W - 218}
                    y="14"
                    width="216"
                    height="24"
                    rx="3"
                    fill="rgba(34,197,94,0.08)"
                    stroke="#22C55E"
                    strokeWidth="1"
                  />
                  <path
                    d={`M ${GRID_X + CONTAINER_W - 204} 26 L ${GRID_X + CONTAINER_W - 198} 32 L ${
                      GRID_X + CONTAINER_W - 186
                    } 20`}
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text
                    x={GRID_X + CONTAINER_W - 178}
                    y="31"
                    fill="#22C55E"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="'JetBrains Mono', monospace"
                    letterSpacing="1"
                  >
                    EGHU 826260-6 · VALIDATED
                  </text>
                </g>
              )}

              {/* Bottom HUD: progress + frame */}
              <g>
                <rect
                  x={GRID_X}
                  y="325"
                  width={CONTAINER_W}
                  height="3"
                  fill="rgba(255,255,255,0.06)"
                  rx="1.5"
                />
                <rect
                  x={GRID_X}
                  y="325"
                  width={CONTAINER_W * clamp(time / (T_P3_END), 0, 1)}
                  height="3"
                  fill="#2563EB"
                  rx="1.5"
                />
              </g>
            </svg>
          </div>

          {/* Detection list */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {MARKERS.map((m) => {
              const rowStart = T_P3_END + m.listDelay
              const since = time >= rowStart ? time - rowStart : -1
              const op = since < 0 ? 0 : clamp(since / 500, 0, 1)
              const tx = since < 0 ? -12 : -12 + 12 * clamp(since / 500, 0, 1)
              return (
                <div
                  key={m.id}
                  style={{
                    opacity: op,
                    transform: `translateX(${tx}px)`,
                    transition: 'opacity 500ms ease, transform 500ms ease',
                  }}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: m.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-mono text-xs font-semibold tracking-wider"
                      style={{ color: m.color }}
                    >
                      {m.id}
                    </div>
                    <div className="text-white/85 text-sm truncate">{m.label}</div>
                  </div>
                  <span className="font-mono text-xs text-white/55 tabular-nums">
                    {m.conf.toFixed(1)}%
                  </span>
                </div>
              )
            })}
          </div>

          {/* Footer stat row */}
          <div className="mt-6 flex items-center justify-between flex-wrap gap-3 pt-5 border-t border-white/5">
            <div className="flex items-center gap-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/50">
              <span>
                <span className="text-white/80">&lt; 30 sec</span> · time per audit
              </span>
              <span className="text-white/20">·</span>
              <span>
                <span className="text-white/80">Digital evidence</span> · record type
              </span>
            </div>
            <span className="font-mono text-[10px] md:text-[11px] text-white/35 uppercase tracking-wider">
              Written to yard system in real time
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
