import React, { useState, useEffect, useRef, useCallback } from 'react';
import { colors, fonts } from '../../content/brand';

const Container3D = () => {
  const containerRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [floatY, setFloatY] = useState(0);
  const timeRef = useRef(0);
  const animRef = useRef(null);

  // Float animation
  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.025;
      setFloatY(Math.sin(timeRef.current) * 8);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = ((e.clientX - cx) / (rect.width / 2)) * 10; // ±10 degrees
    const y = ((e.clientY - cy) / (rect.height / 2)) * -8; // ±8 degrees
    setMouseOffset({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  const size = { w: 220, h: 140, d: 90 };

  const faceBase = {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  };

  // Corrugation lines for front face
  const corrugationLines = Array.from({ length: 12 }, (_, i) => (
    <div
      key={i}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: `${(i + 1) * (100 / 13)}%`,
        height: '1px',
        background: 'rgba(255,255,255,0.08)',
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center"
      style={{
        width: '100%',
        height: '320px',
        perspective: '800px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* Drop shadow */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: `translateX(-50%) translateY(${floatY * 0.5}px)`,
          width: '180px',
          height: '30px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, transparent 70%)',
          filter: 'blur(6px)',
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* 3D Container */}
      <div
        style={{
          width: `${size.w}px`,
          height: `${size.h}px`,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `
            translateY(${floatY}px)
            rotateX(${-20 + mouseOffset.y}deg)
            rotateY(${-30 + mouseOffset.x}deg)
          `,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Front face */}
        <div
          style={{
            ...faceBase,
            width: `${size.w}px`,
            height: `${size.h}px`,
            transform: `translateZ(${size.d / 2}px)`,
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueDark})`,
            borderRadius: '3px',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          {corrugationLines}
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: '11px', color: '#fff', fontWeight: 700, letterSpacing: '0.05em' }}>
              EGHU 826260-6
            </span>
            <span style={{
              background: colors.green,
              color: '#fff',
              fontSize: '7px',
              fontWeight: 800,
              padding: '2px 6px',
              borderRadius: '3px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              VALIDATED
            </span>
          </div>
          {/* Bottom row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: '8px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em' }}>
              ISO: 45G1 | 40' HC
            </span>
            <span style={{ fontFamily: fonts.mono, fontSize: '8px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em' }}>
              CONF: 0.997
            </span>
          </div>
        </div>

        {/* Back face */}
        <div
          style={{
            ...faceBase,
            width: `${size.w}px`,
            height: `${size.h}px`,
            transform: `rotateY(180deg) translateZ(${size.d / 2}px)`,
            background: `linear-gradient(135deg, ${colors.blueDark}, #2a4ab0)`,
            borderRadius: '3px',
          }}
        />

        {/* Right face */}
        <div
          style={{
            ...faceBase,
            width: `${size.d}px`,
            height: `${size.h}px`,
            transform: `rotateY(90deg) translateZ(${size.w / 2}px)`,
            background: `linear-gradient(135deg, #4a6be0, ${colors.blueDark})`,
            borderRadius: '3px',
          }}
        />

        {/* Left face */}
        <div
          style={{
            ...faceBase,
            width: `${size.d}px`,
            height: `${size.h}px`,
            transform: `rotateY(-90deg) translateZ(${size.w / 2}px)`,
            background: `linear-gradient(135deg, #4a6be0, ${colors.blueDark})`,
            borderRadius: '3px',
          }}
        />

        {/* Top face */}
        <div
          style={{
            ...faceBase,
            width: `${size.w}px`,
            height: `${size.d}px`,
            transform: `rotateX(90deg) translateZ(${size.h / 2}px)`,
            background: `linear-gradient(180deg, #8aa3ff, #6b8bff)`,
            borderRadius: '3px',
          }}
        />

        {/* Bottom face */}
        <div
          style={{
            ...faceBase,
            width: `${size.w}px`,
            height: `${size.d}px`,
            transform: `rotateX(-90deg) translateZ(${size.h / 2}px)`,
            background: '#3048a8',
            borderRadius: '3px',
          }}
        />
      </div>
    </div>
  );
};

export default Container3D;
