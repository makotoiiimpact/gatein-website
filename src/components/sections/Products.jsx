import React from 'react';
import { productsContent } from '../../content/products';
import { Play, Zap, ShieldCheck, TrendingUp, Settings, AlignEndVertical, Home, LayoutGrid, Database } from 'lucide-react';

const Products = () => {
  const { primary, secondary, sectionTag, title } = productsContent;

  return (
    <section id="products" className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-[#3A5FCD] font-bold tracking-[0.16em] text-[10px] uppercase mb-5">{sectionTag}</p>
          <div className="flex justify-between items-end gap-8">
            <h2 className="text-[44px] lg:text-[56px] font-extrabold text-[#1a1a1a] tracking-tight leading-[1.05] whitespace-pre-line">
              {title.text}{"\n"}<span className="text-[#1a1a1a]">{title.highlight}</span>
            </h2>
            <div className="flex-grow h-px bg-[#E5E7EB] mb-5 ml-4 hidden md:block"></div>
          </div>
        </div>

        {/* Primary Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-32">
          
          {/* Visual Left */}
          <div className="relative overflow-hidden group bg-gray-900 aspect-[16/10] w-full">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=2070&auto=format&fit=crop")' }}>
              <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply"></div>
            </div>
            
            <div className="absolute top-6 left-6 flex flex-col gap-1 z-10">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-brand-coral animate-pulse"></span>
                Live OCR Feed: Gate 04
              </div>
              <div className="text-brand-coral text-[22px] font-mono font-bold tracking-[0.15em]">TRKU 982341-0</div>
              <div className="text-gray-400 text-[9px] font-medium font-mono uppercase tracking-wider">CONFIDENCE: 99.9%</div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button className="w-[60px] h-[60px] rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                <Play className="w-6 h-6 ml-1" fill="currentColor" />
              </button>
            </div>
            
            <div className="absolute bottom-4 inset-x-0 text-center text-[10px] font-mono text-gray-400 tracking-[0.2em] z-10 uppercase">
              [VIDEO_SLOT] GATE-FLOW DEMO
            </div>
            
            {/* Scan line effect */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
               <div className="w-full h-[2px] bg-brand-coral opacity-50 shadow-[0_0_20px_rgba(255,127,110,1)] animate-pulse" style={{top: '55%', position: 'absolute'}}></div>
            </div>
          </div>

          {/* Copy Right */}
          <div className="flex flex-col justify-center h-full pt-2">
            <div className="flex items-center gap-4 mb-5">
              <h3 className="text-[28px] font-bold text-[#1a1a1a] tracking-tight">{primary.title}</h3>
              <span className="px-2.5 py-1 text-[8px] font-bold tracking-[0.1em] bg-[#E8EDFF] text-[#3A5FCD] rounded-sm uppercase">Flagship</span>
            </div>
            
            <p className="text-[#555962] text-[15px] mb-8 leading-[1.65] max-w-[95%]">
              {primary.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Spec 1 */}
              <div className="bg-[#F9FAFB] rounded-none p-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-[#3A5FCD] text-white rounded-full p-[4px]"><Zap className="w-[14px] h-[14px]" fill="currentColor" /></div>
                  <span className="font-bold text-[#1a1a1a] text-[14px] ml-1">&lt; 2 seconds</span>
                </div>
                <span className="text-[10px] text-[#555962] ml-[34px] leading-tight font-medium">per container processing</span>
              </div>
              {/* Spec 2 */}
              <div className="bg-[#F9FAFB] rounded-none p-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-[#B9442C]"><ShieldCheck className="w-[20px] h-[20px]" fill="currentColor" stroke="white" strokeWidth={1.5} /></div>
                  <span className="font-bold text-[#1a1a1a] text-[14px] ml-1">99.9%</span>
                </div>
                <span className="text-[10px] text-[#555962] ml-[34px] leading-tight font-medium">character accuracy</span>
              </div>
              {/* Spec 3 */}
              <div className="bg-[#F9FAFB] rounded-none p-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-[#D97706]"><TrendingUp className="w-[20px] h-[20px]" strokeWidth={2.5} /></div>
                  <span className="font-bold text-[#1a1a1a] text-[14px] ml-1">10 km/h</span>
                </div>
                <span className="text-[10px] text-[#555962] ml-[34px] leading-tight font-medium">pass-through speed</span>
              </div>
              {/* Spec 4 */}
              <div className="bg-[#F9FAFB] rounded-none p-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-[#3A5FCD]"><Settings className="w-[20px] h-[20px]" /></div>
                  <span className="font-bold text-[#1a1a1a] text-[14px] ml-1">100% Edge</span>
                </div>
                <span className="text-[10px] text-[#555962] ml-[34px] leading-tight font-medium">No cloud required</span>
              </div>
            </div>
            
            <div className="bg-[#F3F5F7] p-4 flex items-center gap-3 border-l-[3px] border-l-[#3A5FCD]">
              <AlignEndVertical className="w-4 h-4 text-gray-500 shrink-0" />
              <div className="flex gap-1.5 flex-wrap">
                 <span className="text-[11px] font-bold text-[#1a1a1a] tracking-wide">Plug and play:</span>
                 <span className="text-[11px] text-[#555962] tracking-wide">camera + industrial PC + optional Starlink</span>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Modules Section */}
        <h3 className="text-[22px] font-bold text-[#1a1a1a] mb-8">Intelligence Modules</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondary.map((product, i) => {
             let BadgeComponent = null;
             if(product.status === "coming-soon") {
                BadgeComponent = <span className="px-2 py-1 text-[8px] font-bold tracking-[0.1em] bg-[#E5E7EB] text-[#555962] uppercase">Coming Soon</span>
             } else if(product.status === "active") {
                BadgeComponent = <span className="px-2 py-1 text-[8px] font-bold tracking-[0.1em] bg-[#2153D8] text-white uppercase">Active</span>
             } else {
                BadgeComponent = <span className="px-2 py-1 text-[8px] font-bold tracking-[0.1em] bg-[#FBBF24] text-[#78350F] uppercase">In Development</span>
             }

             let IconComponent;
             let imageUrl;
             if(i===0) {
               IconComponent = <Home className="w-[22px] h-[22px] text-[#B9442C]" fill="currentColor" strokeWidth={1} />;
               imageUrl = "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop";
             }
             if(i===1) {
               IconComponent = <LayoutGrid className="w-[22px] h-[22px] text-[#3A5FCD]" fill="currentColor" strokeWidth={1} />;
               imageUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop";
             }
             if(i===2) {
               IconComponent = <Database className="w-[22px] h-[22px] text-[#D97706]" fill="currentColor" strokeWidth={1} />;
               imageUrl = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop";
             }

             return (
               <div key={product.id} className="bg-[#F9FAFB] p-8 pb-0 pt-10 rounded-sm flex flex-col h-[420px] overflow-hidden">
                 <div className="flex justify-between items-start mb-6 w-full">
                    <div className="p-0">{IconComponent}</div>
                    {BadgeComponent}
                 </div>
                 <h4 className="text-[18px] font-bold text-[#1a1a1a] mb-4">{product.title}</h4>
                 <p className="text-[13px] text-[#555962] mb-8 leading-[1.6] flex-grow pr-4">
                   {product.description}
                 </p>
                 
                 <div className="mt-auto h-[180px] w-[110%] -ml-[5%] bg-gray-200 relative shrink-0 grayscale opacity-80">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700" 
                         style={{ backgroundImage: `url("${imageUrl}")`, backgroundPosition: 'center top' }}>
                    </div>
                 </div>
               </div>
             );
          })}
        </div>

      </div>
    </section>
  );
};

export default Products;
