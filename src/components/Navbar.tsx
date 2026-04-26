'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${sectionId}`);
    }
  }, [pathname, router]);
  return (
    <nav
      className={`fixed top-0 w-full z-[60] transition-all duration-300 ${scrolled ? 'bg-[#0F172A]/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        <a href="/" className="flex items-center gap-2 cursor-pointer z-10 group">
          <span className="logo-icon relative inline-block w-8 h-8 rounded-sm overflow-hidden">
            <img
              src="/GateIn_AI_Brand_Icon.png"
              alt="GateIn AI"
              className="block w-8 h-8"
            />
            <span aria-hidden="true" className="logo-icon-fill" />
          </span>

          <span className="text-xl font-bold tracking-tight text-white">
            GateIn AI
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {/* Home removed per client feedback Apr 26 2026 — logo serves as home link */}
          <a
            href="/#products"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors">

            Products
          </a>
          <a
            href="/#how-it-works"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors">

            How It Works
          </a>
          <a
            href="/#about"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors">

            About
          </a>
          {/* Hidden per client feedback Apr 26 2026
          <a
            href="/resources"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors">

            Resources
          </a>
          */}
        </div>

        <a href="/#contact" onClick={(e) => scrollToSection(e, 'contact')} className="cta-glow hidden md:inline-flex bg-[#2563EB] hover:bg-[#4A6BEE] text-white px-5 py-2.5 rounded-md text-sm font-bold cursor-pointer z-10">
          Request a Demo
        </a>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen &&
      <div className="md:hidden absolute top-full left-0 w-full bg-[#0F172A] border-b border-white/10 py-4 px-6 flex flex-col gap-4 shadow-xl">
          {/* Home removed per client feedback Apr 26 2026 — logo serves as home link */}
          <a
          href="/#products"
          className="text-base font-medium text-gray-300"
          onClick={() => setMobileMenuOpen(false)}>
            Products
          </a>
          <a
          href="/#how-it-works"
          className="text-base font-medium text-gray-300"
          onClick={() => setMobileMenuOpen(false)}>
            How It Works
          </a>
          <a
          href="/#about"
          className="text-base font-medium text-gray-300"
          onClick={() => setMobileMenuOpen(false)}>
            About
          </a>
          {/* Hidden per client feedback Apr 26 2026
          <a
          href="/resources"
          className="text-base font-medium text-gray-300"
          onClick={() => setMobileMenuOpen(false)}>
            Resources
          </a>
          */}
          <a href="/#contact" onClick={(e) => { scrollToSection(e, 'contact'); setMobileMenuOpen(false); }} className="cta-glow bg-[#2563EB] text-white px-5 py-3 rounded-md text-base font-bold w-full mt-2 block text-center">
            Request a Demo
          </a>
        </div>
      }
    </nav>);

}