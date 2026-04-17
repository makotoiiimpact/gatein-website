'use client'

import React, { useState, useEffect, useRef } from 'react'

const MARKETS = [
  {
    name: 'Container Depots',
    color: '#3B82F6',
    tags: ['Container OCR', 'Damage Detection', 'Inventory Accuracy'],
    src: '/shipping-containers-stacked-port.jpg',
  },
  {
    name: 'Intermodal Terminals',
    color: '#6366F1',
    tags: ['Rail OCR', 'Chassis Tracking', 'Cross-dock Flow'],
    // Pexels — container yard with stacked intermodal containers; free commercial use
    src: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=880&h=660&fit=crop',
  },
  {
    name: 'Warehouse & DC Yards',
    color: '#475569',
    tags: ['Dock Scheduling', 'Trailer Tracking', 'WMS Integration'],
    // TODO(image): needs an aerial / exterior DC yard shot with trailers + dock doors — current image is an interior aisle
    src: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=390&h=520&fit=crop&auto=format',
  },
  {
    name: 'Third-Party Logistics (3PL)',
    color: '#0D9488',
    tags: ['Multi-tenant', 'Customer Portals', 'SLA Tracking'],
    src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=460&h=340&fit=crop&auto=format',
  },
  {
    name: 'Refrigerated & Cold Storage',
    color: '#0EA5E9',
    tags: ['Reefer Priority', 'Cold Chain', 'FSMA Compliance'],
    src: '/coldstoragecontainer.png',
  },
  {
    name: 'Manufacturing Facilities',
    color: '#8B5CF6',
    tags: ['JIT Delivery', 'Vendor Managed', 'ERP Integration'],
    src: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=480&h=370&fit=crop&auto=format',
  },
]

const CARD_CONFIGS = [
  { top: '3%',   left: '2%',   w: 375, h: 285, speed: -0.25, rotate: -2.5 },
  { top: '3%',   right: '3%',  w: 330, h: 248, speed: 0.55,  rotate: 2 },
  { top: '35%',  left: '12%',  w: 293, h: 280, speed: -0.08, rotate: -0.8 },
  { top: '35%',  right: '10%', w: 345, h: 255, speed: 0.4,   rotate: 2.5 },
  { top: '67%',  left: '12%',  w: 338, h: 255, speed: -0.35, rotate: -1.5 },
  { top: '67%',  right: '10%', w: 360, h: 255, speed: 0.15,  rotate: 1 },
]

// Mobile parallax speeds — alternate directions for depth effect
const MOBILE_SPEEDS = [0.08, -0.12, 0.06, -0.1, 0.14, -0.08]

function FloatingCard({ market, config, sectionRef, index }: {
  market: typeof MARKETS[number]
  config: typeof CARD_CONFIGS[number]
  sectionRef: React.RefObject<HTMLElement | null>
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (!sectionRef.current || !cardRef.current) { ticking = false; return }
        const rect = sectionRef.current.getBoundingClientRect()
        const wh = window.innerHeight
        const progress = (wh - rect.top) / (wh + rect.height)
        const clamped = Math.max(0, Math.min(1, progress))
        const yOffset = (clamped - 0.5) * config.speed * 900
        const rot = config.rotate * (0.5 + clamped * 0.5)
        cardRef.current.style.transform = `translate3d(0, ${yOffset}px, 0) rotate(${rot}deg)`
        ticking = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionRef, config.speed, config.rotate])

  return (
    <div
      ref={cardRef}
      style={{
        position: 'absolute',
        top: config.top,
        left: (config as { left?: string }).left || 'auto',
        right: (config as { right?: string }).right || 'auto',
        width: config.w,
        height: config.h,
        borderRadius: 14,
        overflow: 'hidden',
        willChange: 'transform',
        boxShadow: '0 12px 40px -10px rgba(0,0,0,0.25)',
        zIndex: 10 - index,
      }}
    >
      <img
        src={market.src}
        alt={market.name}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '16px 18px',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            marginBottom: 8,
          }}
        >
          {market.name}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {market.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.03em',
                color: 'rgba(255,255,255,0.9)',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 100,
                padding: '3px 10px',
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileCard({ market, speed, sectionRef, index }: {
  market: typeof MARKETS[number]
  speed: number
  sectionRef: React.RefObject<HTMLElement | null>
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (!cardRef.current) { ticking = false; return }
        const rect = cardRef.current.getBoundingClientRect()
        const wh = window.innerHeight
        const progress = (wh - rect.top) / (wh + rect.height)
        const clamped = Math.max(0, Math.min(1, progress))
        const yOffset = (clamped - 0.5) * speed * 400
        cardRef.current.style.transform = `translate3d(0, ${yOffset}px, 0)`
        ticking = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  const isOdd = index % 2 === 1

  return (
    <div
      ref={cardRef}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        height: 180,
        willChange: 'transform',
        marginTop: isOdd ? 24 : 0,
        boxShadow: '0 8px 30px -8px rgba(0,0,0,0.2)',
      }}
    >
      <img
        src={market.src}
        alt={market.name}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '10px 12px',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 5,
          }}
        >
          {market.name}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {market.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 7,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 100,
                padding: '2px 6px',
                whiteSpace: 'nowrap',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FloatingMarkets() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: isMobile ? 'auto' : '100vh',
          background: '#F8FAFC',
          overflow: 'hidden',
          padding: isMobile ? '60px 20px' : '0',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Desktop: floating parallax cards */}
        {!isMobile &&
          MARKETS.map((market, i) => (
            <FloatingCard
              key={market.name}
              market={market}
              config={CARD_CONFIGS[i]}
              sectionRef={sectionRef}
              index={i}
            />
          ))}

        {/* Center text */}
        <div
          style={{
            position: isMobile ? 'relative' : 'absolute',
            left: isMobile ? 'auto' : '50%',
            top: isMobile ? 'auto' : '50%',
            transform: isMobile ? 'none' : 'translate(-50%, -50%)',
            zIndex: 16,
            textAlign: 'center',
            maxWidth: isMobile ? '100%' : 'none',
            width: 'auto',
            padding: isMobile ? '0 0 32px' : '40px 60px',
            background: isMobile ? 'none' : 'radial-gradient(ellipse at center, rgba(248,250,252,0.95) 0%, rgba(248,250,252,0.8) 60%, transparent 80%)',
            borderRadius: 24,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? 11 : 14,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#2563EB',
              marginBottom: isMobile ? 12 : 20,
            }}
          >
            Industrial Versatility
          </div>
          <h2
            style={{
              fontSize: isMobile ? 32 : 64,
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#0A1628',
              letterSpacing: '-0.02em',
              margin: '0 auto 16px',
              textAlign: 'center',
            }}
          >
            {isMobile ? (
              <>Precision built for the global supply chain.</>
            ) : (
              <>
                <span style={{ whiteSpace: 'nowrap' }}>Precision built for the</span>
                <br />
                <span style={{ color: '#2563EB', whiteSpace: 'nowrap' }}>global supply chain.</span>
              </>
            )}
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: isMobile ? 14 : 15,
              lineHeight: 1.65,
              color: '#64748B',
              maxWidth: isMobile ? 400 : 560,
              margin: '0 auto',
            }}
          >
            Purpose-built AI for every link in the logistics chain. From port terminals to
            distribution centers, our computer vision platform learns the rhythms of your yard —
            reading container codes, tracking chassis, flagging damage, and feeding every movement
            into your existing systems. One platform, trained on the realities of global supply
            chain operations.
          </p>
        </div>

        {/* Mobile: 2-column staggered grid with parallax */}
        {isMobile && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
              width: '100%',
              maxWidth: 400,
            }}
          >
            {MARKETS.map((market, i) => (
              <MobileCard
                key={market.name}
                market={market}
                speed={MOBILE_SPEEDS[i]}
                sectionRef={sectionRef}
                index={i}
              />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
