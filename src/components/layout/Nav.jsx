import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { nav } from '../../content/nav';
import Button from '../ui/Button';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > nav.scrollThreshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href={nav.logo.href} className="flex items-center shrink-0 hover:opacity-80 transition-opacity">
              <img src="/assets/gatein-logo.png" alt="GateIn AI" className="h-[28px] w-auto" />
            </a>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-blue transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex">
            <Button variant="nav">{nav.cta.label}</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-4">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-medium text-gray-800 hover:text-brand-blue p-2 rounded-md hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" className="mt-2 w-full">{nav.cta.label}</Button>
        </div>
      )}
    </header>
  );
};

export default Nav;
