'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const team = [
{
  name: 'Bernardo Mendez',
  role: 'CEO',
  desc: '18 years product management. Energy, robotics, autonomous vehicles.',
  photo: '/team-bernardo.jpg',
},
{
  name: 'Michael Pivtoraiko',
  role: 'CTO',
  desc: 'Carnegie Mellon PhD. Computer vision and AI recognition expert.',
  photo: null,
},
{
  name: 'Jordi Goni',
  role: 'CPO/COO',
  desc: 'IT and supply chain. Edge computing specialist across EMEA, US, LATAM.',
  photo: null,
}];

function TeamCard({ member, index }: { member: typeof team[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 40px rgba(91,127,255,0.12), 0 8px 16px rgba(0,0,0,0.08)',
        borderColor: 'rgba(91,127,255,0.3)',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center cursor-default transition-colors duration-300 relative overflow-hidden"
    >
      {/* Scan Line */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="scanline"
            className="absolute top-0 bottom-0 w-[2px] z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(91,127,255,0.8), transparent)',
              boxShadow: '0 0 12px 2px rgba(91,127,255,0.3)',
            }}
            initial={{ left: '-2px', opacity: 0 }}
            animate={{ left: '100%', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {member.photo ? (
        <motion.img
          src={member.photo}
          alt={member.name}
          className="w-24 h-24 rounded-full mx-auto mb-6 object-cover object-top ring-2 ring-transparent transition-all duration-300"
          whileHover={{ scale: 1.08 }}
        />
      ) : (
        <motion.div
          className="w-24 h-24 bg-slate-300 rounded-full mx-auto mb-6 flex items-center justify-center text-slate-500 font-medium text-sm ring-2 ring-transparent transition-all duration-300"
          whileHover={{ scale: 1.08 }}
        >
          {member.name.split(' ').map(n => n[0]).join('')}
        </motion.div>
      )}
      <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
      <div className="text-[#5B7FFF] font-bold text-sm mb-4">
        {member.role}
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">
        {member.desc}
      </p>
    </motion.div>
  );
}

export function Team() {
  return (
    <section id="about" className="py-32 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Built by people who&apos;ve shipped AI at scale.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {team.map((member, index) =>
            <TeamCard key={index} member={member} index={index} />
          )}
        </div>

        <div className="border-t border-slate-200 pt-16">
          <div className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8 font-mono">
            Backed by & Partnered with
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale">
            <div className="font-bold text-xl">YASKAWA</div>
            <div className="font-bold text-xl">Google</div>
            <div className="font-bold text-xl">McKinsey</div>
            <div className="font-bold text-xl">Eaton</div>
            <div className="font-bold text-xl">ISEE</div>
            <div className="font-bold text-xl">Forterra</div>
            <div className="font-bold text-xl">NavTrac</div>
            <div className="font-bold text-xl">amazon</div>
            <div className="font-bold text-xl tracking-tighter border border-current px-2 py-1 rounded-sm">
              NVIDIA <span className="font-light text-xs">INCEPTION</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}