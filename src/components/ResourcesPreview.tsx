'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { resources, categoryColors } from '@/data/resources'

export function ResourcesPreview() {
  const latest = resources.slice(0, 3)

  return (
    <section className="py-32 bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#5B7FFF] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
            Resources
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Insights.
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Stay ahead with the latest on container logistics, AI automation, and yard management best practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latest.map((resource, i) => (
            <motion.article
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#1E293B] border border-white/5 rounded-lg overflow-hidden hover:border-[#5B7FFF]/20 transition-colors group"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${categoryColors[resource.category] || categoryColors.Technology}`}>
                    {resource.category}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  {resource.date} &middot; {resource.readTime}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#5B7FFF] transition-colors leading-snug">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                  {resource.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/resources"
            className="inline-flex items-center gap-2 text-[#5B7FFF] font-bold hover:underline text-lg"
          >
            View All Resources &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
