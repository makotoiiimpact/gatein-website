'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin } from 'lucide-react';

type TeamMember = {
  name: string;
  role: string;
  desc: string;
  photo: string | null;
  linkedin?: string;
};

const team: TeamMember[] = [
{
  name: 'Bernardo Mendez',
  role: 'CEO',
  desc: 'Electrical engineer with an MBA & 18 years of Product Management experience. Product and engineering leader in Energy, Robotics, and Autonomous Vehicles.',
  photo: '/assets/team/bernardo.jpg',
  linkedin: 'https://www.linkedin.com/in/bernardomendezarista/',
},
// Removed pre-launch per client request — Apr 20 2026
// {
//   name: 'Michael Pivtoraiko',
//   role: 'CTO',
//   desc: 'Expert in Computer Vision and AI recognition. Co-founder of a logistics and automation startup. Carnegie Mellon PhD in AI and Robotics.',
//   photo: null,
// },
{
  name: 'Jordi Goni',
  role: 'CPO / COO',
  desc: 'Experience working in IT / Supply Chain engagements and Edge computing helping clients innovate. Working experience across EMEA, US and LATAM.',
  photo: '/assets/team/jordi.jpg',
  linkedin: 'https://www.linkedin.com/in/jordi-goni/',
},
// Anton and Evan — headshots + bios pending from Bernardo
{
  name: 'Anton',
  role: 'TBD',
  desc: '',
  photo: null,
},
{
  name: 'Evan',
  role: 'TBD',
  desc: '',
  photo: null,
}];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 40px rgba(37,99,235,0.12), 0 8px 16px rgba(0,0,0,0.08)',
        borderColor: 'rgba(37,99,235,0.3)',
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
              background: 'linear-gradient(to bottom, transparent, rgba(37,99,235,0.8), transparent)',
              boxShadow: '0 0 12px 2px rgba(37,99,235,0.3)',
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
          alt={`${member.name}, ${member.role} at GateIn AI`}
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
      <div className="text-[#2563EB] font-bold text-sm mb-4">
        {member.role}
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">
        {member.desc}
      </p>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="mt-5 inline-flex items-center justify-center p-3 text-slate-400 hover:text-[#0A66C2] transition-colors"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      )}
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

        <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-4xl mx-auto">
          {team.map((member, index) =>
            <TeamCard key={index} member={member} index={index} />
          )}
        </div>

        <div className="border-t border-slate-200 pt-16">
          <div className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8 font-mono">
            Partnered with
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            <img
              src="/nvidia-inception-program-badge-rgb-for-screen.png"
              alt="NVIDIA Inception Program"
              className="h-24 object-contain"
            />
            <a
              href="https://startup.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google for Startups"
              className="inline-flex"
            >
              <img
                src="/assets/logos/google-for-startups.png"
                alt="Google for Startups"
                className="h-20 object-contain"
              />
            </a>
            <a
              href="https://www.ai2incubator.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AI2 Incubator"
              className="inline-flex"
            >
              <img
                src="/ai2-incubator-black.png"
                alt="AI2 Incubator"
                className="h-20 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </section>);

}