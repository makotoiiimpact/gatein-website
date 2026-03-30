'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, CheckCircle2, Loader2 } from 'lucide-react';
import posthog from 'posthog-js';

export function Contact() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [fleetSize, setFleetSize] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, fleetSize, message }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setStatus('success');
      posthog.capture('demo_requested', { company, fleetSize });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="py-32 bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            See it in action.
          </h2>
          <p className="text-xl text-gray-400">
            <span className="font-mono">30</span>-minute demo. No commitment.
            See GateIn AI tracking containers in real-time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-[#1E293B] p-8 md:p-10 rounded-lg border border-white/5"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 size={48} className="text-green-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Demo request sent!</h3>
                <p className="text-gray-400">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#5B7FFF] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#5B7FFF] transition-colors"
                      placeholder="Logistics Corp"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#5B7FFF] transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Fleet Size</label>
                    <select
                      value={fleetSize}
                      onChange={(e) => setFleetSize(e.target.value)}
                      className="w-full bg-[#0F172A] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#5B7FFF] transition-colors appearance-none"
                    >
                      <option value="">Select size...</option>
                      <option value="1-50">1-50 trucks</option>
                      <option value="51-200">51-200 trucks</option>
                      <option value="200+">200+ trucks</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#0F172A] border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#5B7FFF] transition-colors resize-none"
                    placeholder="Tell us about your yard challenges..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-[#5B7FFF] hover:bg-[#4A6BEE] disabled:opacity-60 text-white px-8 py-4 rounded-md text-lg font-bold transition-all flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Request a Demo'
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-400 text-sm text-center">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#1E293B] p-8 rounded-lg border border-white/5 h-[calc(50%-12px)] flex flex-col justify-center"
            >
              <div className="w-12 h-12 bg-[#5B7FFF]/10 rounded-lg flex items-center justify-center text-[#5B7FFF] mb-6 border border-[#5B7FFF]/20">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email us directly</h3>
              <a href="mailto:bernardo@gatein.ai" className="text-gray-400 hover:text-white transition-colors">
                bernardo@gatein.ai
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#1E293B] p-8 rounded-lg border border-white/5 h-[calc(50%-12px)] flex flex-col justify-center"
            >
              <div className="w-12 h-12 bg-[#5B7FFF]/10 rounded-lg flex items-center justify-center text-[#5B7FFF] mb-6 border border-[#5B7FFF]/20">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Book a time</h3>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-medium transition-colors text-left w-full flex justify-between items-center">
                Open Calendar
                <Calendar size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
