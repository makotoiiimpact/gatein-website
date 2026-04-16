'use client'

import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
const products = [
{
  title: 'Gate OCR',
  desc: 'AI-powered container code reading at the gate. 82% faster processing.',
  badge: 'LIVE',
  badgeColor: 'bg-[#2563EB] text-white'
},
{
  title: 'Yard Analytics',
  desc: 'Real-time dashboards, detention tracking, and NLP queries.',
  badge: 'BUILDING',
  badgeColor: 'bg-amber-500 text-white'
},
{
  title: 'Damage Detection',
  desc: 'External + internal container damage assessment.',
  badge: 'IN DEV',
  badgeColor: 'bg-slate-200 text-slate-700'
},
{
  title: 'Vehicle Manager',
  desc: 'Track human and autonomous vehicles across the facility.',
  badge: 'ROADMAP',
  badgeColor: 'bg-slate-100 text-slate-500'
}];

export function Products() {
  return (
    <section id="products" className="py-32 bg-white text-slate-900">
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
          className="mb-16">
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            One platform. Four phases.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {products.map((product, index) =>
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
            className={`p-8 rounded-lg border ${index === 0 ? 'border-[#2563EB] shadow-lg bg-blue-50/30' : 'border-slate-200 bg-white'} relative flex flex-col h-full`}>
            
              <div className="mb-6">
                <span
                className={`text-xs font-bold font-mono px-3 py-1 rounded-sm ${product.badgeColor}`}>
                
                  {product.badge}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
              <p className="text-slate-600 flex-grow">
                {product.desc.split('82%').map((part, i, arr) =>
              <Fragment key={i}>
                    {part}
                    {i < arr.length - 1 &&
                <span className="font-mono font-medium text-slate-800">
                        82%
                      </span>
                }
                  </Fragment>
              )}
              </p>
            </motion.div>
          )}
        </div>

        <div className="text-center">
          <a href="#contact" className="bg-[#2563EB] hover:bg-[#4A6BEE] text-white px-8 py-4 rounded-md text-lg font-bold transition-all inline-block">
            Request a Demo
          </a>
        </div>
      </div>
    </section>);

}