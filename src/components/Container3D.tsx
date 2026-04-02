'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useMotionValueEvent } from 'framer-motion';
// Container dimensions
const W = 440;
const H = 180;
const D = 180;
const T = 7; // panel thickness
// Corrugation textures
const corrugationSide = `repeating-linear-gradient(
  0deg,
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
export function Container3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const touchStartY = useRef(0);
  const progressRef = useRef(0);
  const progress = useMotionValue(0);
  const TOTAL_DELTA = 800;

  // Detect when section top reaches viewport top — engage scroll lock
  useEffect(() => {
    if (isLocked) return;
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      // Forward: section top has reached viewport top
      if (!animationDone && rect.top <= 0 && rect.bottom > 0) {
        window.scrollTo(0, section.offsetTop);
        setIsLocked(true);
      }
      // Reverse: scrolling back up into a completed section
      if (animationDone && rect.top >= -10 && rect.top <= 10) {
        window.scrollTo(0, section.offsetTop);
        progressRef.current = 1;
        progress.set(1);
        setAnimationDone(false);
        setIsLocked(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLocked, animationDone, progress]);

  // Lock body scroll with overflow hidden (no position:fixed — avoids scroll reset issues)
  useEffect(() => {
    if (isLocked) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isLocked]);

  // Wheel handler (desktop)
  useEffect(() => {
    if (!isLocked) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY / TOTAL_DELTA;
      const next = Math.max(0, Math.min(1, progressRef.current + delta));
      progressRef.current = next;
      progress.set(next);
      if (next >= 1) {
        const section = sectionRef.current;
        if (section) {
          setAnimationDone(true);
          setIsLocked(false);
          window.scrollTo(0, section.offsetTop + section.offsetHeight);
        }
      }
      if (next <= 0 && e.deltaY < 0) {
        setAnimationDone(false);
        setIsLocked(false);
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isLocked, progress]);

  // Touch handlers — attach to section element directly for iOS Safari compatibility
  useEffect(() => {
    const section = sectionRef.current;
    if (!isLocked || !section) return;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchDelta = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;
      const delta = touchDelta / TOTAL_DELTA;
      const next = Math.max(0, Math.min(1, progressRef.current + delta));
      progressRef.current = next;
      progress.set(next);
      if (next >= 1) {
        setAnimationDone(true);
        setIsLocked(false);
        window.scrollTo(0, section.offsetTop + section.offsetHeight);
      }
      if (next <= 0 && touchDelta < 0) {
        setAnimationDone(false);
        setIsLocked(false);
      }
    };
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLocked, progress]);
  // ==========================================
  // NARRATIVE TIMELINE MAPPINGS
  // ==========================================
  // ACT 1: 0.0 - 0.35 (Rotation)
  const rotY = useTransform(progress, [0, 0.35], [-15, 35]);
  // ACT 2: 0.35 - 0.70 (Explosion & Interior)
  const exp = useTransform(progress, [0.35, 0.5], [0, 1]);
  const scanColor = useTransform(progress, [0.35, 0.45], ['#5B7FFF', '#FBBF24']);
  const scanShadow = useTransform(
    progress,
    [0.35, 0.45],
    ['0 0 20px 2px rgba(91,127,255,0.5)', '0 0 20px 2px rgba(251,191,36,0.5)']
  );
  const blueprintOp = useTransform(progress, [0.35, 0.45], [0, 1]);
  // ACT 3: 0.70 - 1.0 (Dashboard)
  const contScale = useTransform(progress, [0.7, 0.85], [1, 0.6]);
  const contY = useTransform(progress, [0.7, 0.85], [0, -200]);
  const contOp = useTransform(progress, [0.7, 0.85], [1, 0.4]);
  const dashY = useTransform(progress, [0.7, 0.85], [800, 0]);
  const dashOp = useTransform(progress, [0.7, 0.85], [0, 1]);
  // Damage Cards Flyaway (Transition 2 -> 3)
  const cardX = useTransform(progress, [0.65, 0.75], [0, 200]);
  const cardY = useTransform(progress, [0.65, 0.75], [0, 300]);
  const cardScale = useTransform(progress, [0.65, 0.75], [1, 0.3]);
  const cardOp = useTransform(progress, [0.45, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  // Labels & Headers Opacity
  const headerOp = useTransform(progress, [0, 0.05], [1, 0]);
  const act1Op = useTransform(progress, [0.02, 0.05, 0.3, 0.35], [0, 1, 1, 0]);
  const act2Op = useTransform(progress, [0.35, 0.4, 0.65, 0.7], [0, 1, 1, 0]);
  const act3Op = useTransform(progress, [0.7, 0.75, 0.95, 1], [0, 1, 1, 1]);
  // ==========================================
  // ACT 3: DASHBOARD ANIMATIONS
  // ==========================================
  const [dashActive, setDashActive] = useState(false);
  const [dashTime, setDashTime] = useState(0);
  const dashStartRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useMotionValueEvent(progress, 'change', (v) => {
    if (v >= 0.85 && !dashActive) {
      setDashActive(true);
      dashStartRef.current = null;
    }
    if (v < 0.7) {
      setDashActive(false);
      setDashTime(0);
      dashStartRef.current = null;
    }
  });

  const animateDash = useCallback((timestamp: number) => {
    if (dashStartRef.current === null) dashStartRef.current = timestamp;
    const elapsed = timestamp - dashStartRef.current;
    setDashTime(elapsed);
    if (elapsed < 5000) {
      rafRef.current = requestAnimationFrame(animateDash);
    }
  }, []);

  useEffect(() => {
    if (dashActive) {
      rafRef.current = requestAnimationFrame(animateDash);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [dashActive, animateDash]);

  // Counter values (count up over 1.2s)
  const counterProgress = Math.min(dashTime / 1200, 1);
  const eased = 1 - Math.pow(1 - counterProgress, 3); // easeOutCubic
  const scannedCount = Math.round(eased * 847);
  const issuesCount = Math.round(eased * 23);
  const scanTimeCount = (eased * 1.8).toFixed(1);

  // Terminal report lines (appear one by one, 300ms apart, starting at 400ms)
  const reportLines = [
    { text: '┌── CONTAINER INSPECTION REPORT ──┐', className: 'text-white font-bold mb-4' },
    { text: 'ID: EGHU 826260-6', className: 'text-[#5B7FFF] mb-4' },
    { text: 'External: ✓ Code Validated', className: 'mb-2', hasGreen: true },
    { text: 'Internal: 3 issues found', className: 'mb-2', hasYellow: true },
    { text: '  • Floor Damage — CRITICAL (92)', className: 'pl-4 mb-1 text-red-400' },
    { text: '  • Wall Puncture — HIGH (79)', className: 'pl-4 mb-1 text-orange-400' },
    { text: '  • Corrosion — MODERATE (63)', className: 'pl-4 mb-4 text-yellow-400' },
    { text: 'Overall: ✗ FAIL', className: 'mb-1', hasFail: true },
    { text: 'Standard: CEDEX / IICL', className: 'mb-6' },
  ];
  const REPORT_START = 400;
  const REPORT_LINE_DELAY = 250;

  // Recent scans slide in (stagger 200ms, starting at 2200ms)
  const SCANS_START = 2200;
  const SCAN_STAGGER = 200;

  // Bounding Boxes Act 1
  const frontBoxOp = useTransform(
    progress,
    [0.05, 0.1, 0.3, 0.35],
    [0, 1, 1, 0]
  );
  const sideBoxOp = useTransform(progress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
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
    <section ref={sectionRef} className="relative h-screen bg-[#0A0F1A]" style={{ touchAction: isLocked ? 'none' : 'auto' }}>
      <div className="h-full w-full overflow-hidden flex flex-col items-center justify-center relative">
        {/* Background Dot Grid */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none z-0"
          style={{
            backgroundImage:
            'radial-gradient(rgba(91,127,255,0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }} />
        

        {/* Viewfinder Corners */}
        <div className="absolute inset-6 pointer-events-none z-0 opacity-30">
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#5B7FFF]" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#5B7FFF]" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#5B7FFF]" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#5B7FFF]" />
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
          
          <p className="text-[#5B7FFF] font-semibold text-xs uppercase tracking-[0.25em] mb-3 font-sans">
            Industrial Precision Architecture
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight font-sans">
            See What's Inside
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-lg mx-auto leading-relaxed font-sans">
            A complete AI vision system in a single edge deployment.
          </p>
        </motion.div>

        {/* Act Labels (Bottom Center) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 font-sans font-bold text-base tracking-wide text-center">
          <motion.div
            style={{
              opacity: act1Op
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[#5B7FFF]">
            
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
            perspective: '1600px',
            scale: contScale,
            y: contY,
            opacity: contOp
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
                    <div className="w-3 h-3 rounded-full bg-[#5B7FFF] shadow-[0_0_10px_#5B7FFF] animate-pulse" />
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
                    stroke="#5B7FFF"
                    strokeWidth="1"
                    strokeDasharray="2 2" />
                  
                </svg>
                <div className="absolute top-[calc(100%+60px)] left-1/2 -translate-x-1/2 bg-[#0A0F1A]/90 border border-[#5B7FFF]/30 px-3 py-1.5 rounded text-[#5B7FFF] font-mono text-sm whitespace-nowrap">
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
                <div className="w-40 h-14 rounded bg-gradient-to-b from-gray-700 to-gray-900 border border-gray-600 shadow-2xl flex items-center justify-between px-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22C55E]" />
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22C55E] animate-pulse" />
                  </div>
                  <div className="text-[11px] font-bold text-gray-400 tracking-wider">
                    NVIDIA JETSON
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
                  {/* Door details */}
                  <div className="absolute right-7 top-[10%] bottom-[10%] flex flex-col justify-between">
                    <div className="w-[3px] h-14 rounded-full bg-white/10" />
                    <div className="w-[3px] h-14 rounded-full bg-white/10" />
                  </div>
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
                    background: 'rgba(91,127,255,0.02)',
                    backgroundImage: `linear-gradient(rgba(91,127,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(91,127,255,0.07) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                    border: '1px solid rgba(91,127,255,0.12)'
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
                  
                  {/* Floor Damage */}
                  <div className="absolute bottom-4 left-20">
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
                  </div>

                  {/* Wall Puncture */}
                  <div className="absolute top-1/2 left-4 -translate-y-1/2">
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
                  </div>

                  {/* Ceiling Corrosion */}
                  <div className="absolute top-4 right-24">
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
                  </div>
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

        {/* ========================================== */}
        {/* DASHBOARD (ACT 3) */}
        {/* ========================================== */}
        <motion.div
          className="absolute bottom-24 w-full max-w-4xl px-6 z-40"
          style={{
            y: dashY,
            opacity: dashOp
          }}>
          
          <div className="bg-[#1E293B] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col">
            {/* Top Stats — Counting Up */}
            <div className="grid grid-cols-3 border-b border-white/5 bg-white/5">
              <div className="p-4 border-r border-white/5 text-center">
                <div className="text-gray-400 text-[10px] uppercase tracking-wider font-sans mb-1">
                  Containers Scanned
                </div>
                <div className="text-white font-mono text-2xl font-bold">
                  {dashActive ? scannedCount.toLocaleString() : '0'}
                </div>
              </div>
              <div className="p-4 border-r border-white/5 text-center">
                <div className="text-gray-400 text-[10px] uppercase tracking-wider font-sans mb-1">
                  Issues Detected
                </div>
                <div className="text-[#FBBF24] font-mono text-2xl font-bold">
                  {dashActive ? issuesCount : '0'}
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="text-gray-400 text-[10px] uppercase tracking-wider font-sans mb-1">
                  Avg Scan Time
                </div>
                <div className="text-[#22C55E] font-mono text-2xl font-bold">
                  {dashActive ? `${scanTimeCount}s` : '0.0s'}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Terminal Report — Typewriter */}
              <div className="flex-1 p-6 border-r border-white/5 font-mono text-xs leading-relaxed text-gray-300">
                {reportLines.map((line, i) => {
                  const lineStart = REPORT_START + i * REPORT_LINE_DELAY;
                  const lineEnd = lineStart + 400;
                  const visible = dashActive && dashTime >= lineStart;
                  const typing = dashActive && dashTime >= lineStart && dashTime < lineEnd;
                  const charProgress = !visible ? 0 : Math.min((dashTime - lineStart) / 400, 1);
                  const displayText = line.text.slice(0, Math.ceil(charProgress * line.text.length));

                  if (!visible) return null;

                  let content: React.ReactNode = displayText;
                  if (line.hasGreen && charProgress >= 1) {
                    content = <>External: <span className="text-[#22C55E]">✓ Code Validated</span></>;
                  } else if (line.hasYellow && charProgress >= 1) {
                    content = <>Internal: <span className="text-[#FBBF24]">3 issues found</span></>;
                  } else if (line.hasFail && charProgress >= 1) {
                    content = <>Overall: <span className="text-red-500 font-bold">✗ FAIL</span></>;
                  }

                  return (
                    <div key={i} className={line.className}>
                      {content}
                      {typing && <span className="animate-pulse">▌</span>}
                    </div>
                  );
                })}

                {dashActive && dashTime >= REPORT_START + reportLines.length * REPORT_LINE_DELAY + 200 && (
                  <div className="flex gap-4 text-[10px]">
                    <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors">
                      [View Full Report]
                    </button>
                    <button className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1.5 rounded transition-colors">
                      [Flag for Review]
                    </button>
                  </div>
                )}
              </div>

              {/* Mini Table — Slide In */}
              <div className="w-full md:w-72 p-6 bg-black/20 font-mono text-[10px]">
                <div className="text-gray-500 mb-4 uppercase tracking-wider">
                  Recent Scans
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { code: 'EGHU 826260-6', status: 'FAIL', statusColor: 'text-red-400', issues: '3 issues', dotColor: 'bg-red-500', borderColor: 'border-red-500/20' },
                    { code: 'TRHU 534444-0', status: 'PASS', statusColor: 'text-green-400', issues: '0 issues', dotColor: 'bg-green-500', borderColor: 'border-green-500/20' },
                    { code: 'MCDU 307712-9', status: 'REVIEW', statusColor: 'text-yellow-400', issues: '1 issue', dotColor: 'bg-yellow-500', borderColor: 'border-yellow-500/20' },
                  ].map((scan, i) => {
                    const scanStart = SCANS_START + i * SCAN_STAGGER;
                    const visible = dashActive && dashTime >= scanStart;
                    const slideProgress = !visible ? 0 : Math.min((dashTime - scanStart) / 300, 1);
                    const slideEased = 1 - Math.pow(1 - slideProgress, 3);

                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-between bg-white/5 p-2 rounded border ${scan.borderColor}`}
                        style={{
                          opacity: slideEased,
                          transform: `translateY(${(1 - slideEased) * 20}px)`,
                        }}
                      >
                        <span className="text-white">{scan.code}</span>
                        <span className={scan.statusColor}>{scan.status}</span>
                        <span className="text-gray-400">{scan.issues}</span>
                        <div className={`w-2 h-2 rounded-full ${scan.dotColor}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}