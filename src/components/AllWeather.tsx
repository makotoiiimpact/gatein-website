'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, Moon } from 'lucide-react';

const conditions = [
  {
    icon: <Sun className="text-amber-500" size={24} />,
    title: 'DAY',
    desc: 'Clear conditions, full accuracy',
    video: '/day-scan.mp4',
    ariaLabel: 'Container scanning demonstration in clear daylight conditions',
    // day-scan.mp4 is portrait-source (540×960) in a landscape aspect-video
    // box — anchor to bottom so the plate/chassis/container-code captures
    // (bottom of frame) stay visible instead of being center-cropped off.
    objectPosition: 'object-bottom',
  },
  {
    icon: <CloudRain className="text-blue-500" size={24} />,
    title: 'RAIN',
    desc: 'Wet weather, no degradation',
    video: '/assets/videos/rain.mp4',
    ariaLabel: 'Container scanning demonstration in wet weather conditions',
    // rain.mp4 is landscape-source (1920×920) — center is correct.
    objectPosition: 'object-center',
  },
  {
    icon: <Moon className="text-indigo-400" size={24} />,
    title: 'NIGHT',
    desc: 'Complete darkness, infrared capable',
    video: '/assets/videos/night.mp4',
    ariaLabel: 'Container scanning demonstration in darkness with infrared',
    // night.mp4 is landscape-source (1920×920) — center is correct.
    objectPosition: 'object-center',
  },
];

export function AllWeather() {
  return (
    <section className="py-32 bg-white text-slate-900">
      <div className="px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Rain. Night. Shine. Any Condition. Doesn&apos;t matter.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {conditions.map((condition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="w-full aspect-video rounded-lg mb-6 relative overflow-hidden bg-black">
                <video
                  src={condition.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={condition.ariaLabel}
                  className={`absolute inset-0 w-full h-full object-cover ${condition.objectPosition}`}
                />
              </div>
              <div className="flex items-center justify-center gap-3 mb-2">
                {condition.icon}
                <h3 className="text-2xl font-bold font-mono tracking-wide">
                  {condition.title}
                </h3>
              </div>
              <p className="text-slate-600 text-center">{condition.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* V5 May-21 + V6 Phase 4 F3.4 + F10 additions: damage detection +
            Lázaro Cárdenas container detection. Both bottom cells share the
            same dimensions as the top-row weather cells via col-span-2 in
            a 6-col grid; centered horizontally with symmetric empty cols
            (1 + 6). Both videos use object-cover for edge-to-edge fill —
            damage clip uses object-bottom to bias toward the bounding-box
            action in the lower half of the source frame; MX clip uses
            object-center as a safe default for the portrait source cropped
            into the landscape frame. */}
        <div className="grid md:grid-cols-6 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:col-start-2 md:col-span-2"
          >
            <div className="w-full aspect-video rounded-lg mb-6 relative overflow-hidden bg-black">
              <video
                src="/assets/videos/damage-detection.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Live damage detection demonstration with on-frame bounding box and classification"
                className="absolute inset-0 w-full h-full object-cover object-bottom"
              />
            </div>
            <p className="text-slate-600 text-center">
              Live damage detection — bounding box + classification
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:col-span-2"
          >
            <div className="w-full aspect-video rounded-lg mb-6 relative overflow-hidden bg-black">
              <video
                src="/assets/videos/container-detection-mx.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Container detection demonstration at Lázaro Cárdenas, Mexico"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
            <p className="text-slate-600 text-center">
              Container detection — Lázaro Cárdenas
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-slate-50 border border-slate-200 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-lg font-medium text-slate-700 text-center md:text-left">
            Global deployments across California, Slovenia, and Mexico.
          </div>
          <a href="#contact" className="cta-glow bg-[#2563EB] hover:bg-[#4A6BEE] text-white px-8 py-3 rounded-md text-lg font-bold whitespace-nowrap">
            Request a Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
