'use client'

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// Container dimensions
const W = 440;
const H = 180;
const D = 180;
const T = 7; // panel thickness
// Corrugation textures
// 90deg → vertical ridges (real ISO containers corrugate top-to-bottom on the walls)
const corrugationSide = `repeating-linear-gradient(
  90deg,
  rgba(255,255,255,0.09) 0px,
  rgba(255,255,255,0.04) 1px,
  rgba(200,210,230,0.03) 2px,
  transparent 2px,
  transparent 3px,
  rgba(0,0,0,0.22) 3px,
  rgba(0,0,0,0.12) 4px,
  rgba(0,0,0,0.04) 5px,
  transparent 5px,
  transparent 8px
)`;
const corrugationTop = `repeating-linear-gradient(
  90deg,
  rgba(255,255,255,0.05) 0px,
  transparent 1px,
  transparent 5px,
  rgba(0,0,0,0.12) 5px,
  transparent 6px,
  transparent 11px
)`;
function panelFace(bg: string, corrugation: string, extraShadow?: string) {
  return {
    background: bg,
    backgroundImage: corrugation,
    borderRadius: '1px',
    boxShadow: `inset 0 0 0 1.5px rgba(255,255,255,0.07)${extraShadow ? `, ${extraShadow}` : ''}`
  };
}
function thicknessEdge(
w: number,
h: number,
pos: 'top' | 'bottom' | 'left' | 'right',
bg: string)
: React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    width: pos === 'left' || pos === 'right' ? T : w,
    height: pos === 'top' || pos === 'bottom' ? T : h,
    background: bg
  };
  if (pos === 'bottom') {
    return {
      ...base,
      bottom: 0,
      left: 0,
      transformOrigin: 'bottom center',
      transform: 'rotateX(-90deg)'
    };
  }
  if (pos === 'top') {
    return {
      ...base,
      top: 0,
      left: 0,
      transformOrigin: 'top center',
      transform: 'rotateX(90deg)'
    };
  }
  if (pos === 'left') {
    return {
      ...base,
      top: 0,
      left: 0,
      transformOrigin: 'left center',
      transform: 'rotateY(-90deg)'
    };
  }
  return {
    ...base,
    top: 0,
    right: 0,
    transformOrigin: 'right center',
    transform: 'rotateY(90deg)'
  };
}

// ── Front (door) face hardware ───────────────────────────────────────────────
// Twin-door shipping-container front: centre seam, 4 vertical locking rods
// (2 per door) with mid handles + cam keepers, and hinge plates on the outer
// edges. Decorative only (pointer-events-none) so AI overlays stay interactive.
// Matte industrial metal (no specular). Hinge plates ~13% darker than the body
// shade for contrast — no new hue introduced (per spec). Perf: box-shadow only
// on the handles; none on rods/keepers/hinges; no filters.
const ROD_METAL = 'linear-gradient(90deg,#888,#ccc,#888)';
const HINGE_DARK = '#243348'; // ~13% darker than FRONT_BG #2A3D58
const ROD_LEFTS = [12, 38, 62, 88]; // % from face left — 2 rods per door panel

function LockingRod({ leftPct }: { leftPct: number }) {
  return (
    <div className="absolute" style={{ left: `${leftPct}%`, top: '7%', bottom: '7%', width: 4, transform: 'translateX(-50%)' }}>
      {/* rod shaft — matte metal, no specular, no shadow */}
      <div className="absolute inset-0 rounded-full" style={{ background: ROD_METAL }} />
      {/* cam keeper — top */}
      <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 rounded-[1px]" style={{ width: 6, height: 6, background: ROD_METAL }} />
      {/* cam keeper — bottom */}
      <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 rounded-[1px]" style={{ width: 6, height: 6, background: ROD_METAL }} />
      {/* mid-rod handle (~55% height) — the only element with a shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[1px]"
        style={{ top: '55%', width: 8, height: 12, background: ROD_METAL, boxShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
      />
    </div>
  );
}

function HingePlate({ side, vPos }: { side: 'left' | 'right'; vPos: 'top' | 'bottom' }) {
  return (
    <div
      className="absolute rounded-[1px]"
      style={{
        [side]: '1.5%',
        [vPos]: '12%',
        width: 6,
        height: 18,
        background: HINGE_DARK,
      } as React.CSSProperties}
    />
  );
}

function ContainerDoorFace() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* centre seam splitting the face into two equal door panels */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
        style={{ width: 2, background: 'rgba(0,0,0,0.45)', boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.04)' }}
      />
      {/* faint door-panel inset borders */}
      <div className="absolute inset-y-[3%] left-[2%] right-[51%] rounded-[1px]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }} />
      <div className="absolute inset-y-[3%] left-[51%] right-[2%] rounded-[1px]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }} />
      {ROD_LEFTS.map((l) => (
        <LockingRod key={l} leftPct={l} />
      ))}
      <HingePlate side="left" vPos="top" />
      <HingePlate side="left" vPos="bottom" />
      <HingePlate side="right" vPos="top" />
      <HingePlate side="right" vPos="bottom" />
    </div>
  );
}

export function Container3D() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-position-driven (no scroll hijacking). The <section> is a tall scroll
  // track; the visual is sticky-pinned inside it and scrubs 0→1 as the user
  // scrolls through the track. Normal page scrolling always works in every
  // input mode (wheel, trackpad, keyboard) — the user is never trapped and can
  // always scroll straight past the section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progress = scrollYProgress;

  // ==========================================
  // NARRATIVE TIMELINE MAPPINGS
  // ==========================================
  // ACT 1: 0.0 - 0.35 (Rotation)
  const rotY = useTransform(progress, [0, 0.35], [-15, 35]);
  // ACT 2: 0.35 - 0.70 (Explosion & Interior)
  const exp = useTransform(progress, [0.35, 0.5], [0, 1]);
  const scanColor = useTransform(progress, [0.35, 0.45], ['#2563EB', '#FBBF24']);
  const scanShadow = useTransform(
    progress,
    [0.35, 0.45],
    ['0 0 20px 2px rgba(37,99,235,0.5)', '0 0 20px 2px rgba(251,191,36,0.5)']
  );
  const blueprintOp = useTransform(progress, [0.35, 0.45], [0, 1]);
  // Damage Cards Flyaway (Transition 2 -> 3)
  const cardX = useTransform(progress, [0.65, 0.75], [0, 200]);
  const cardY = useTransform(progress, [0.65, 0.75], [0, 300]);
  const cardScale = useTransform(progress, [0.65, 0.75], [1, 0.3]);
  const cardOp = useTransform(progress, [0.45, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  // Act 2: sequential damage-label reveal — one zone at a time so the callouts
  // never pile up unreadably (the interior box is too short to stack three).
  // Windows are nested inside the parent cardOp stable band (0.5→0.65, before
  // the 0.65 flyaway) and staggered so at most a brief 2-label crossfade occurs.
  const floorLabelOp = useTransform(progress, [0.500, 0.515, 0.555, 0.570], [0, 1, 1, 0]);
  const wallLabelOp = useTransform(progress, [0.560, 0.575, 0.610, 0.625], [0, 1, 1, 0]);
  const ceilLabelOp = useTransform(progress, [0.615, 0.630, 0.660, 0.670], [0, 1, 1, 0]);
  // Labels & Headers Opacity
  const headerOp = useTransform(progress, [0, 0.06, 0.12], [1, 1, 0]);
  const act1Op = useTransform(progress, [0.02, 0.05, 0.3, 0.35], [0, 1, 1, 0]);
  const act2Op = useTransform(progress, [0.35, 0.4, 0.65, 0.7], [0, 1, 1, 0]);
  const act3Op = useTransform(progress, [0.7, 0.75, 0.95, 1], [0, 1, 1, 1]);
  // Bounding Boxes Act 1
  const frontBoxOp = useTransform(
    progress,
    [0.05, 0.1, 0.3, 0.35],
    [0, 1, 1, 0]
  );
  const sideBoxOp = useTransform(progress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);

  // ── Scroll-driven grid scan (Act 1 pre-roll) ──
  // Cyan scanning square sweeps the front panel before the code detection box lands.
  const scanOp = useTransform(progress, [0.0, 0.03, 0.16, 0.2], [0, 1, 1, 0]);
  // Cell index 0..19 on a 5 × 4 grid (cols × rows), left-to-right then top-to-bottom.
  const scanIdx = useTransform(progress, [0.0, 0.18], [0, 19.999]);
  const scanLeftPct = useTransform(scanIdx, (v: number) => {
    const i = Math.max(0, Math.min(19, Math.floor(v)));
    return `${(i % 5) * 20}%`;
  });
  const scanTopPct = useTransform(scanIdx, (v: number) => {
    const i = Math.max(0, Math.min(19, Math.floor(v)));
    return `${Math.floor(i / 5) * 25}%`;
  });
  // Extra damage bounding boxes (appear after the scan sweep + before Act 1 fades)
  const damageBox1Op = useTransform(progress, [0.16, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const damageBox2Op = useTransform(progress, [0.2, 0.24, 0.3, 0.35], [0, 1, 1, 0]);
  // ==========================================
  // 3D TRANSFORMS
  // ==========================================
  const frontTx = useTransform(
    exp,
    (e) => `translate(-50%,-50%) translateZ(${D / 2 + e * 150}px)`
  );
  const backTx = useTransform(
    exp,
    (e) =>
    `translate(-50%,-50%) translateZ(${-(D / 2) - e * 150}px) rotateY(180deg)`
  );
  const leftTx = useTransform(
    exp,
    (e) =>
    `translate(-50%,-50%) translateX(${-(W / 2) - e * 130}px) rotateY(-90deg)`
  );
  const rightTx = useTransform(
    exp,
    (e) =>
    `translate(-50%,-50%) translateX(${W / 2 + e * 130}px) rotateY(90deg)`
  );
  const topTx = useTransform(
    exp,
    (e) =>
    `translate(-50%,-50%) translateY(${-(H / 2) - e * 110}px) rotateX(90deg)`
  );
  const bottomTx = useTransform(
    exp,
    (e) =>
    `translate(-50%,-50%) translateY(${H / 2 + e * 80}px) rotateX(-90deg)`
  );
  const FRONT_BG = '#2A3D58';
  const SIDE_BG = '#233347';
  const TOP_BG = '#304A68';
  const EDGE_DARK = '#182636';
  const EDGE_MID = '#1E2D42';
  const EDGE_LIGHT = '#263E58';
  return (
    <section ref={sectionRef} className="relative h-[240vh] bg-[#0A0F1A]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Background Dot Grid */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none z-0"
          style={{
            backgroundImage:
            'radial-gradient(rgba(37,99,235,0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }} />
        

        {/* Viewfinder Corners */}
        <div className="absolute inset-6 pointer-events-none z-0 opacity-30">
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#2563EB]" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#2563EB]" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#2563EB]" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#2563EB]" />
        </div>

        {/* System Active Indicator */}
        <div className="absolute bottom-8 right-8 flex items-center gap-2 text-[#22C55E] font-mono text-xs font-bold tracking-widest z-50">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
          </div>
          SYSTEM ACTIVE
        </div>

        {/* Header (Fades out) */}
        <motion.div
          className="absolute top-16 md:top-24 left-0 w-full text-center z-50 px-6"
          style={{
            opacity: headerOp
          }}>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#2563EB] font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-5">
            After · GateIn AI
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight font-sans">
            Automated scan. Bounded detections. Digital record.
          </h2>
          <div className="text-base md:text-lg text-gray-400 mx-auto leading-relaxed font-sans space-y-3">
            <p>
              A complete AI vision system in a single edge deployment. Cameras quickly sweep inside
              and out of the containers.
            </p>
            <p>
              The model returns damage classes, bounding boxes, and confidence scores.
            </p>
            <p>
              Written to the yard system in real time.
            </p>
          </div>
        </motion.div>

        {/* Act Labels (Bottom Center) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 font-sans font-bold text-base tracking-wide text-center">
          <motion.div
            style={{
              opacity: act1Op
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[#2563EB]">
            
            Phase 1: External Code Detection
          </motion.div>
          <motion.div
            style={{
              opacity: act2Op
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[#FBBF24]">
            
            Phase 2: Interior Damage Inspection
          </motion.div>
          <motion.div
            style={{
              opacity: act3Op
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[#22C55E]">
            
            Phase 3: AI Analysis & Reporting
          </motion.div>
        </div>

        {/* ========================================== */}
        {/* 3D SCENE */}
        {/* ========================================== */}
        <motion.div
          className="relative z-10 w-full h-full flex items-center justify-center"
          style={{
            perspective: '1600px'
          }}>
          
          {/* Responsive scale wrapper */}
          <div className="scale-[0.65] sm:scale-[0.85] md:scale-100 lg:scale-[1.8] xl:scale-[2] transition-transform">
            {/* ====== FLOATING: AI Vision Camera (Act 1) ====== */}
            <motion.div
              className="absolute z-20"
              style={{
                top: 'calc(50% - 150px)',
                left: 'calc(50% - 280px)',
                opacity: act1Op
              }}>
              
              <div className="relative">
                <div className="w-[80px] h-[40px] rounded-full bg-gradient-to-br from-white to-gray-400 shadow-xl flex items-center justify-end pr-3">
                  <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center border border-gray-700">
                    <div className="w-3 h-3 rounded-full bg-[#2563EB] shadow-[0_0_10px_#2563EB] animate-pulse" />
                  </div>
                </div>
                <svg
                  className="absolute top-full left-1/2 -ml-px"
                  width="2"
                  height="60">
                  
                  <line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="60"
                    stroke="#2563EB"
                    strokeWidth="1"
                    strokeDasharray="2 2" />
                  
                </svg>
                <div className="absolute top-[calc(100%+60px)] left-1/2 -translate-x-1/2 bg-[#0A0F1A]/90 border border-[#2563EB]/30 px-3 py-1.5 rounded text-[#2563EB] font-mono text-sm whitespace-nowrap">
                  AI Vision Camera
                </div>
              </div>
            </motion.div>

            {/* ====== FLOATING: Edge Processor (Act 2) ====== */}
            <motion.div
              className="absolute z-20"
              style={{
                bottom: 'calc(50% - 200px)',
                left: '50%',
                x: '-50%',
                opacity: act2Op
              }}>
              
              <div className="relative">
                <div className="w-56 h-14 rounded bg-gradient-to-b from-gray-700 to-gray-900 border border-gray-600 shadow-2xl flex items-center gap-3 px-4">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22C55E]" />
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22C55E] animate-pulse" />
                  </div>
                  <div className="text-[11px] font-bold text-gray-400 tracking-wide whitespace-nowrap">
                    EDGE PROCESSING UNIT
                  </div>
                </div>
                <svg
                  className="absolute bottom-full left-1/2 -ml-px"
                  width="2"
                  height="40">
                  
                  <line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="40"
                    stroke="#FBBF24"
                    strokeWidth="1"
                    strokeDasharray="2 2" />
                  
                </svg>
                <div className="absolute bottom-[calc(100%+40px)] left-1/2 -translate-x-1/2 bg-[#0A0F1A]/90 border border-[#FBBF24]/30 px-3 py-1.5 rounded text-[#FBBF24] font-mono text-sm whitespace-nowrap">
                  Processing: 3 damage zones
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative preserve-3d"
              style={{
                width: W,
                height: H,
                rotateX: 15,
                rotateY: rotY
              }}>
              
              {/* ====== FRONT PANEL ====== */}
              <motion.div
                className="absolute preserve-3d"
                style={{
                  width: W,
                  height: H,
                  left: '50%',
                  top: '50%',
                  transform: frontTx
                }}>
                
                <div
                  className="absolute inset-0 backface-hidden"
                  style={panelFace(
                    FRONT_BG,
                    corrugationSide,
                    '0 4px 30px rgba(0,0,0,0.5)'
                  )}>

                  {/* Twin-door front face hardware (beneath AI overlays) */}
                  <ContainerDoorFace />

                  {/* Grid scan overlay (pre-Act 1: cyan sweeper) */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: scanOp }}
                  >
                    {/* Faint grid overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(6,182,212,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.18) 1px, transparent 1px)',
                        backgroundSize: '20% 25%',
                      }}
                    />
                    {/* Cyan scanning cell */}
                    <motion.div
                      className="absolute"
                      style={{
                        left: scanLeftPct,
                        top: scanTopPct,
                        width: '20%',
                        height: '25%',
                        border: '2px solid #06B6D4',
                        background: 'rgba(6,182,212,0.22)',
                        boxShadow: '0 0 12px rgba(6,182,212,0.6)',
                      }}
                    />
                  </motion.div>

                  {/* Act 1: Front Bounding Box & Code */}
                  <motion.div
                    style={{
                      opacity: frontBoxOp
                    }}
                    className="absolute top-4 right-4">

                    <div className="absolute -inset-3 border-2 border-[#FF7F6E] bg-[#FF7F6E]/10" />
                    <div className="relative text-white font-mono text-sm font-bold tracking-wider bg-[#0A0F1A]/90 p-2.5 border border-[#FF7F6E]/30 whitespace-nowrap translate-x-[110%]">
                      EGHU 826260-6
                      <div className="text-[#22C55E] text-xs mt-1">
                        ✓ VALIDATED
                      </div>
                    </div>
                  </motion.div>

                  {/* Damage bounding box: amber (rust) on upper-left quadrant */}
                  <motion.div
                    className="absolute pointer-events-none"
                    style={{
                      opacity: damageBox1Op,
                      left: '8%',
                      top: '18%',
                      width: '22%',
                      height: '30%',
                      border: '2px dashed #F59E0B',
                      background: 'rgba(245,158,11,0.12)',
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-[#0A0F1A]/90 border border-[#F59E0B]/40 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#F59E0B] whitespace-nowrap">
                      RST-11 · 96.1%
                    </div>
                  </motion.div>

                  {/* Damage bounding box: blue (hole) on lower-middle */}
                  <motion.div
                    className="absolute pointer-events-none"
                    style={{
                      opacity: damageBox2Op,
                      left: '40%',
                      top: '55%',
                      width: '18%',
                      height: '26%',
                      border: '2px dashed #2563EB',
                      background: 'rgba(37,99,235,0.12)',
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-[#0A0F1A]/90 border border-[#2563EB]/40 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#2563EB] whitespace-nowrap">
                      HBL-02 · 94.8%
                    </div>
                  </motion.div>

                </div>
                <div
                  className="absolute backface-hidden"
                  style={thicknessEdge(
                    W,
                    H,
                    'bottom',
                    `linear-gradient(180deg, ${EDGE_MID}, ${EDGE_DARK})`
                  )} />
                
                <div
                  className="absolute backface-hidden"
                  style={thicknessEdge(W, H, 'top', EDGE_LIGHT)} />
                
                <div
                  className="absolute backface-hidden"
                  style={thicknessEdge(
                    W,
                    H,
                    'right',
                    `linear-gradient(90deg, ${EDGE_MID}, ${EDGE_DARK})`
                  )} />
                
                <div
                  className="absolute backface-hidden"
                  style={thicknessEdge(W, H, 'left', EDGE_MID)} />
                
              </motion.div>

              {/* ====== BACK PANEL ====== */}
              <motion.div
                className="absolute preserve-3d"
                style={{
                  width: W,
                  height: H,
                  left: '50%',
                  top: '50%',
                  transform: backTx
                }}>
                
                <div
                  className="absolute inset-0 backface-hidden"
                  style={panelFace(
                    FRONT_BG,
                    corrugationSide,
                    '0 4px 30px rgba(0,0,0,0.5)'
                  )} />
                
                <div
                  className="absolute backface-hidden"
                  style={thicknessEdge(W, H, 'bottom', EDGE_DARK)} />
                
                <div
                  className="absolute backface-hidden"
                  style={thicknessEdge(W, H, 'top', EDGE_LIGHT)} />
                
              </motion.div>

              {/* ====== LEFT PANEL ====== */}
              <motion.div
                className="absolute preserve-3d"
                style={{
                  width: D,
                  height: H,
                  left: '50%',
                  top: '50%',
                  transform: leftTx
                }}>
                
                <div
                  className="absolute inset-0 backface-hidden"
                  style={panelFace(
                    SIDE_BG,
                    corrugationSide,
                    '0 4px 30px rgba(0,0,0,0.6)'
                  )}>
                  
                  {/* Act 1: Side Bounding Box & Code */}
                  <motion.div
                    style={{
                      opacity: sideBoxOp
                    }}
                    className="absolute bottom-4 left-4">
                    
                    <div className="absolute -inset-2 border border-[#FF7F6E] bg-[#FF7F6E]/10" />
                    <div className="relative text-white font-mono text-sm font-bold tracking-wider bg-[#0A0F1A]/90 p-2 border border-[#FF7F6E]/30 whitespace-nowrap -translate-x-[110%]">
                      ISO 45G1 | 40ft HC
                    </div>
                  </motion.div>
                </div>
                <div
                  className="absolute backface-hidden"
                  style={thicknessEdge(D, H, 'bottom', EDGE_DARK)} />
                
                <div
                  className="absolute backface-hidden"
                  style={thicknessEdge(D, H, 'top', EDGE_LIGHT)} />
                
              </motion.div>

              {/* ====== RIGHT PANEL ====== */}
              <motion.div
                className="absolute preserve-3d"
                style={{
                  width: D,
                  height: H,
                  left: '50%',
                  top: '50%',
                  transform: rightTx
                }}>
                
                <div
                  className="absolute inset-0 backface-hidden"
                  style={panelFace(
                    SIDE_BG,
                    corrugationSide,
                    '0 4px 30px rgba(0,0,0,0.6)'
                  )} />
                
                <div
                  className="absolute backface-hidden"
                  style={thicknessEdge(D, H, 'bottom', EDGE_DARK)} />
                
                <div
                  className="absolute backface-hidden"
                  style={thicknessEdge(D, H, 'top', EDGE_LIGHT)} />
                
              </motion.div>

              {/* ====== TOP PANEL ====== */}
              <motion.div
                className="absolute preserve-3d"
                style={{
                  width: W,
                  height: D,
                  left: '50%',
                  top: '50%',
                  transform: topTx
                }}>
                
                <div
                  className="absolute inset-0 backface-hidden"
                  style={panelFace(TOP_BG, corrugationTop)} />
                
                <div
                  className="absolute backface-hidden"
                  style={thicknessEdge(W, D, 'bottom', EDGE_LIGHT)} />
                
              </motion.div>

              {/* ====== BOTTOM PANEL ====== */}
              <motion.div
                className="absolute preserve-3d"
                style={{
                  width: W,
                  height: D,
                  left: '50%',
                  top: '50%',
                  transform: bottomTx
                }}>
                
                <div className="absolute inset-0 backface-hidden bg-[#182636] rounded-[1px] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.03)]">
                  <div className="absolute inset-x-6 top-[25%] h-px bg-white/4" />
                  <div className="absolute inset-x-6 top-[50%] h-px bg-white/4" />
                  <div className="absolute inset-x-6 top-[75%] h-px bg-white/4" />
                </div>
              </motion.div>

              {/* ====== INTERIOR (Revealed in Act 2) ====== */}
              <motion.div
                className="absolute preserve-3d"
                style={{
                  width: W - 14,
                  height: H - 14,
                  left: 7,
                  top: 7,
                  opacity: blueprintOp
                }}>
                
                {/* Blueprint Grid */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'rgba(37,99,235,0.02)',
                    backgroundImage: `linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                    border: '1px solid rgba(37,99,235,0.12)'
                  }} />
                

                {/* Act 2: Damage Zones (Fly away in Act 3) */}
                <motion.div
                  style={{
                    x: cardX,
                    y: cardY,
                    scale: cardScale,
                    opacity: cardOp
                  }}
                  className="absolute inset-0 preserve-3d">
                  
                  {/* Floor Damage — revealed first */}
                  <motion.div className="absolute bottom-4 left-20" style={{ opacity: floorLabelOp }}>
                    <div className="absolute -inset-1 border border-[#FBBF24] bg-[#FBBF24]/10" />
                    <svg
                      className="absolute bottom-full left-1/2 -translate-x-1/2"
                      width="2"
                      height="30">
                      
                      <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="30"
                        stroke="#FBBF24"
                        strokeWidth="1"
                        strokeDasharray="2 2" />
                      
                    </svg>
                    <div className="absolute bottom-[calc(100%+30px)] left-1/2 -translate-x-1/2 bg-[#0A0F1A]/95 border border-[#FBBF24]/30 p-3 rounded shadow-lg whitespace-nowrap">
                      <div className="text-[#FBBF24] font-mono text-xs font-bold mb-1">
                        FLOOR DAMAGE (ROT/BREAK)
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-red-500/20 text-red-400 text-[11px] px-1.5 py-0.5 rounded font-bold">
                          CRITICAL
                        </span>
                        <span className="text-gray-400 text-[11px] font-mono">
                          SCORE: 92
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Wall Puncture — revealed second */}
                  <motion.div className="absolute top-1/2 left-4 -translate-y-1/2" style={{ opacity: wallLabelOp }}>
                    <div className="absolute -inset-1 border border-[#FBBF24] bg-[#FBBF24]/10" />
                    <svg
                      className="absolute left-full top-1/2 -translate-y-1/2"
                      width="30"
                      height="2">
                      
                      <line
                        x1="0"
                        y1="1"
                        x2="30"
                        y2="1"
                        stroke="#FBBF24"
                        strokeWidth="1"
                        strokeDasharray="2 2" />
                      
                    </svg>
                    <div className="absolute left-[calc(100%+30px)] top-1/2 -translate-y-1/2 bg-[#0A0F1A]/95 border border-[#FBBF24]/30 p-3 rounded shadow-lg whitespace-nowrap">
                      <div className="text-[#FBBF24] font-mono text-xs font-bold mb-1">
                        WALL PUNCTURE
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-orange-500/20 text-orange-400 text-[11px] px-1.5 py-0.5 rounded font-bold">
                          HIGH
                        </span>
                        <span className="text-gray-400 text-[11px] font-mono">
                          SCORE: 79
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Ceiling Corrosion — revealed third */}
                  <motion.div className="absolute top-4 right-24" style={{ opacity: ceilLabelOp }}>
                    <div className="absolute -inset-1 border border-[#FBBF24] bg-[#FBBF24]/10" />
                    <svg
                      className="absolute top-full left-1/2 -translate-x-1/2"
                      width="2"
                      height="40">
                      
                      <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="40"
                        stroke="#FBBF24"
                        strokeWidth="1"
                        strokeDasharray="2 2" />
                      
                    </svg>
                    <div className="absolute top-[calc(100%+40px)] left-1/2 -translate-x-1/2 bg-[#0A0F1A]/95 border border-[#FBBF24]/30 p-3 rounded shadow-lg whitespace-nowrap">
                      <div className="text-[#FBBF24] font-mono text-xs font-bold mb-1">
                        CORROSION / RUST
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-yellow-500/20 text-yellow-400 text-[11px] px-1.5 py-0.5 rounded font-bold">
                          MODERATE
                        </span>
                        <span className="text-gray-400 text-[11px] font-mono">
                          SCORE: 63
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* ====== SWEEPING SCAN LINES ====== */}
              <motion.div
                className="absolute inset-0 pointer-events-none preserve-3d"
                style={{
                  opacity: useTransform(
                    progress,
                    [0, 0.05, 0.65, 0.7],
                    [0, 1, 1, 0]
                  )
                }}>
                
                <motion.div
                  className="absolute w-full h-[2px]"
                  style={{
                    backgroundColor: scanColor,
                    boxShadow: scanShadow
                  }}
                  animate={{
                    top: ['-10%', '110%']
                  }}
                  transition={{
                    duration: 2.5,
                    ease: 'linear',
                    repeat: Infinity
                  }} />
                
                <motion.div
                  className="absolute w-full h-[1px] opacity-50"
                  style={{
                    backgroundColor: scanColor
                  }}
                  animate={{
                    top: ['-20%', '100%']
                  }}
                  transition={{
                    duration: 2.5,
                    ease: 'linear',
                    repeat: Infinity,
                    delay: 0.5
                  }} />
                
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>);

}