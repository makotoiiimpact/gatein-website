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
  },
  {
    icon: <CloudRain className="text-blue-500" size={24} />,
    title: 'RAIN',
    desc: 'Wet weather, no degradation',
    video: '/rain-scan.mp4',
  },
  {
    icon: <Moon className="text-indigo-400" size={24} />,
    title: 'NIGHT',
    desc: 'Complete darkness, infrared capable',
    video: '/night-scan.mp4',
  },
];

export function AllWeather() {
  return (
    <section className="py-32 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
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
              <div className="w-full aspect-[4/3] rounded-lg mb-6 relative overflow-hidden bg-black">
                <video
                  src={condition.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-3 mb-2">
                {condition.icon}
                <h3 className="text-2xl font-bold font-mono tracking-wide">
                  {condition.title}
                </h3>
              </div>
              <p className="text-slate-600">{condition.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-50 border border-slate-200 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-lg font-medium text-slate-700">
            Deployed in Oakland, USA and Koper, Europe. Bidding in Qatar.
          </div>
          <a href="#contact" className="bg-[#2563EB] hover:bg-[#4A6BEE] text-white px-8 py-3 rounded-md text-lg font-bold transition-all whitespace-nowrap">
            Request a Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
