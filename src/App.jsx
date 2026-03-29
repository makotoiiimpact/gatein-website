import React from 'react';
import Nav from './components/layout/Nav';
import Hero from './components/hero/Hero';
import PainPoints from './components/sections/PainPoints';
import Markets from './components/sections/Markets';
import Products from './components/sections/Products';
import HowItWorks from './components/sections/HowItWorks';
import About from './components/sections/about';
import Resources from './components/sections/Resources';
import Contact from './components/sections/contact';
import Footer from './components/layout/Footer';
import ScrollFadeIn from './components/ui/ScrollFadeIn';
import './App.css';

function App() {
  return (
    <div className="min-h-screen font-sans text-gray-800 bg-[#FDFDFD]">
      <Nav />
      <main className="overflow-x-hidden">
        {/* Use delay 0 on Hero since it's above the fold */}
        <ScrollFadeIn delay={0}>
          <Hero />
        </ScrollFadeIn>
        
        <ScrollFadeIn>
          <PainPoints />
        </ScrollFadeIn>
        
        <ScrollFadeIn>
          <Markets />
        </ScrollFadeIn>
        
        <ScrollFadeIn>
           <Products />
        </ScrollFadeIn>
        
        <ScrollFadeIn>
           <HowItWorks />
        </ScrollFadeIn>
        
        <ScrollFadeIn>
           <About />
        </ScrollFadeIn>
        
        <ScrollFadeIn>
           <Resources />
        </ScrollFadeIn>
        
        <ScrollFadeIn>
           <Contact />
        </ScrollFadeIn>
      </main>
      <Footer />
    </div>
  );
}

export default App;
