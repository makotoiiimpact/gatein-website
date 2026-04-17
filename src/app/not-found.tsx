import Link from 'next/link'

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF6B6B]/30 bg-[#FF6B6B]/10 text-[#FF6B6B] font-mono text-[11px] uppercase tracking-[0.18em] mb-6">
          Error · 404
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5">
          This container took a wrong turn at the gate.
        </h1>
        <p className="text-white/60 text-lg leading-relaxed mb-10">
          The page you&apos;re looking for isn&apos;t in our yard system. It may have been moved,
          renamed, or never existed in the first place.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="cta-glow bg-[#2563EB] hover:bg-[#4A6BEE] text-white px-8 py-4 rounded-md text-lg font-bold inline-block"
          >
            Back to homepage
          </Link>
          <a
            href="mailto:hello@gatein.ai"
            className="text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            Or email hello@gatein.ai
          </a>
        </div>
      </div>
    </main>
  )
}
