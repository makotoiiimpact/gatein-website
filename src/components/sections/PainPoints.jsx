import React from 'react';
import { painPointsContent } from '../../content/painPoints';
import { Truck, Activity, Banknote, ArrowRight } from 'lucide-react';

const getIcon = (iconName) => {
  if (iconName === 'clock') return <Truck className="w-5 h-5 text-brand-blue" />;
  if (iconName === 'alert-triangle') return <Activity className="w-5 h-5 text-brand-blue" />;
  if (iconName === 'dollar-sign') return <Banknote className="w-5 h-5 text-brand-blue" />;
  return <Truck className="w-5 h-5 text-brand-blue" />;
};

const PainPoints = () => {
  return (
    <section id="problem" className="py-24 bg-[#F9FAFB] border-t border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section aligned to left */}
        <div className="max-w-3xl mb-16">
          <p className="text-brand-blue font-bold tracking-[0.15em] text-[10px] uppercase mb-5">{painPointsContent.sectionTag}</p>
          <h2 className="text-[44px] lg:text-[56px] font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-8">
            {painPointsContent.title.text} <span className="text-slate-500">{painPointsContent.title.highlight}</span>
          </h2>
          <p className="text-[19px] text-gray-500 leading-relaxed max-w-lg mb-4">
            {painPointsContent.variants[painPointsContent.activeVariant].subtitle}
          </p>
        </div>
        
        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPointsContent.cards.map(card => (
            <div key={card.id} className="bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300 p-10 flex flex-col font-sans">
              
              <div className="mb-8 bg-brand-blue-light/60 w-11 h-11 flex items-center justify-center rounded-sm">
                {getIcon(card.icon)}
              </div>
              
              <h3 className="text-[19px] font-bold text-gray-900 mb-4 tracking-tight">{card.title}</h3>
              
              <p className="text-[14px] text-gray-500 mb-10 flex-grow leading-[1.6] max-w-[95%]">
                {card.description}
              </p>
              
              <div className="pt-6 border-t border-gray-100 mt-auto">
                <div className="text-[10px] font-bold text-[#b84838] uppercase tracking-[0.12em] mb-2">
                  {card.id === 'manual-gates' ? 'Impact' : card.id === 'error-rates' ? 'Frequency' : 'Financial Penalty'}
                </div>
                <div className="text-[23px] font-extrabold text-[#b84838] leading-tight tracking-tight">
                  {card.stat.value} {card.stat.label}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Divider with text */}
        <div className="relative mt-20 mb-20 md:mt-32 md:mb-24">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-end">
            <span className="bg-[#F9FAFB] pl-4 text-[9px] font-bold text-gray-400 uppercase tracking-[0.22em]">
              Industrial Precision Architecture
            </span>
          </div>
        </div>

        {/* Stop the Bleeding CTA section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pb-12">
          <div className="relative aspect-[16/10] w-full overflow-hidden shadow-2xl bg-gray-900 border-[8px] border-white grayscale">
             <div className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-90" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=1200&auto=format&fit=crop")' }}></div>
          </div>
          <div className="flex flex-col justify-center max-w-[450px]">
             <h2 className="text-[32px] font-extrabold text-gray-900 mb-6 tracking-tight">Stop the bleeding.</h2>
             <p className="text-gray-500 text-[16px] leading-[1.7] mb-8">
               Physical AI integrates directly with your existing gate infrastructure to automate data capture with 99.9% accuracy, transforming a logistical liability into a competitive engine.
             </p>
             <a href="#products" className="text-brand-blue font-bold flex items-center hover:text-brand-blue-dark transition-colors text-[14px]">
               See how Yard OCR works <ArrowRight className="ml-1.5 w-4 h-4" />
             </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PainPoints;
