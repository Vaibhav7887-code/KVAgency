'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import LoadingSkeleton from './LoadingSkeleton';

export default function Footer() {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 100;
      const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: sectionPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            {!isLogoLoaded && (
              <div className="w-[40px] h-[15px]">
                <LoadingSkeleton type="image" className="rounded" />
              </div>
            )}
            <div className={!isLogoLoaded ? 'hidden' : ''}>
              <Image 
                src="/Logo.png"  // Ensure correct capitalization
                alt="Logo" 
                width={40} 
                height={15} 
                className="cursor-pointer"
                onLoadingComplete={() => setIsLogoLoaded(true)}
                onError={(e) => {
                  console.error('Logo failed to load in footer');
                  // Show a fallback or retry loading
                }}
                priority  // Add priority to ensure immediate loading
              />
            </div>
            <p className="text-gray-600 text-sm">
              Creating innovative digital solutions for businesses worldwide.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-gray-400 hover:text-orange-600 transition-colors p-2 hover:scale-110 transform duration-300"
                  aria-label={`Visit our ${social} page`}
                >
                  {/* Social icons remain the same */}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:ml-auto">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-3">
              {['services', 'projects', 'industries', 'testimonials'].map((section) => (
                <button 
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block text-gray-600 hover:text-orange-600 transition-colors hover:translate-x-1 transform duration-300"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                123 Business Street
              </p>
              <p>Mumbai, Maharashtra</p>
              <p>India</p>
              <p className="flex items-center mt-4">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                contact@kvagency.com
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +91 123 456 7890
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">Stay updated with our latest news and updates.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} KV Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
