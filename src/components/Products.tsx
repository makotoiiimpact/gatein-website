'use client'

import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
const products = [
{
  title: 'Gate OCR',
  desc: 'AI-powered container code reading at the gate. 82% faster processing.'
},
{
  title: 'Yard Analytics',
  desc: 'Real-time dashboards, detention tracking, and NLP queries.'
},
{
  title: 'Damage Detection',
  desc: 'External + internal container damage assessment.'
},
{
  title: 'Vehicle Manager',
  desc: 'Track human and autonomous vehicles across the facility.'
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
            One platform. Four amazing products.
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
            className="group p-8 rounded-lg border border-slate-200 bg-white hover:border-dashed hover:border-[#2563EB] hover:bg-blue-50/30 hover:shadow-lg transition-[background-color,border-color,box-shadow] duration-300 relative flex flex-col items-center justify-center text-center min-h-[220px] cursor-default">

              <h3 className="text-2xl font-bold">{product.title}</h3>
              <p className="mt-3 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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