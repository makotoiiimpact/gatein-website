import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { PainPoints } from '@/components/PainPoints'
import { DamageInspection } from '@/components/DamageInspection'
import { Products } from '@/components/Products'
import { HowItWorks } from '@/components/HowItWorks'
import { GateScanVisualization } from '@/components/GateScanVisualization'
import { DroneScanVisualization } from '@/components/DroneScanVisualization'
import { AllWeather } from '@/components/AllWeather'
import { CompetitiveEdge } from '@/components/CompetitiveEdge'
import { FloatingMarkets } from '@/components/FloatingMarkets'
import { Team } from '@/components/Team'
// Hidden per client feedback Apr 26 2026
// import { ResourcesPreview } from '@/components/ResourcesPreview'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] font-sans selection:bg-[#2563EB]/30">
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        {/* Bernardo round 2 feedback #1: surface solutions immediately
            after the challenges section. */}
        <Products />
        <GateScanVisualization />
        <DroneScanVisualization />
        <HowItWorks />
        <AllWeather />
        <DamageInspection />
        <CompetitiveEdge />
        <FloatingMarkets />
        <Team />
        {/* Hidden per client feedback Apr 26 2026 */}
        {/* <ResourcesPreview /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
