'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { resources, categoryColors } from '@/data/resources'

const categories = ['All', 'Technology', 'Industry', 'Guide', 'Case Study'] as const

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = React.useState<string>('All')

  const filtered = activeCategory === 'All'
    ? resources
    : resources.filter((r) => r.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans selection:bg-[#5B7FFF]/30">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#5B7FFF] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
              Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Insights
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Stay ahead with the latest on container logistics, AI automation, and yard management best practices.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#5B7FFF] text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((resource, i) => (
              <motion.article
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
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
                  <h2 className="text-lg font-bold text-white mb-3 group-hover:text-[#5B7FFF] transition-colors leading-snug">
                    {resource.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                    {resource.excerpt}
                  </p>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5B7FFF] text-sm font-medium mt-4 inline-flex items-center gap-1 hover:underline"
                    >
                      Read more &rarr;
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
