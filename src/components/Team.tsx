'use client'

import React from 'react';
import { motion } from 'framer-motion';
const team = [
{
  name: 'Bernardo Mendez',
  role: 'CEO',
  desc: '18 years product management. Energy, robotics, autonomous vehicles.'
},
{
  name: 'Michael Pivtoraiko',
  role: 'CTO',
  desc: 'Carnegie Mellon PhD. Computer vision and AI recognition expert.'
},
{
  name: 'Jordi Goni',
  role: 'CPO/COO',
  desc: 'IT and supply chain. Edge computing specialist across EMEA, US, LATAM.'
}];

export function Team() {
  return (
    <section id="about" className="py-32 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          className="mb-16 text-center">
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Built by people who've shipped AI at scale.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {team.map((member, index) =>
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: index * 0.1
            }}
            className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
            
              <div className="w-24 h-24 bg-slate-300 rounded-full mx-auto mb-6 flex items-center justify-center text-slate-500 font-medium">
                Photo
              </div>
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <div className="text-[#5B7FFF] font-bold text-sm mb-4">
                {member.role}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {member.desc}
              </p>
            </motion.div>
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