import React, { useState } from 'react';
import { useAnimationFrame } from 'framer-motion';
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInCubic(t: number) {
  return t * t * t;
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp(t, 0, 1);
}
export function GateScanVisualization() {
  const [time, setTime] = useState(0);
  useAnimationFrame((t) => {
    setTime(t % 8000);
  });
  // ── TRUCK POSITION ──
  const TRUCK_START = 1300,
    TRUCK_CENTER = 220,
    TRUCK_EXIT = -700;
  let truckX: number;
  if (time < 3000) {
    truckX = lerp(TRUCK_START, TRUCK_CENTER, easeOutCubic(time / 3000));
  } else if (time < 7000) {
    truckX = TRUCK_CENTER;
  } else {
    truckX = lerp(TRUCK_CENTER, TRUCK_EXIT, easeInCubic((time - 7000) / 1000));
  }
  // ── REALISTIC ↔ BLUEPRINT CROSS-FADE ──
  // 0-1.5s: realistic=1, blueprint=0
  // 1.5-3s: cross-fade → realistic=0, blueprint=1
  // 3-6.5s: realistic=0, blueprint=1
  // 6.5-7.2s: cross-fade → realistic=1, blueprint=0
  // 7.2-8s: realistic=1, blueprint=0
  let realisticOp: number, blueprintOp: number;
  if (time < 1500) {
    realisticOp = 1;
    blueprintOp = 0;
  } else if (time < 3000) {
    const t = (time - 1500) / 1500;
    realisticOp = 1 - t;
    blueprintOp = t;
  } else if (time < 6500) {
    realisticOp = 0;
    blueprintOp = 1;
  } else if (time < 7200) {
    const t = (time - 6500) / 700;
    realisticOp = t;
    blueprintOp = 1 - t;
  } else {
    realisticOp = 1;
    blueprintOp = 0;
  }
  // ── SCAN LINES ──
  const scanActive = time >= 2800 && time < 4200;
  const scanProgress = scanActive ? clamp((time - 2800) / 1400, 0, 1) : 0;
  // ── CAMERA BEAMS ──
  const beamOpacity =
  time >= 2800 && time < 6800 ?
  clamp(Math.min((time - 2800) / 400, 1, (6800 - time) / 300), 0, 1) :
  0;
  // ── BOUNDING BOX ──
  const boxOpacity =
  time >= 3800 && time < 7200 ?
  clamp(Math.min((time - 3800) / 200, 1, (7200 - time) / 400), 0, 1) :
  0;
  // ── TYPEWRITER ──
  const fullCode = 'EGHU 826260-6';
  let typedCode = '';
  if (time >= 4000 && time < 7200) {
    typedCode = fullCode.slice(
      0,
      Math.ceil(clamp((time - 4000) / 1000, 0, 1) * fullCode.length)
    );
  }
  const showCursor =
  time >= 4000 && time < 5200 && Math.floor(time / 150) % 2 === 0;
  // ── VALIDATION ──
  const valOpacity =
  time >= 5000 && time < 7200 ?
  clamp(Math.min((time - 5000) / 500, 1, (7200 - time) / 400), 0, 1) :
  0;
  // ── HUD ──
  const seconds = Math.floor(time / 1000);
  const ms = Math.floor(time % 1000 / 10);
  const timestamp = `T+${String(seconds).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
  const frameNum = Math.floor(time / 33.33);
  const containerCenterX = (truckX + 170 + truckX + 570) / 2;
  const containerCenterY = (155 + 355) / 2;
  // ── SHARED TRUCK GEOMETRY ──
  const WHEELS = [85, 445, 555];
  return (
    <div className="w-full bg-[#0A0F1A] overflow-hidden">
      <svg
        viewBox="0 0 1200 500"
        className="w-full h-[300px] md:h-[500px]"
        preserveAspectRatio="xMidYMid meet">
        
        <defs>
          <pattern
            id="gs-dotGrid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse">
            
            <circle cx="16" cy="16" r="1" fill="rgba(91,127,255,0.08)" />
          </pattern>
          <linearGradient id="gs-scanFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5B7FFF" stopOpacity="0" />
            <stop offset="85%" stopColor="#5B7FFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#5B7FFF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="gs-cabGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A4555" />
            <stop offset="100%" stopColor="#252D3A" />
          </linearGradient>
          <linearGradient id="gs-containerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A5568" />
            <stop offset="30%" stopColor="#3D4A5C" />
            <stop offset="100%" stopColor="#2D3748" />
          </linearGradient>
          <linearGradient id="gs-windshield" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5B7FFF" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#8AA6FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#5B7FFF" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="1200" height="500" fill="#0A0F1A" />
        <rect width="1200" height="500" fill="url(#gs-dotGrid)" />

        {/* Corner Brackets */}
        <g
          stroke="#5B7FFF"
          strokeWidth="1.5"
          opacity="0.25"
          fill="none"
          strokeLinecap="round">
          
          <polyline points="30,70 30,30 70,30" />
          <polyline points="1170,70 1170,30 1130,30" />
          <polyline points="30,430 30,470 70,470" />
          <polyline points="1170,430 1170,470 1130,470" />
        </g>

        {/* Ground Line */}
        <line
          x1="0"
          y1="400"
          x2="1200"
          y2="400"
          stroke="#FFFFFF"
          strokeWidth="1"
          opacity="0.08" />
        
        {[...Array(24)].map((_, i) =>
        <line
          key={`gd${i}`}
          x1={i * 50 + 25}
          y1="400"
          x2={i * 50 + 40}
          y2="400"
          stroke="#FFFFFF"
          strokeWidth="1"
          opacity="0.04" />

        )}

        {/* ═══ BACK GATE POLE ═══ */}
        <g>
          <rect
            x="498"
            y="60"
            width="12"
            height="340"
            fill="none"
            stroke="#7B9FFF"
            strokeWidth="1.5"
            opacity="0.7" />
          
          <rect
            x="490"
            y="390"
            width="28"
            height="10"
            fill="none"
            stroke="#7B9FFF"
            strokeWidth="1"
            opacity="0.5" />
          
          <line
            x1="510"
            y1="80"
            x2="540"
            y2="80"
            stroke="#7B9FFF"
            strokeWidth="1.5"
            opacity="0.7" />
          
          <ellipse
            cx="555"
            cy="80"
            rx="18"
            ry="9"
            fill="#1A2035"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            opacity="0.9" />
          
          <circle
            cx="562"
            cy="80"
            r="5"
            fill="#1A2035"
            stroke="#FFFFFF"
            strokeWidth="1" />
          
          <circle cx="562" cy="80" r="2.5" fill="#5B7FFF" opacity="0.9" />
          {beamOpacity > 0 &&
          <line
            x1="562"
            y1="85"
            x2={containerCenterX}
            y2={containerCenterY}
            stroke="#5B7FFF"
            strokeWidth="0.8"
            opacity={beamOpacity * 0.3}
            strokeDasharray="6 4" />

          }
        </g>

        {/* Crossbar */}
        <line
          x1="504"
          y1="65"
          x2="704"
          y2="65"
          stroke="#7B9FFF"
          strokeWidth="1"
          opacity="0.3"
          strokeDasharray="8 6" />
        

        {/* ═══ TRUCK GROUP ═══ */}
        <g transform={`translate(${truckX}, 0)`}>
          {/* ━━━ REALISTIC TRUCK LAYER ━━━ */}
          <g opacity={realisticOp}>
            {/* Container body */}
            <rect
              x="170"
              y="155"
              width="400"
              height="205"
              fill="url(#gs-containerGrad)"
              stroke="#4A5568"
              strokeWidth="1" />
            
            {/* Container corrugation (subtle) */}
            {[...Array(12)].map((_, i) =>
            <line
              key={`rc${i}`}
              x1="170"
              y1={168 + i * 15}
              x2="570"
              y2={168 + i * 15}
              stroke="#FFFFFF"
              strokeWidth="0.3"
              opacity="0.06" />

            )}
            {/* Container door lines */}
            <line
              x1="560"
              y1="155"
              x2="560"
              y2="360"
              stroke="#2D3748"
              strokeWidth="2" />
            
            <line
              x1="550"
              y1="155"
              x2="550"
              y2="360"
              stroke="#2D3748"
              strokeWidth="1.5" />
            
            {/* Door handles */}
            <line
              x1="555"
              y1="230"
              x2="555"
              y2="280"
              stroke="#64748B"
              strokeWidth="2.5"
              strokeLinecap="round" />
            
            <line
              x1="565"
              y1="230"
              x2="565"
              y2="280"
              stroke="#64748B"
              strokeWidth="2.5"
              strokeLinecap="round" />
            
            {/* Container code stencil */}
            <text
              x="185"
              y="340"
              fill="#FFFFFF"
              fontSize="14"
              opacity="0.15"
              style={{
                fontFamily: "'JetBrains Mono', monospace"
              }}
              fontWeight="700"
              letterSpacing="2">
              
              EGHU 826260-6
            </text>
            <text
              x="185"
              y="175"
              fill="#FFFFFF"
              fontSize="9"
              opacity="0.1"
              style={{
                fontFamily: "'JetBrains Mono', monospace"
              }}>
              
              45G1 · 40ft HC · TARE 3,800kg
            </text>

            {/* Flatbed */}
            <rect
              x="165"
              y="360"
              width="410"
              height="8"
              fill="#1E2530"
              stroke="#2A3040"
              strokeWidth="1" />
            
            <line
              x1="160"
              y1="380"
              x2="580"
              y2="380"
              stroke="#2A3040"
              strokeWidth="3" />
            
            {[0, 1, 2, 3, 4].map((i) =>
            <line
              key={`rcm${i}`}
              x1={185 + i * 90}
              y1="368"
              x2={185 + i * 90}
              y2="380"
              stroke="#2A3040"
              strokeWidth="2" />

            )}

            {/* Cab */}
            <path
              d="M 30 395 L 30 260 L 65 260 L 100 185 L 160 185 L 160 395 Z"
              fill="url(#gs-cabGrad)"
              stroke="#3A4555"
              strokeWidth="1" />
            
            {/* Windshield */}
            <path
              d="M 68 258 L 102 192 L 152 192 L 152 258 Z"
              fill="url(#gs-windshield)"
              stroke="#5B7FFF"
              strokeWidth="0.5"
              opacity="0.6" />
            
            {/* Bumper */}
            <rect
              x="18"
              y="370"
              width="20"
              height="25"
              rx="2"
              fill="#1A2030"
              stroke="#2A3040"
              strokeWidth="1" />
            
            {/* Headlight */}
            <rect
              x="22"
              y="340"
              width="8"
              height="12"
              rx="1"
              fill="#FCD34D"
              opacity="0.6" />
            
            <rect
              x="22"
              y="340"
              width="8"
              height="12"
              rx="1"
              fill="none"
              stroke="#FCD34D"
              strokeWidth="0.5"
              opacity="0.3" />
            
            {/* Exhaust */}
            <line
              x1="155"
              y1="185"
              x2="155"
              y2="155"
              stroke="#4A5568"
              strokeWidth="3"
              strokeLinecap="round" />
            
            {/* Mirror */}
            <line
              x1="30"
              y1="240"
              x2="15"
              y2="235"
              stroke="#4A5568"
              strokeWidth="1.5" />
            
            <rect
              x="8"
              y="230"
              width="10"
              height="8"
              rx="1"
              fill="#2A3040"
              stroke="#4A5568"
              strokeWidth="1" />
            

            {/* Wheel wells */}
            <path
              d="M 35 395 Q 35 345 85 345 Q 135 345 135 395"
              fill="#151B25"
              stroke="#1E2530"
              strokeWidth="1" />
            
            <path
              d="M 395 395 Q 395 345 445 345 Q 495 345 495 395"
              fill="#151B25"
              stroke="#1E2530"
              strokeWidth="1" />
            
            <path
              d="M 505 395 Q 505 345 555 345 Q 605 345 605 395"
              fill="#151B25"
              stroke="#1E2530"
              strokeWidth="1" />
            

            {/* Wheels — realistic */}
            {WHEELS.map((cx, i) =>
            <g key={`rw${i}`}>
                <circle
                cx={cx}
                cy="395"
                r="22"
                fill="#0F1318"
                stroke="#2A3040"
                strokeWidth="2" />
              
                <circle
                cx={cx}
                cy="395"
                r="16"
                fill="#1A1F28"
                stroke="#2A3040"
                strokeWidth="1" />
              
                <circle cx={cx} cy="395" r="7" fill="#2A3040" />
                <circle cx={cx} cy="395" r="3" fill="#4A5568" />
              </g>
            )}
          </g>

          {/* ━━━ BLUEPRINT TRUCK LAYER ━━━ */}
          <g opacity={blueprintOp}>
            <g stroke="#5B7FFF" strokeWidth="1.5" fill="none">
              <path d="M 30 395 L 30 260 L 65 260 L 100 185 L 160 185 L 160 395" />
              <path
                d="M 68 258 L 102 192 L 152 192 L 152 258 Z"
                strokeWidth="1"
                opacity="0.4" />
              
              <rect
                x="18"
                y="370"
                width="20"
                height="25"
                rx="2"
                opacity="0.6" />
              
              <rect x="22" y="340" width="8" height="12" rx="1" opacity="0.5" />
              <line
                x1="155"
                y1="185"
                x2="155"
                y2="155"
                strokeWidth="2"
                opacity="0.5" />
              
              <line x1="30" y1="240" x2="15" y2="235" opacity="0.4" />
              <rect x="8" y="230" width="10" height="8" rx="1" opacity="0.4" />
              <line x1="160" y1="380" x2="580" y2="380" strokeWidth="2" />
              <rect x="165" y="360" width="410" height="8" opacity="0.6" />
              {[0, 1, 2, 3, 4].map((i) =>
              <line
                key={`bcm${i}`}
                x1={185 + i * 90}
                y1="368"
                x2={185 + i * 90}
                y2="380"
                opacity="0.3" />

              )}
              <rect
                x="170"
                y="155"
                width="400"
                height="205"
                strokeWidth="1.5" />
              
              {[...Array(12)].map((_, i) =>
              <line
                key={`bc${i}`}
                x1="170"
                y1={168 + i * 15}
                x2="570"
                y2={168 + i * 15}
                strokeWidth="0.4"
                opacity="0.2" />

              )}
              <line x1="560" y1="155" x2="560" y2="360" opacity="0.4" />
              <line x1="550" y1="155" x2="550" y2="360" opacity="0.4" />
              <line
                x1="555"
                y1="230"
                x2="555"
                y2="280"
                strokeWidth="2"
                opacity="0.3" />
              
              <line
                x1="565"
                y1="230"
                x2="565"
                y2="280"
                strokeWidth="2"
                opacity="0.3" />
              
              <text
                x="185"
                y="175"
                fill="#5B7FFF"
                fontSize="10"
                opacity="0.2"
                style={{
                  fontFamily: "'JetBrains Mono', monospace"
                }}
                stroke="none">
                
                EGHU 826260-6 · 45G1 · 40ft HC
              </text>
              <path
                d="M 35 395 Q 35 345 85 345 Q 135 345 135 395"
                opacity="0.4" />
              
              <path
                d="M 395 395 Q 395 345 445 345 Q 495 345 495 395"
                opacity="0.4" />
              
              <path
                d="M 505 395 Q 505 345 555 345 Q 605 345 605 395"
                opacity="0.4" />
              
            </g>
            {/* Blueprint wheels */}
            {WHEELS.map((cx, i) =>
            <g key={`bw${i}`}>
                <circle
                cx={cx}
                cy="395"
                r="22"
                fill="#0A0F1A"
                stroke="#5B7FFF"
                strokeWidth="1.5" />
              
                <circle
                cx={cx}
                cy="395"
                r="14"
                fill="none"
                stroke="#5B7FFF"
                strokeWidth="0.5"
                opacity="0.3" />
              
                <circle cx={cx} cy="395" r="6" fill="#5B7FFF" opacity="0.3" />
                {[0, 60, 120, 180, 240, 300].map((angle) =>
              <line
                key={`bt${i}-${angle}`}
                x1={cx + Math.cos(angle * Math.PI / 180) * 15}
                y1={395 + Math.sin(angle * Math.PI / 180) * 15}
                x2={cx + Math.cos(angle * Math.PI / 180) * 21}
                y2={395 + Math.sin(angle * Math.PI / 180) * 21}
                stroke="#5B7FFF"
                strokeWidth="0.5"
                opacity="0.2" />

              )}
              </g>
            )}
          </g>

          {/* ── SCAN LINES (blueprint mode only) ── */}
          {scanActive &&
          <g opacity={blueprintOp}>
              <rect
              x="170"
              y="155"
              width="400"
              height={Math.max(0, 200 * scanProgress)}
              fill="url(#gs-scanFill)" />
            
              <line
              x1="165"
              y1={lerp(155, 355, scanProgress)}
              x2="575"
              y2={lerp(155, 355, scanProgress)}
              stroke="#5B7FFF"
              strokeWidth="2"
              opacity={0.8} />
            
              <line
              x1="165"
              y1={lerp(155, 355, scanProgress)}
              x2="575"
              y2={lerp(155, 355, scanProgress)}
              stroke="#FFFFFF"
              strokeWidth="1"
              opacity={0.4} />
            
              {scanProgress > 0.15 &&
            <line
              x1="165"
              y1={lerp(155, 355, scanProgress - 0.15)}
              x2="575"
              y2={lerp(155, 355, scanProgress - 0.15)}
              stroke="#5B7FFF"
              strokeWidth="1"
              opacity={0.3} />

            }
            </g>
          }

          {/* ── BOUNDING BOX ── */}
          <g opacity={boxOpacity}>
            <rect
              x="200"
              y="185"
              width="250"
              height="70"
              fill="rgba(255,127,110,0.06)"
              stroke="#FF7F6E"
              strokeWidth="1"
              strokeDasharray="6 4" />
            
            <g
              stroke="#FF7F6E"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round">
              
              <polyline points="200,200 200,185 215,185" />
              <polyline points="450,200 450,185 435,185" />
              <polyline points="200,240 200,255 215,255" />
              <polyline points="450,240 450,255 435,255" />
            </g>
            <text
              x="215"
              y="230"
              fill="#FFFFFF"
              fontSize="26"
              fontWeight="700"
              letterSpacing="3"
              style={{
                fontFamily: "'JetBrains Mono', monospace"
              }}>
              
              {typedCode}
              {showCursor ? '▌' : ''}
            </text>
          </g>

          {/* ── VALIDATION ── */}
          <g opacity={valOpacity}>
            <polyline
              points="200,255 185,255 185,300 200,300"
              fill="none"
              stroke="#5B7FFF"
              strokeWidth="1"
              opacity="0.4"
              strokeDasharray="3 3" />
            
            <text
              x="205"
              y="282"
              fill="#64748B"
              fontSize="13"
              style={{
                fontFamily: "'JetBrains Mono', monospace"
              }}>
              
              ISO: 45G1 | CONF: 0.997
            </text>
            <g transform="translate(205, 292)">
              <rect
                width="120"
                height="26"
                rx="3"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1" />
              
              <path
                d="M 12 13 L 16 17 L 24 9"
                fill="none"
                stroke="#22C55E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round" />
              
              <text
                x="32"
                y="17"
                fill="#22C55E"
                fontSize="12"
                fontWeight="700"
                letterSpacing="1"
                style={{
                  fontFamily: "'JetBrains Mono', monospace"
                }}>
                
                VALIDATED
              </text>
            </g>
          </g>
        </g>

        {/* ═══ FRONT GATE POLE ═══ */}
        <g>
          <rect
            x="698"
            y="60"
            width="12"
            height="340"
            fill="none"
            stroke="#7B9FFF"
            strokeWidth="1.5"
            opacity="0.7" />
          
          <rect
            x="690"
            y="390"
            width="28"
            height="10"
            fill="none"
            stroke="#7B9FFF"
            strokeWidth="1"
            opacity="0.5" />
          
          <line
            x1="698"
            y1="80"
            x2="668"
            y2="80"
            stroke="#7B9FFF"
            strokeWidth="1.5"
            opacity="0.7" />
          
          <ellipse
            cx="653"
            cy="80"
            rx="18"
            ry="9"
            fill="#1A2035"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            opacity="0.9" />
          
          <circle
            cx="646"
            cy="80"
            r="5"
            fill="#1A2035"
            stroke="#FFFFFF"
            strokeWidth="1" />
          
          <circle cx="646" cy="80" r="2.5" fill="#5B7FFF" opacity="0.9" />
          {beamOpacity > 0 &&
          <line
            x1="646"
            y1="85"
            x2={containerCenterX}
            y2={containerCenterY}
            stroke="#5B7FFF"
            strokeWidth="0.8"
            opacity={beamOpacity * 0.3}
            strokeDasharray="6 4" />

          }
          {beamOpacity > 0 &&
          <g>
              <circle
              cx="704"
              cy="120"
              r="3"
              fill="#5B7FFF"
              opacity={beamOpacity * 0.8} />
            
              <circle
              cx="704"
              cy="140"
              r="3"
              fill="#5B7FFF"
              opacity={beamOpacity * 0.6} />
            
              <circle
              cx="704"
              cy="160"
              r="3"
              fill="#5B7FFF"
              opacity={beamOpacity * 0.4} />
            
            </g>
          }
        </g>

        {/* ═══ HUD ═══ */}
        <text
          x="50"
          y="488"
          fill="#5B7FFF"
          fontSize="11"
          opacity="0.4"
          style={{
            fontFamily: "'JetBrains Mono', monospace"
          }}>
          
          {timestamp} · FRM {String(frameNum).padStart(4, '0')}
        </text>
        <text
          x="1150"
          y="48"
          fill="#5B7FFF"
          fontSize="11"
          opacity="0.3"
          textAnchor="end"
          style={{
            fontFamily: "'JetBrains Mono', monospace"
          }}>
          
          GATE-01 · CAM-A/B
        </text>

        {/* Mode indicator */}
        <text
          x="600"
          y="488"
          fill={blueprintOp > 0.5 ? '#5B7FFF' : '#64748B'}
          fontSize="10"
          opacity="0.4"
          textAnchor="middle"
          style={{
            fontFamily: "'JetBrains Mono', monospace"
          }}>
          
          {blueprintOp > 0.5 ? '◆ SCAN MODE' : '◇ TRACKING'}
        </text>

        {/* SYSTEM ACTIVE */}
        <g transform="translate(1150, 478)">
          <circle cx="0" cy="-4" r="4" fill="#22C55E" opacity="0.3">
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="2s"
              repeatCount="indefinite" />
            
          </circle>
          <circle cx="0" cy="-4" r="4" fill="#22C55E" opacity="0.9" />
          <circle cx="0" cy="-4" r="2" fill="#FFFFFF" opacity="0.6" />
          <text
            x="-12"
            y="0"
            fill="#22C55E"
            fontSize="11"
            fontWeight="700"
            textAnchor="end"
            letterSpacing="1.5"
            style={{
              fontFamily: "'JetBrains Mono', monospace"
            }}>
            
            SYSTEM ACTIVE
          </text>
        </g>
      </svg>
    </div>);

}