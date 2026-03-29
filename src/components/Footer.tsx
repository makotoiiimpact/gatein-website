import React from 'react';
export function Footer() {
  return (
    <footer className="bg-[#1E293B] text-gray-400 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img
              src="/GateIn_AI_Brand_Icon.png"
              alt="GateIn AI"
              className="w-6 h-6 rounded-sm" />
            
            <span className="text-lg font-bold tracking-tight text-white">
              GateIn AI
            </span>
          </div>

          <div className="flex gap-8 text-sm">
            <a href="#products" className="hover:text-white transition-colors">
              Products
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
          </div>

          <div className="flex items-center gap-4">
            <img
              src="/nvidia-inception-program-badge-rgb-for-screen.png"
              alt="NVIDIA Inception Program"
              className="h-7 object-contain brightness-0 invert opacity-60" />
            
            <a href="#" className="hover:text-white transition-colors">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
                
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd" />
                
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} GateIn AI. All rights reserved.
        </div>
      </div>
    </footer>);

}