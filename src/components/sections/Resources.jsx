import React from 'react';
import { resourcesContent } from '../../content/resources';

const Resources = () => {
  return (
    <section id="resources" className="py-24 bg-[#FAFAFA] font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[#3A5FCD] font-bold tracking-[0.16em] text-[10px] uppercase mb-4">{resourcesContent.sectionTag}</p>
        <h2 className="text-[44px] lg:text-[56px] font-extrabold text-[#1a1a1a] tracking-tight leading-[1.05] mb-8">
          {resourcesContent.title.text} <span className="text-[#3A5FCD]">{resourcesContent.title.highlight}</span>
        </h2>
        
        {/* Placeholder for resources grid - waiting for visual design mockup */}
        <div className="bg-white border border-gray-100 shadow-sm border-dashed rounded-sm p-12 text-center mt-12 w-full max-w-[800px] mx-auto opacity-70">
           <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
           </svg>
           <h3 className="text-xl font-extrabold text-gray-500 mb-2">Resources/Case Studies Component</h3>
           <p className="text-gray-400 text-sm">Component is fully connected to <code className="text-xs bg-gray-100 px-1 py-0.5 rounded text-gray-500">src/content/resources.js</code>. Waiting on the design mockup step.</p>
        </div>
      </div>
    </section>
  );
};

export default Resources;
