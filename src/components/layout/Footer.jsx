import React from 'react';
import { footerContent } from '../../content/footer';

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white py-14 font-sans border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col md:flex-row justify-between items-center opacity-70 gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
               <img src="/assets/gatein-logo.png" alt="GateIn AI Logo" className="h-[22px] w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
               <div className="hidden md:block w-px h-6 bg-gray-600"></div>
               <img src="/assets/nvidia-banner.png" alt="NVIDIA Inception Program" className="h-[32px] w-auto rounded-sm invert opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-xs font-medium text-gray-400 select-none md:hidden lg:block hidden">© 2026 GateIn AI. All rights reserved.</div>
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8 text-[9.5px] uppercase tracking-widest font-bold">
               {footerContent.legalLinks?.map(link => (
                  <a key={link.id} href={link.href} className="hover:text-white text-gray-400 transition-colors">{link.label}</a>
               )) || <span>Footer imported from src/content/footer.js</span>}
            </div>
         </div>
      </div>
    </footer>
  );
};

export default Footer;
