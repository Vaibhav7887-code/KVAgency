'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from './Navbar';
import LoadingSkeleton from './LoadingSkeleton';

// Update paths to match your public directory structure
const logos = [
  { src: '/logos/algomage-logo.png', alt: 'Algomage' },
  { src: '/logos/axis-logo.png', alt: 'Axis' },
  { src: '/logos/bajaj-logo.png', alt: 'Bajaj' },
  { src: '/logos/hdfc-logo.png', alt: 'HDFC' },
  { src: '/logos/idfc-logo.png', alt: 'IDFC' },
  { src: '/logos/nedbank-logo.png', alt: 'Nedbank' },
  { src: '/logos/pdftron-logo.png', alt: 'PDFTron' },
  { src: '/logos/tata-logo.png', alt: 'Tata' },
  { src: '/logos/visa-logo.png', alt: 'Visa' },
];

export default function Hero() {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [loadedLogos, setLoadedLogos] = useState<Set<string>>(new Set());

  const handleHeroLoad = () => {
    setIsHeroLoaded(true);
  };

  const handleLogoLoad = (logoSrc: string) => {
    setLoadedLogos(prev => new Set(prev).add(logoSrc));
  };

  return (
    <>
      <Navbar />
      <section className="relative flex items-center min-h-[calc(100vh-88px)] bg-white dark:bg-dark-bg">
        <div className="relative z-10 text-gray-800 dark:text-dark-primary container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center px-4 md:px-6">
            {/* Left side - Text content */}
            <div className="max-w-2xl text-center md:text-left animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight">
                <span className="animate-slide-in inline-block">Brand.</span>
                <span className="text-orange-600 animate-slide-in inline-block delay-100">Design.</span>
                <span className="text-orange-600 animate-slide-in inline-block delay-200">Product.</span><br />
                <span className="animate-slide-in inline-block delay-300 dark:text-dark-primary">In-House Development</span><br />
                <span className="animate-slide-in inline-block delay-300 dark:text-dark-primary">Pitch Deck & More</span>
              </h1>

              <button className="px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold border-2 border-orange-600 text-orange-600 dark:text-orange-500 dark:border-orange-500 rounded-full hover:bg-orange-600 hover:text-white dark:hover:bg-orange-500 transition-all duration-300 mx-auto md:mx-0 animate-fade-in delay-300 hover-lift">
                Get Started
              </button>
            </div>

            {/* Right side - 3D Animation */}
            <div className="flex justify-center md:justify-end mt-6 md:mt-0 animate-scale-in delay-200">
              {!isHeroLoaded && (
                <div className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] aspect-square">
                  <LoadingSkeleton type="image" className="rounded-lg loading-shimmer" />
                </div>
              )}
              <div className={`w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] relative aspect-square ${!isHeroLoaded ? 'hidden' : ''}`}>
                <Image 
                  src="/Hero/3DHero.gif"
                  alt="3D Hero Animation"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg dark:brightness-90"
                  priority
                  onLoadingComplete={handleHeroLoad}
                />
              </div>
            </div>
          </div>

          {/* Updated Logo scroll section */}
          <div className="mt-12 md:mt-16 overflow-hidden px-4 animate-fade-in delay-300">
            <div className="logo-scroll-container">
              <div className="logo-scroll">
                {[...logos, ...logos].map((logo, index) => (
                  <div key={index} className="inline-block w-24 sm:w-32 md:w-40 mx-4 relative h-12">
                    {!loadedLogos.has(logo.src) && (
                      <LoadingSkeleton type="image" className="w-full h-full loading-shimmer" />
                    )}
                    <div className={`relative w-full h-full ${!loadedLogos.has(logo.src) ? 'hidden' : ''}`}>
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        layout="fill"
                        objectFit="contain"
                        className="dark:brightness-90 dark:contrast-125"
                        onLoadingComplete={() => handleLogoLoad(logo.src)}
                        onError={() => {
                          console.error(`Failed to load logo: ${logo.src}`);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
