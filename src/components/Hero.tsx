'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

const logos = [
  '/logos/Algomage-Logo.png',
  '/logos/Axis-logo.png',
  '/logos/Bajaj-logo.png',
  '/logos/HDFC-logo.png',
  '/logos/IDFC-logo.png',
  '/logos/Nedbank-logo.png',
  '/logos/PDFTRON-logo.png',
  '/logos/Tata-logo.png',
  '/logos/Visa-logo.png',
];

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const resetScroll = () => {
      if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
        scrollElement.scrollLeft = 0;
      } else if (scrollElement.scrollLeft <= 0) {
        scrollElement.scrollLeft = scrollElement.scrollWidth / 2;
      }
    };

    const animateScroll = () => {
      scrollElement.scrollLeft += 1;
      resetScroll();
      requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(requestAnimationFrame(animateScroll));
  }, []);

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-900">
      <div className="relative z-10 text-center text-white p-4 max-w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 px-4">
          Welcome to your agency, Khubusu :D
        </h1>

        <button className="glassmorphism px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-semibold hover:brightness-125 transition transform hover:scale-105">
          Get Started
        </button>

        <div className="mt-12">
          <div className="w-64 h-64 bg-gray-700 mx-auto flex items-center justify-center">
            3D Animation Placeholder
          </div>
        </div>

        <div className="mt-12 overflow-hidden">
          <div ref={scrollRef} className="flex overflow-x-hidden" style={{ width: '100%' }}>
            <div className="flex logo-scroll">
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 w-24 sm:w-32 h-12 sm:h-16 mx-2">
                  <div className="relative w-full h-full">
                    <Image
                      src={logo}
                      alt={`Client ${index % logos.length + 1}`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
