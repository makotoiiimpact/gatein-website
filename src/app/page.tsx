import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { PainPoints } from '@/components/PainPoints'
import { Container3D } from '@/components/Container3D'
import { Products } from '@/components/Products'
import { HowItWorks } from '@/components/HowItWorks'
import { GateScanVisualization } from '@/components/GateScanVisualization'
import { DroneScanVisualization } from '@/components/DroneScanVisualization'
import { AllWeather } from '@/components/AllWeather'
import { CompetitiveEdge } from '@/components/CompetitiveEdge'
import { FloatingMarkets } from '@/components/FloatingMarkets'
import { Team } from '@/components/Team'
import { ResourcesPreview } from '@/components/ResourcesPreview'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] font-sans selection:bg-[#5B7FFF]/30">
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Container3D />
        <Products />
        <HowItWorks />
        <GateScanVisualization />
        <DroneScanVisualization />
        <AllWeather />
        <CompetitiveEdge />
        <FloatingMarkets />
        <Team />
        <ResourcesPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
