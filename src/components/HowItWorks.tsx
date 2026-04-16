'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Cpu, CheckCircle2, LayoutDashboard } from 'lucide-react';
const steps = [
{
  icon: <Camera size={32} />,
  title: 'Image Capture',
  desc: 'Multi-camera array captures every angle'
},
{
  icon: <Cpu size={32} />,
  title: 'AI Processing',
  desc: 'Edge AI processes locally, no cloud needed'
},
{
  icon: <CheckCircle2 size={32} />,
  title: 'Validation',
  desc: 'Automatic validation against databases'
},
{
  icon: <LayoutDashboard size={32} />,
  title: 'Output',
  desc: 'Real-time results via API or dashboard'
}];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-32 bg-[#0F172A] text-white overflow-hidden">
      
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
          className="mb-24 text-center">
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            From camera to dashboard in under{' '}
            <span className="font-mono">2</span> seconds.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting Line Background */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-slate-800 z-0" />

          {/* Animated Connecting Line */}
          <motion.div
            className="hidden md:block absolute top-12 left-[10%] h-[1px] bg-[#2563EB] z-0 origin-left"
            initial={{
              scaleX: 0
            }}
            whileInView={{
              scaleX: 1
            }}
            viewport={{
              once: true,
              margin: '-100px'
            }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut'
            }}
            style={{
              width: '80%'
            }} />
          

          <div className="grid md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) =>
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
                delay: index * 0.3
              }}
              className="flex flex-col items-center text-center">
              
                <div className="w-24 h-24 rounded-lg bg-[#1E293B] border border-slate-700 shadow-[0_0_0_1px_rgba(37,99,235,0.2)] flex items-center justify-center text-[#2563EB] mb-6 relative">
                  {step.icon}
                </div>
                <div className="text-[#2563EB] font-mono text-sm font-bold mb-2 tracking-widest">
                  STEP 0{index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>);

}