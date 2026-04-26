'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';
const Node = ({
  text,
  isMuted = false



}: {text: string;isMuted?: boolean;}) =>
<div
  className={`p-4 rounded-lg text-center font-semibold border relative z-10 ${isMuted ? 'bg-slate-800/40 border-slate-700/50 text-gray-400' : 'bg-slate-800 border-slate-600 text-white shadow-sm'}`}>
  
    {text}
  </div>;

const FlowConnection = ({
  lineColor,
  textColor,
  label,
  icon: Icon,
  isError






}: {lineColor: string;textColor: string;label?: string;icon?: React.ElementType;isError?: boolean;}) =>
<div className="flex flex-col items-center my-1 relative z-0">
    <div className={`w-[2px] h-10 ${lineColor}`} />
    <ArrowDown size={20} className={`-mt-2 ${textColor}`} />
    {label && Icon &&
  <div
    className={`absolute left-1/2 ml-6 top-1/2 -translate-y-1/2 flex items-center gap-2 whitespace-nowrap text-sm font-medium ${isError ? 'text-gray-500' : 'text-[#2563EB]'}`}>
    
        <Icon size={16} className={isError ? 'text-gray-600' : ''} />
        {label}
      </div>
  }
  </div>;

export function CompetitiveEdge() {
  return (
    <section className="py-32 bg-[#0F172A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
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
          className="mb-24 text-center max-w-3xl mx-auto">
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            The only platform that reconciles physical truth.
          </h2>
          <p className="text-xl text-gray-400">
            Competitors read container codes. We verify what actually happened.
          </p>
        </motion.div>

        {/* Two-Column Flow Diagram */}
        <div className="grid md:grid-cols-2 gap-20 md:gap-12 relative max-w-5xl mx-auto">
          {/* Left Column: Everyone Else */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
            className="flex flex-col items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            
            <h3 className="text-2xl font-bold mb-12 text-gray-400">
              Everyone Else
            </h3>
            <div className="w-full max-w-[280px]">
              <Node text="Camera" isMuted />
              <FlowConnection
                lineColor="bg-slate-700"
                textColor="text-slate-700"
                label="No reconciliation"
                icon={XCircle}
                isError />
              
              <Node text="Basic OCR" isMuted />
              <FlowConnection
                lineColor="bg-slate-700"
                textColor="text-slate-700"
                label="No diagnostics"
                icon={XCircle}
                isError />

              <Node text="Terminal Operating System" isMuted />
              {/* Orphan FlowConnection ("No audit trail") removed per client feedback Apr 26 2026 */}
            </div>
          </motion.div>

          {/* Right Column: GateIn AI */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
            className="flex flex-col items-center relative">
            
            <h3 className="text-2xl font-bold mb-12 text-white flex items-center gap-3 relative z-10">
              GateIn AI
              <span className="bg-[#2563EB]/20 text-[#2563EB] text-xs font-mono px-3 py-1 rounded-sm border border-[#2563EB]/30 tracking-wide">
                THE STANDARD
              </span>
            </h3>
            <div className="w-full max-w-[320px] relative z-10">
              <Node text="Camera Array" />
              <FlowConnection
                lineColor="bg-[#2563EB]"
                textColor="text-[#2563EB]" />
              

              {/* Hero Node: Physical Truth Engine */}
              <div className="relative bg-[#0F172A] border border-[#2563EB]/40 rounded-lg p-6 text-center z-20 overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/10 to-transparent opacity-50 pointer-events-none" />

                <h4 className="text-xl font-extrabold text-[#2563EB] mb-5 relative z-10 tracking-tight">
                  Physical Truth Engine
                </h4>

                <div className="flex flex-col gap-3 text-sm text-gray-200 relative z-10">
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: 0.3
                    }}
                    className="flex items-center justify-center gap-2 bg-[#2563EB]/10 py-2 px-4 rounded-lg border border-[#2563EB]/20">
                    
                    <CheckCircle size={16} className="text-[#2563EB]" />{' '}
                    <span className="font-medium">Reconcile</span>
                  </motion.div>
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: 0.5
                    }}
                    className="flex items-center justify-center gap-2 bg-[#2563EB]/10 py-2 px-4 rounded-lg border border-[#2563EB]/20">
                    
                    <CheckCircle size={16} className="text-[#2563EB]" />{' '}
                    <span className="font-medium">Diagnose</span>
                  </motion.div>
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: 0.7
                    }}
                    className="flex items-center justify-center gap-2 bg-[#2563EB]/10 py-2 px-4 rounded-lg border border-[#2563EB]/20">
                    
                    <CheckCircle size={16} className="text-[#2563EB]" />{' '}
                    <span className="font-medium">Audit Trail</span>
                  </motion.div>
                </div>
              </div>

              <FlowConnection
                lineColor="bg-[#2563EB]"
                textColor="text-[#2563EB]" />

              <Node text="Terminal Operating System" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Stat Line */}
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
          transition={{
            delay: 0.4,
            duration: 0.8
          }}
          className="mt-24 pt-12 border-t border-white/5 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400 text-lg max-w-3xl mx-auto">
          
          <div className="w-12 h-12 rounded-lg bg-[#2563EB]/10 flex items-center justify-center shrink-0 border border-[#2563EB]/20">
            <ShieldCheck className="text-[#2563EB]" size={24} />
          </div>
          <span className="font-medium">
            Only platform that catches discrepancies before they enter your
            system.
          </span>
        </motion.div>
      </div>
    </section>);

}