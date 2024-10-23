'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 100;
      const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: sectionPosition - navHeight,
        behavior: 'smooth'
      });
      setIsMenuOpen(false); // Close menu after clicking
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999]" style={{ position: 'sticky' }}>
      <div className="px-4 py-4">
        <nav className={`mx-auto max-w-7xl transition-all duration-300 rounded-full ${
          isScrolled ? 'glassmorphism shadow-lg' : 'bg-white bg-opacity-50 backdrop-blur-sm'
        }`}>
          <div className="container mx-auto px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={120} 
                height={40} 
                className="cursor-pointer"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-800 hover:text-orange-600 transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-gray-800 hover:text-orange-600 transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('industries')}
                className="text-gray-800 hover:text-orange-600 transition-colors"
              >
                Industries
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-800 hover:text-orange-600 transition-colors"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-orange-600 text-white px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out transform"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm"
              >
                Contact
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen 
                ? 'max-h-64 opacity-100 py-4' 
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="flex flex-col items-center space-y-4 px-6">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-800 hover:text-orange-600 transition-colors w-full text-center py-2"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-gray-800 hover:text-orange-600 transition-colors w-full text-center py-2"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('industries')}
                className="text-gray-800 hover:text-orange-600 transition-colors w-full text-center py-2"
              >
                Industries
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-800 hover:text-orange-600 transition-colors w-full text-center py-2"
              >
                Testimonials
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
