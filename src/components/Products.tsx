'use client'

import React, { Fragment, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type Product = {
  title: string
  desc: string
  bg: string
}

const products: Product[] = [
  {
    title: 'Gate OCR',
    desc: 'AI-powered container code reading at the gate. 82% faster processing.',
    // Atmospheric container/metal close-up for the gate read
    bg: '/assets/damage/5.jpeg',
  },
  {
    title: 'Yard Analytics',
    desc: 'Real-time dashboards, detention tracking, and NLP queries.',
    // Aerial of a busy container yard — matches analytics / overview framing
    bg: 'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=2400',
  },
  {
    title: 'Damage Detection',
    desc: 'External + internal container damage assessment.',
    // Real damage photo — rust/corrosion close-up
    bg: '/assets/damage/3.jpeg',
  },
  {
    title: 'Vehicle Manager',
    desc: 'Track human and autonomous vehicles across the facility.',
    // Night port vessel / vehicle movement at scale
    bg: 'https://images.pexels.com/photos/753331/pexels-photo-753331.jpeg?auto=compress&cs=tinysrgb&w=2400',
  },
]

function ProductCard({
  product,
  index,
  onActivate,
  isActive,
}: {
  product: Product
  index: number
  onActivate: (title: string | null) => void
  isActive: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  const handleEnter = () => {
    setIsHovering(true)
    onActivate(product.title)
  }
  const handleLeave = () => {
    setIsHovering(false)
    onActivate(null)
  }
  // Tap toggle for touch devices (mouseleave fires unreliably there)
  const handleClick = () => {
    onActivate(isActive ? null : product.title)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className="group relative p-8 rounded-lg border border-slate-200 bg-white flex flex-col h-full cursor-default transition-[transform,box-shadow,border-color,background-color] duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-dashed hover:border-[#2563EB]"
    >
      {/* Cursor-following radial border glow (mask-composite trick) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(37,99,235,0.9), rgba(37,99,235,0) 45%)`,
          padding: '1.5px',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Soft inner glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(37,99,235,0.08), rgba(37,99,235,0) 45%)`,
        }}
      />

      <h3 className="relative text-2xl font-bold mb-3">{product.title}</h3>
      <p className="relative text-slate-600 flex-grow">
        {product.desc.split('82%').map((part, i, arr) => (
          <Fragment key={i}>
            {part}
            {i < arr.length - 1 && (
              <span className="font-mono font-medium text-slate-800">82%</span>
            )}
          </Fragment>
        ))}
      </p>
    </motion.div>
  )
}

export function Products() {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const activeProduct = products.find((p) => p.title === activeCard)

  // Tap outside any card (on touch devices) clears the active background.
  useEffect(() => {
    if (!activeCard) return
    const handleDocumentPointer = (e: PointerEvent) => {
      const section = sectionRef.current
      if (!section || !(e.target instanceof Node)) return
      // If pointer lands outside the section entirely, clear.
      if (!section.contains(e.target)) {
        setActiveCard(null)
        return
      }
      // Inside section: clear only if tap landed outside any card.
      const card = (e.target as Element).closest('[data-product-card]')
      if (!card) setActiveCard(null)
    }
    document.addEventListener('pointerdown', handleDocumentPointer)
    return () => document.removeEventListener('pointerdown', handleDocumentPointer)
  }, [activeCard])

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-32 bg-white text-slate-900 overflow-hidden"
    >
      {/* Ambient hover background — swaps image per active card, 22% opacity + blur, 600ms crossfade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: activeProduct ? 0.22 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: activeProduct ? `url(${activeProduct.bg})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
            transform: 'scale(1.02)', // hide blur edge bleed
          }}
        />
        {/* Readability wash — keeps the cards clearly on top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.55) 100%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            One platform. Four amazing products.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {products.map((product, index) => (
            <div key={product.title} data-product-card>
              <ProductCard
                product={product}
                index={index}
                onActivate={setActiveCard}
                isActive={activeCard === product.title}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="cta-glow bg-[#2563EB] hover:bg-[#4A6BEE] text-white px-8 py-4 rounded-md text-lg font-bold inline-block"
          >
            Request a Demo
          </a>
        </div>
      </div>
    </section>
  )
}
