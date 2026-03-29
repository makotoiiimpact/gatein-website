import React from 'react';
import { marketsContent } from '../../content/markets';
import { Archive, TrainFront, Warehouse, Globe } from 'lucide-react';

const getIconAndColor = (id) => {
  switch (id) {
    case 'depots': return { icon: <Archive className="w-6 h-6 text-white" />, bg: 'bg-[#436FE3]' };
    case 'intermodal': return { icon: <TrainFront className="w-6 h-6 text-white" strokeWidth={2} />, bg: 'bg-[#F97059]' };
    case 'warehouse': return { icon: <Warehouse className="w-6 h-6 text-white" strokeWidth={2.5}  />, bg: 'bg-[#A37315]' };
    case '3pl': return { icon: <Globe className="w-6 h-6 text-white" />, bg: 'bg-[#2153D8]' };
    default: return { icon: <Archive className="w-6 h-6 text-white" />, bg: 'bg-brand-blue' };
  }
};

const Markets = () => {
  return (
    <section 
      id="markets" 
      className="py-24 bg-[#F8F9FA] relative border-t border-gray-100 font-sans"
    >
      {/* Subtle Dotted Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40" 
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', 
          backgroundSize: '24px 24px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <p className="text-[#3A5FCD] font-bold tracking-[0.16em] text-[10px] uppercase mb-4">
            {marketsContent.sectionTag}
          </p>
          <h2 className="text-[44px] lg:text-[56px] font-extrabold text-[#1a1a1a] tracking-tight leading-[1.05]">
            {marketsContent.title.text} <span className="block">{marketsContent.title.highlight}</span>
          </h2>
          <div className="w-16 h-[5px] bg-[#3A5FCD] mt-8"></div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {marketsContent.cards.map(card => {
            const { icon, bg } = getIconAndColor(card.id);
            return (
              <div key={card.id} className="bg-white p-10 lg:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.03)] flex flex-col h-full border border-gray-50/50">
                <div className={`${bg} w-[52px] h-[52px] flex items-center justify-center mb-8`}>
                  {icon}
                </div>
                
                <h3 className="text-[24px] font-bold text-[#1a1a1a] mb-5 tracking-tight">{card.title}</h3>
                
                {/* Notice: If description text differs slightly from image, we use the text from marketsContent.js to obey 'import the data from...' rule */}
                <p className="text-[15px] text-[#555962] leading-[1.65] mb-10 flex-grow max-w-[95%]">
                  {card.description}
                </p>
                
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {card.benefits.map((benefit, i) => (
                    <span key={i} className="bg-[#F3F4F6] text-[#555962] text-[9.5px] font-bold uppercase tracking-[0.12em] px-3 py-1.5">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Markets;
