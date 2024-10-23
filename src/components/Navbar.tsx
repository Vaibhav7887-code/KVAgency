'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LoadingSkeleton from './LoadingSkeleton';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

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
    <header className="sticky top-0 left-0 right-0 z-[9999]">
      <div className="px-4 py-4">
        <nav className={`mx-auto max-w-7xl transition-all duration-300 rounded-full ${
          isScrolled 
            ? 'glassmorphism shadow-lg dark:bg-dark-surface/70' 
            : 'bg-white/50 dark:bg-dark-surface/50 backdrop-blur-sm'
        }`}>
          <div className="container mx-auto px-6 py-3 flex items-center justify-between">
            {/* Logo with loading skeleton */}
            <div className="flex items-center">
              {!isLogoLoaded && (
                <div className="w-[40px] h-[15px]">
                  <LoadingSkeleton type="image" className="rounded" />
                </div>
              )}
              <div className={!isLogoLoaded ? 'hidden' : ''}>
                <Image 
                  src="/Logo.png"  // Ensure this matches exactly with the file in public folder
                  alt="Logo" 
                  width={40} 
                  height={15} 
                  className="cursor-pointer dark:brightness-110"
                  onLoadingComplete={() => setIsLogoLoaded(true)}
                  onError={() => {
                    console.error('Logo failed to load');
                    // Show a fallback or retry loading
                  }}
                  priority  // Add priority to ensure immediate loading
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {['services', 'projects', 'industries', 'testimonials'].map((section) => (
                <button 
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-800 dark:text-dark-primary hover:text-orange-600 dark:hover:text-orange-500 transition-colors capitalize"
                >
                  {section}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-orange-600 dark:bg-orange-500 text-white px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg dark:hover:shadow-dark-lg transition-all duration-300 ease-out transform"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-orange-600 dark:bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:scale-105 hover:shadow-lg dark:hover:shadow-dark-lg transition-all duration-300"
              >
                Contact
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 dark:text-dark-primary focus:outline-none hover:text-orange-600 dark:hover:text-orange-500 transition-colors p-2"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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
              {['services', 'projects', 'industries', 'testimonials'].map((section) => (
                <button 
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-800 dark:text-dark-primary hover:text-orange-600 dark:hover:text-orange-500 transition-colors w-full text-center py-2 capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
