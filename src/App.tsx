import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PainPoints } from './components/PainPoints';
import { Container3D } from './components/Container3D';
import { Products } from './components/Products';
import { HowItWorks } from './components/HowItWorks';
import { AllWeather } from './components/AllWeather';
import { GateScanVisualization } from './components/GateScanVisualization';
import { DroneScanVisualization } from './components/DroneScanVisualization';
import { CompetitiveEdge } from './components/CompetitiveEdge';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
export function App() {
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
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>);

}