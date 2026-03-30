'use client'

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
export function DroneScanVisualization() {
  const [time, setTime] = useState(0);
  useAnimationFrame((t) => {
    setTime(t % 8000);
  });
  // ── DRONE POSITION ──
  const DRONE_START_X = 1300,
    DRONE_CENTER_X = 600,
    DRONE_EXIT_X = -100;
  const DRONE_START_Y = 50,
    DRONE_CENTER_Y = 120;
  let droneX: number;
  let droneY: number;
  if (time < 1500) {
    const t = time / 1500;
    droneX = lerp(DRONE_START_X, DRONE_CENTER_X, easeOutCubic(t));
    droneY = lerp(DRONE_START_Y, DRONE_CENTER_Y, easeOutCubic(t));
  } else if (time < 6500) {
    droneX = DRONE_CENTER_X;
    // Hover bobbing effect
    droneY = DRONE_CENTER_Y + Math.sin((time - 1500) / 300) * 4;
  } else if (time < 8000) {
    const t = (time - 6500) / 1500;
    droneX = lerp(DRONE_CENTER_X, DRONE_EXIT_X, easeInCubic(t));
    droneY = lerp(DRONE_CENTER_Y, DRONE_START_Y, easeInCubic(t));
  } else {
    droneX = DRONE_START_X;
    droneY = DRONE_START_Y;
  }
  // Rotor animation (fast spinning)
  const rotorAngle = time * 2 % 360;
  // ── REALISTIC ↔ BLUEPRINT CROSS-FADE (Target Container) ──
  let realisticOp: number, blueprintOp: number;
  if (time < 2500) {
    realisticOp = 1;
    blueprintOp = 0;
  } else if (time < 3500) {
    const t = (time - 2500) / 1000;
    realisticOp = 1 - t;
    blueprintOp = t;
  } else if (time < 6500) {
    realisticOp = 0;
    blueprintOp = 1;
  } else if (time < 7500) {
    const t = (time - 6500) / 1000;
    realisticOp = t;
    blueprintOp = 1 - t;
  } else {
    realisticOp = 1;
    blueprintOp = 0;
  }
  // ── SCAN BEAM ──
  const beamOpacity =
  time >= 1500 && time < 6800 ?
  clamp(Math.min((time - 1500) / 500, 1, (6800 - time) / 300), 0, 1) :
  0;
  const scanActive = time >= 2500 && time < 4500;
  const scanProgress = scanActive ?
  clamp((time - 2500) / 2000, 0, 1) :
  time >= 4500 && time < 6500 ?
  1 :
  0;
  // ── BOUNDING BOX ──
  const boxOpacity =
  time >= 4500 && time < 7500 ?
  clamp(Math.min((time - 4500) / 300, 1, (7500 - time) / 500), 0, 1) :
  0;
  // ── TYPEWRITER ──
  const fullCode = 'MSCU 447291-3';
  let typedCode = '';
  if (time >= 4500 && time < 7500) {
    typedCode = fullCode.slice(
      0,
      Math.ceil(clamp((time - 4500) / 1000, 0, 1) * fullCode.length)
    );
  }
  const showCursor =
  time >= 4500 && time < 6000 && Math.floor(time / 150) % 2 === 0;
  // ── VALIDATION ──
  const valOpacity =
  time >= 5500 && time < 7500 ?
  clamp(Math.min((time - 5500) / 500, 1, (7500 - time) / 500), 0, 1) :
  0;
  // ── HUD ──
  const seconds = Math.floor(time / 1000);
  const ms = Math.floor(time % 1000 / 10);
  const timestamp = `T+${String(seconds).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
  const frameNum = Math.floor(time / 33.33);
  // ── CONTAINER POSITIONS ──
  const C_WIDTH = 320;
  const C_HEIGHT = 160;
  const C_Y = 240; // 400 (ground) - 160
  const containers = [
  {
    id: 1,
    x: 100,
    code: 'TGHU 715392-1',
    type: '45G1',
    tare: '3,800kg'
  },
  {
    id: 2,
    x: 440,
    code: 'MSCU 447291-3',
    type: '45G1',
    tare: '3,750kg',
    isTarget: true
  },
  {
    id: 3,
    x: 780,
    code: 'CMAU 582910-4',
    type: '45G1',
    tare: '3,900kg'
  }];

  // Shared container render function
  const renderContainer = (
  c: (typeof containers)[0],
  isBlueprint: boolean,
  opacity: number) =>
  {
    if (opacity <= 0) return null;
    if (!isBlueprint) {
      return (
        <g opacity={opacity} transform={`translate(${c.x}, ${C_Y})`}>
          {/* Container body */}
          <rect
            x="0"
            y="0"
            width={C_WIDTH}
            height={C_HEIGHT}
            fill="url(#ds-containerGrad)"
            stroke="#4A5568"
            strokeWidth="1" />
          
          {/* Corrugation */}
          {[...Array(10)].map((_, i) =>
          <line
            key={`rc${i}`}
            x1="0"
            y1={12 + i * 15}
            x2={C_WIDTH}
            y2={12 + i * 15}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            opacity="0.06" />

          )}
          {/* Door lines */}
          <line
            x1={C_WIDTH - 10}
            y1="0"
            x2={C_WIDTH - 10}
            y2={C_HEIGHT}
            stroke="#2D3748"
            strokeWidth="2" />
          
          <line
            x1={C_WIDTH - 20}
            y1="0"
            x2={C_WIDTH - 20}
            y2={C_HEIGHT}
            stroke="#2D3748"
            strokeWidth="1.5" />
          
          {/* Door handles */}
          <line
            x1={C_WIDTH - 15}
            y1={C_HEIGHT / 2 - 20}
            x2={C_WIDTH - 15}
            y2={C_HEIGHT / 2 + 20}
            stroke="#64748B"
            strokeWidth="2.5"
            strokeLinecap="round" />
          
          <line
            x1={C_WIDTH - 5}
            y1={C_HEIGHT / 2 - 20}
            x2={C_WIDTH - 5}
            y2={C_HEIGHT / 2 + 20}
            stroke="#64748B"
            strokeWidth="2.5"
            strokeLinecap="round" />
          
          {/* Stencil */}
          <text
            x="15"
            y={C_HEIGHT - 20}
            fill="#FFFFFF"
            fontSize="14"
            opacity="0.15"
            style={{
              fontFamily: "'JetBrains Mono', monospace"
            }}
            fontWeight="700"
            letterSpacing="2">
            
            {c.code}
          </text>
          <text
            x="15"
            y="20"
            fill="#FFFFFF"
            fontSize="9"
            opacity="0.1"
            style={{
              fontFamily: "'JetBrains Mono', monospace"
            }}>
            
            {c.type} · 40ft HC · TARE {c.tare}
          </text>
        </g>);

    } else {
      return (
        <g opacity={opacity} transform={`translate(${c.x}, ${C_Y})`}>
          <g stroke="#5B7FFF" strokeWidth="1.5" fill="none">
            <rect
              x="0"
              y="0"
              width={C_WIDTH}
              height={C_HEIGHT}
              strokeWidth="1.5" />
            
            {[...Array(10)].map((_, i) =>
            <line
              key={`bc${i}`}
              x1="0"
              y1={12 + i * 15}
              x2={C_WIDTH}
              y2={12 + i * 15}
              strokeWidth="0.4"
              opacity="0.2" />

            )}
            <line
              x1={C_WIDTH - 10}
              y1="0"
              x2={C_WIDTH - 10}
              y2={C_HEIGHT}
              opacity="0.4" />
            
            <line
              x1={C_WIDTH - 20}
              y1="0"
              x2={C_WIDTH - 20}
              y2={C_HEIGHT}
              opacity="0.4" />
            
            <line
              x1={C_WIDTH - 15}
              y1={C_HEIGHT / 2 - 20}
              x2={C_WIDTH - 15}
              y2={C_HEIGHT / 2 + 20}
              strokeWidth="2"
              opacity="0.3" />
            
            <line
              x1={C_WIDTH - 5}
              y1={C_HEIGHT / 2 - 20}
              x2={C_WIDTH - 5}
              y2={C_HEIGHT / 2 + 20}
              strokeWidth="2"
              opacity="0.3" />
            
            <text
              x="15"
              y="20"
              fill="#5B7FFF"
              fontSize="10"
              opacity="0.2"
              style={{
                fontFamily: "'JetBrains Mono', monospace"
              }}
              stroke="none">
              
              {c.code} · {c.type} · 40ft HC
            </text>
          </g>
        </g>);

    }
  };
  return (
    <div className="w-full bg-[#0A0F1A] overflow-hidden border-t border-white/5">
      <svg
        viewBox="0 0 1200 500"
        className="w-full h-[300px] md:h-[500px]"
        preserveAspectRatio="xMidYMid meet">
        
        <defs>
          <pattern
            id="ds-dotGrid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse">
            
            <circle cx="16" cy="16" r="1" fill="rgba(91,127,255,0.08)" />
          </pattern>
          <linearGradient id="ds-scanFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5B7FFF" stopOpacity="0" />
            <stop offset="85%" stopColor="#5B7FFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#5B7FFF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="ds-containerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A5568" />
            <stop offset="30%" stopColor="#3D4A5C" />
            <stop offset="100%" stopColor="#2D3748" />
          </linearGradient>
          <linearGradient id="ds-beamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5B7FFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#5B7FFF" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="1200" height="500" fill="#0A0F1A" />
        <rect width="1200" height="500" fill="url(#ds-dotGrid)" />

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

        {/* ═══ CONTAINERS ═══ */}
        {containers.map((c) =>
        <g key={`container-${c.id}`}>
            {c.isTarget ?
          <>
                {renderContainer(c, false, realisticOp)}
                {renderContainer(c, true, blueprintOp)}

                {/* Scan Lines on Target Container */}
                {scanActive &&
            <g opacity={blueprintOp}>
                    <rect
                x={c.x}
                y={C_Y}
                width={C_WIDTH}
                height={Math.max(0, C_HEIGHT * scanProgress)}
                fill="url(#ds-scanFill)" />
              
                    <line
                x1={c.x - 5}
                y1={lerp(C_Y, C_Y + C_HEIGHT, scanProgress)}
                x2={c.x + C_WIDTH + 5}
                y2={lerp(C_Y, C_Y + C_HEIGHT, scanProgress)}
                stroke="#5B7FFF"
                strokeWidth="2"
                opacity={0.8} />
              
                    <line
                x1={c.x - 5}
                y1={lerp(C_Y, C_Y + C_HEIGHT, scanProgress)}
                x2={c.x + C_WIDTH + 5}
                y2={lerp(C_Y, C_Y + C_HEIGHT, scanProgress)}
                stroke="#FFFFFF"
                strokeWidth="1"
                opacity={0.4} />
              
                    {scanProgress > 0.1 &&
              <line
                x1={c.x - 5}
                y1={lerp(C_Y, C_Y + C_HEIGHT, scanProgress - 0.1)}
                x2={c.x + C_WIDTH + 5}
                y2={lerp(C_Y, C_Y + C_HEIGHT, scanProgress - 0.1)}
                stroke="#5B7FFF"
                strokeWidth="1"
                opacity={0.3} />

              }
                  </g>
            }
              </> :

          renderContainer(c, false, 1)
          }
          </g>
        )}

        {/* ── BOUNDING BOX (Target Container) ── */}
        <g opacity={boxOpacity}>
          <rect
            x={470}
            y={260}
            width={260}
            height={70}
            fill="rgba(255,127,110,0.06)"
            stroke="#FF7F6E"
            strokeWidth="1"
            strokeDasharray="6 4" />
          
          <g stroke="#FF7F6E" strokeWidth="2" fill="none" strokeLinecap="round">
            <polyline points="470,275 470,260 485,260" />
            <polyline points="730,275 730,260 715,260" />
            <polyline points="470,315 470,330 485,330" />
            <polyline points="730,315 730,330 715,330" />
          </g>
          <text
            x={485}
            y={305}
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

        {/* ── VALIDATION BADGE ── */}
        <g opacity={valOpacity}>
          <polyline
            points="470,330 455,330 455,370 470,370"
            fill="none"
            stroke="#5B7FFF"
            strokeWidth="1"
            opacity="0.4"
            strokeDasharray="3 3" />
          
          <text
            x={475}
            y={352}
            fill="#64748B"
            fontSize="13"
            style={{
              fontFamily: "'JetBrains Mono', monospace"
            }}>
            
            ISO: 45G1 | CONF: 0.998
          </text>
          <g transform="translate(475, 362)">
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

        {/* ═══ DRONE & SCAN CONE ═══ */}
        <g transform={`translate(${droneX}, ${droneY})`}>
          {/* Scan Cone */}
          {beamOpacity > 0 &&
          <g opacity={beamOpacity}>
              <polygon
              points={`0,15 -180,${C_Y - droneY} 180,${C_Y - droneY}`}
              fill="url(#ds-beamGrad)" />
            
              <line
              x1="0"
              y1="15"
              x2="-180"
              y2={C_Y - droneY}
              stroke="#5B7FFF"
              strokeWidth="1"
              opacity="0.4"
              strokeDasharray="4 4" />
            
              <line
              x1="0"
              y1="15"
              x2="180"
              y2={C_Y - droneY}
              stroke="#5B7FFF"
              strokeWidth="1"
              opacity="0.4"
              strokeDasharray="4 4" />
            
              {/* Center targeting laser */}
              <line
              x1="0"
              y1="15"
              x2="0"
              y2={C_Y - droneY + C_HEIGHT}
              stroke="#FF7F6E"
              strokeWidth="1"
              opacity="0.5"
              strokeDasharray="8 4" />
            
              <circle
              cx="0"
              cy={C_Y - droneY + scanProgress * C_HEIGHT}
              r="3"
              fill="#FF7F6E"
              opacity={scanActive ? 0.8 : 0} />
            
            </g>
          }

          {/* Drone Body */}
          <g>
            {/* Main Chassis */}
            <rect
              x="-25"
              y="-8"
              width="50"
              height="16"
              rx="4"
              fill="#1E2530"
              stroke="#4A5568"
              strokeWidth="1.5" />
            
            <rect x="-15" y="-12" width="30" height="4" rx="2" fill="#2D3748" />

            {/* Arms */}
            <line
              x1="-25"
              y1="0"
              x2="-55"
              y2="0"
              stroke="#4A5568"
              strokeWidth="3"
              strokeLinecap="round" />
            
            <line
              x1="25"
              y1="0"
              x2="55"
              y2="0"
              stroke="#4A5568"
              strokeWidth="3"
              strokeLinecap="round" />
            

            {/* Motors */}
            <rect
              x="-60"
              y="-6"
              width="10"
              height="12"
              rx="2"
              fill="#2D3748"
              stroke="#1A2035"
              strokeWidth="1" />
            
            <rect
              x="50"
              y="-6"
              width="10"
              height="12"
              rx="2"
              fill="#2D3748"
              stroke="#1A2035"
              strokeWidth="1" />
            

            {/* Rotors (Animated) */}
            <g transform="translate(-55, -8)">
              <ellipse
                cx="0"
                cy="0"
                rx="25"
                ry="2"
                fill="#5B7FFF"
                opacity="0.3" />
              
              <line
                x1="-25"
                y1="0"
                x2="25"
                y2="0"
                stroke="#FFFFFF"
                strokeWidth="1"
                opacity="0.6"
                transform={`rotate(${rotorAngle})`} />
              
            </g>
            <g transform="translate(55, -8)">
              <ellipse
                cx="0"
                cy="0"
                rx="25"
                ry="2"
                fill="#5B7FFF"
                opacity="0.3" />
              
              <line
                x1="-25"
                y1="0"
                x2="25"
                y2="0"
                stroke="#FFFFFF"
                strokeWidth="1"
                opacity="0.6"
                transform={`rotate(${-rotorAngle})`} />
              
            </g>

            {/* Camera Payload */}
            <path
              d="M -10 8 L 10 8 L 6 16 L -6 16 Z"
              fill="#151B25"
              stroke="#4A5568"
              strokeWidth="1" />
            
            <circle
              cx="0"
              cy="16"
              r="4"
              fill="#0A0F1A"
              stroke="#5B7FFF"
              strokeWidth="1" />
            
            <circle cx="0" cy="16" r="1.5" fill="#5B7FFF" opacity="0.8">
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur="1s"
                repeatCount="indefinite" />
              
            </circle>

            {/* Status LEDs */}
            <circle cx="-15" cy="-4" r="1.5" fill="#22C55E" opacity="0.8" />
            <circle cx="15" cy="-4" r="1.5" fill="#22C55E" opacity="0.8" />
          </g>
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
          
          DRONE-X1 · AERIAL-CAM
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
          
          {blueprintOp > 0.5 ? '◆ AERIAL SCAN MODE' : '◇ PATROL'}
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