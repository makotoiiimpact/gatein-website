import React from 'react';
import { heroContent, heroStats } from '../../content/hero';
import { ArrowRight, PlayCircle } from 'lucide-react';
import HeroVisual from './HeroVisual';

const Hero = () => {
  const variant = heroContent.variants[heroContent.activeVariant];
  const stats = heroStats.variants[heroStats.activeVariant];

  return (
    <section id="home" className="relative min-h-[100vh] lg:min-h-[900px] pt-36 pb-20 flex items-center bg-[#FAFAFA] font-sans overflow-hidden">
      
      {/* CSS Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0" 
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', 
          backgroundSize: '24px 24px'
        }}
      ></div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:w-6/12 flex flex-col justify-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#F3F4F6] rounded-full mb-10 w-max border border-gray-200/60 shadow-[0_1px_4px_rgba(0,0,0,0.03)] cursor-default">
               <div className="w-[18px] h-[18px] bg-[#111827] rounded flex items-center justify-center shadow-inner shrink-0">
                  <div className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full"></div>
               </div>
               <span className="font-bold text-[#111827] text-[9.5px] uppercase tracking-[0.16em]">{variant.badge.text}</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-[52px] lg:text-[76px] font-extrabold text-[#111827] leading-[1.0] tracking-[-0.03em] mb-7 max-w-[680px]">
              {variant.headline.lines[0].text.trim()}{" "}
              <span className="bg-[#F2CDCA] text-[#8A2E2B] px-2.5 py-0.5 rounded-sm inline-block transform -translate-y-1 ml-0.5 mr-1.5 shadow-sm leading-[1.0]">{variant.headline.lines[1].text}</span> 
              {variant.headline.lines[2].text.trim()} <span className="text-[#2956DB]">{variant.headline.secondLine[0].text}</span>
            </h1>
            
            <p className="text-[20px] text-[#4b5563] leading-[1.65] max-w-[620px] mb-14">
              {variant.subhead}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-16">
               <button className="bg-[#2956DB] hover:bg-[#254ab8] text-white text-[15px] font-bold py-4 px-8 rounded flex items-center justify-center shadow-[0_6px_20px_rgba(41,86,219,0.3)] transition-all">
                  Schedule a Demo <ArrowRight className="ml-3 w-[18px] h-[18px]" strokeWidth={2.5} />
               </button>
               <button className="bg-white hover:bg-gray-50 text-[#111827] border border-[#E5E7EB] text-[15px] font-bold py-4 px-8 rounded flex items-center justify-center shadow-sm transition-all">
                  See It In Action <PlayCircle className="ml-3 w-[20px] h-[20px]" fill="#111827" stroke="white" strokeWidth={1.5} />
               </button>
            </div>
            
            <div className="w-full h-px bg-gray-200 mb-10 max-w-[600px]"></div>

            {/* Stats Bar */}
            <div className="flex justify-between items-center max-w-[560px]">
               {stats.map((stat, i) => (
                 <div key={i} className="flex flex-col">
                   <span className="text-[34px] font-extrabold text-[#2956DB] tracking-tight leading-none mb-2">
                     {stat.prefix}{stat.display || stat.value}{stat.suffix}
                   </span>
                   <span className="text-[9.5px] font-bold text-[#111827] tracking-[0.16em] uppercase">
                     {stat.label}
                   </span>
                 </div>
               ))}
            </div>
          </div>

          {/* Right Column: Visual Slot */}
          <div className="lg:w-5/12 relative w-full shrink-0 xl:ml-auto">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
