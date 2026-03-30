'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const painPoints = [
  {
    num: '01',
    title: 'Fragmented Visibility',
    description:
      'Separate systems and paper logs create blind spots across your yard, making it impossible to know exactly where assets are at any given moment.',
  },
  {
    num: '02',
    title: 'Manual Bottlenecks',
    description:
      '7-10 minutes per transaction at the gate creates massive queues, backing up local traffic and destroying throughput efficiency.',
  },
  {
    num: '03',
    title: 'Data Entry Errors',
    description:
      'Manual transcription of container codes cascades into disputed records, lost containers, and thousands in demurrage fees.',
  },
  {
    num: '04',
    title: 'Reactive Management',
    description:
      'Problems are discovered hours or days after the fact. By the time you know a container is damaged or missing, the cost has already been incurred.',
  },
];

export function PainPoints() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActive = useCallback(() => {
    const viewportCenter = window.innerHeight / 2;
    let closest = 0;
    let closestDist = Infinity;

    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const rowCenter = rect.top + rect.height / 2;
      const dist = Math.abs(rowCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    // Only highlight if the section is actually in view
    const section = sectionRef.current;
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setActiveIndex(-1);
        return;
      }
    }

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener('scroll', updateActive);
  }, [updateActive]);

  return (
    <section ref={sectionRef} className="py-32 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Editorial Header */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[2px] bg-[#5B7FFF]" />
            <span className="text-sm font-bold tracking-[0.2em] text-[#5B7FFF] uppercase font-mono">
              The Challenge
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight max-w-3xl leading-[1.1]"
          >
            Your yard is running blind.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 leading-relaxed max-w-2xl font-light"
          >
            Logistics facilities managing containers face critical visibility
            gaps that cost thousands every month in lost time and penalties.
          </motion.p>
        </div>

        {/* Rows */}
        <div className="flex flex-col">
          {/* Top border */}
          <motion.div
            className="w-full h-[1px] bg-slate-200"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {painPoints.map((point, index) => {
            const isActive = activeIndex === index;
            const slideDirection = index % 2 === 0 ? -40 : 40;

            return (
              <div
                key={index}
                ref={(el) => { rowRefs.current[index] = el; }}
                className="relative group"
              >
                <motion.div
                  initial={{ opacity: 0, x: slideDirection }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="flex flex-col md:flex-row items-start md:items-center py-12 md:py-16 gap-6 md:gap-12 px-8 md:px-12 rounded-xl transition-all duration-500"
                  style={{
                    backgroundColor: isActive ? '#0F172A' : 'transparent',
                  }}
                >
                  {/* Number */}
                  <div className="w-full md:w-32 flex-shrink-0">
                    <span
                      className="text-7xl md:text-8xl font-light font-mono text-transparent transition-all duration-500"
                      style={{
                        WebkitTextStroke: isActive
                          ? '1px rgba(255,255,255,0.25)'
                          : '1px #cbd5e1',
                      }}
                    >
                      {point.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow max-w-2xl">
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-4 transition-colors duration-500"
                      style={{ color: isActive ? '#5B7FFF' : '#0f172a' }}
                    >
                      {point.title}
                    </h3>
                    <p
                      className="text-lg leading-relaxed font-light transition-colors duration-500"
                      style={{ color: isActive ? '#9ca3af' : '#64748b' }}
                    >
                      {point.description}
                    </p>
                  </div>
                </motion.div>

                {/* Bottom Border */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] transition-colors duration-500"
                  style={{
                    backgroundColor: isActive
                      ? 'rgba(91,127,255,0.2)'
                      : '#e2e8f0',
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
