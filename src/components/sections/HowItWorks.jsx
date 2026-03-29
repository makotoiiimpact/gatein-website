import React from 'react';
import { howItWorksContent } from '../../content/howItWorks';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[#3A5FCD] font-bold tracking-[0.16em] text-[10px] uppercase mb-4">{howItWorksContent.sectionTag}</p>
        <h2 className="text-[44px] lg:text-[56px] font-extrabold text-[#1a1a1a] tracking-tight leading-[1.05] mb-8">
          {howItWorksContent.title.text} <span className="text-[#3A5FCD]">{howItWorksContent.title.highlight}</span>
        </h2>
        
        {/* Placeholder for steps - waiting for visual design mockup */}
        <div className="bg-gray-50 border border-gray-100 border-dashed rounded-sm p-12 text-center mt-12 w-full max-w-[800px] mx-auto opacity-70">
           <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
           </svg>
           <h3 className="text-xl font-extrabold text-gray-500 mb-2">How It Works Component</h3>
           <p className="text-gray-400 text-sm">Component is fully connected to <code className="text-xs bg-gray-200 px-1 py-0.5 rounded text-gray-500">src/content/howItWorks.js</code>. Waiting on the design mockup step.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
