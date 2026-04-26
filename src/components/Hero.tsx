'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Target, Clock } from 'lucide-react';

function useCountUp(target: number, duration: number, startDelay: number, decimals = 0) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTime.current === null) startTime.current = timestamp;
        const elapsed = timestamp - startTime.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(parseFloat((eased * target).toFixed(decimals)));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, startDelay, decimals]);

  return value;
}

function CountUpStat({ stat, label, icon: Icon, delay }: {
  stat: string
  label: string
  icon: React.ElementType
  delay: number
}) {
  const match = stat.match(/^([\d.]+)(.*)$/);
  const numericPart = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : stat;
  const decimals = match && match[1].includes('.') ? 1 : 0;
  const counted = useCountUp(numericPart, 1200, delay * 1000, decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="flex items-center gap-2 md:gap-4 bg-white/5 backdrop-blur-md border border-[#2563EB]/20 rounded-lg p-2 pr-3 md:p-4 md:pr-8 shadow-[0_4px_20px_rgba(37,99,235,0.05)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.1)] transition-shadow"
    >
      <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#2563EB]/20 flex items-center justify-center text-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.2)] shrink-0">
        <Icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
      </div>
      <div>
        <div className="text-white font-bold text-xs md:text-lg leading-tight tabular-nums">
          {match ? `${counted}${suffix}` : stat}
        </div>
        <div className="text-gray-400 text-[10px] md:text-sm">{label}</div>
      </div>
    </motion.div>
  );
}

function HUDCountUp({ target, duration, active }: { target: number; duration: number; active: boolean }) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      startTime.current = null;
      return;
    }
    const animate = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return <span className="text-gray-300 ml-1 text-xs tabular-nums">{value.toLocaleString()}</span>;
}

export function Hero() {
  const [systemActive, setSystemActive] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-end pt-32 pb-52 md:pb-40 overflow-hidden bg-[#0F172A]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-poster.jpg"
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-[1] pointer-events-none" />

      {/* Animated Scan Line — only visible when system is active */}
      <AnimatePresence>
        {systemActive && (
          <motion.div
            className="absolute top-0 bottom-0 w-[1px] z-[2]"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(37,99,235,0.8), transparent)',
              boxShadow: '0 0 20px 2px rgba(37,99,235,0.4)',
            }}
            initial={{ left: '-10%', opacity: 0 }}
            animate={{ left: ['-10%', '110%'], opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              left: { duration: 6, ease: 'linear', repeat: Infinity },
              opacity: { duration: 0.3 },
            }}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tighter mb-6">
              AI-Powered <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#8AA6FF]">
                Container Intelligence
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-2xl font-light"
          >
            Automated tracking. Real-time visibility.<br />
            Every container, every condition, every time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="#contact"
              className="cta-glow bg-[#2563EB] hover:bg-[#4A6BEE] text-white px-8 py-4 rounded-md text-lg font-bold flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              Request a Demo
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <div className="flex flex-row gap-2 md:gap-6">
            <CountUpStat icon={Zap} stat="82% Faster" label="Gate Processing" delay={0.7} />
            <CountUpStat icon={Target} stat="99.7% Accurate" label="OCR Recognition" delay={0.8} />
            <CountUpStat icon={Clock} stat="24/7 Operation" label="All Weather" delay={0.9} />
          </div>
        </div>
      </div>

      {/* HUD Data Readout — toggle on click */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
        onClick={() => setSystemActive(!systemActive)}
        className="hidden lg:flex absolute bottom-[120px] right-8 flex-col gap-2 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-md font-mono text-[11px] z-30 shadow-2xl cursor-pointer select-none transition-all duration-500 hover:bg-black/50"
      >
        <div className={`flex items-center gap-2 font-bold tracking-widest transition-colors duration-500 ${systemActive ? 'text-green-400' : 'text-red-400'}`}>
          <div className="relative flex h-2 w-2">
            {systemActive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 transition-colors duration-500 ${
                systemActive
                  ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]'
                  : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
              }`}
            />
          </div>
          {systemActive ? 'SYSTEM ACTIVE' : 'SYSTEM INACTIVE'}
        </div>

        <AnimatePresence>
          {systemActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="overflow-hidden flex flex-col gap-2"
            >
              <div className="text-gray-500 uppercase tracking-wider pt-2">
                Containers Processed:{' '}
                <HUDCountUp target={14847} duration={2000} active={systemActive} />
              </div>
              <div className="text-gray-500 uppercase tracking-wider">
                Uptime: <span className="text-gray-300 ml-1 text-xs">99.97%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Removed per client feedback Apr 26 2026 — will re-add with real customer logos later */}
      {/*
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-[#0F172A]/80 backdrop-blur-md py-6 z-30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
            Trusted by industry leaders
          </span>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="font-bold text-xl text-white">NavTrac</div>
            <div className="font-bold text-xl text-white">YASKAWA</div>
            <div className="font-bold text-xl text-white">Google</div>
            <div className="font-bold text-xl text-white">McKinsey</div>
            <div className="font-bold text-xl text-white tracking-tighter">amazon</div>
          </div>
        </div>
      </div>
      */}
    </section>
  );
}
