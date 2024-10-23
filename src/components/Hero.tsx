'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from './Navbar';

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
  return (
    <>
      <Navbar />
      <section className="relative flex items-center min-h-screen bg-white -mt-[88px]">
        <div className="relative z-10 text-left text-gray-800 container mx-auto pt-[88px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
            {/* Left side - Text content */}
            <div className="max-w-3xl text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight">
                Brand.<span className="text-orange-600">Design</span>.<span className="text-orange-600">Product</span>.<br />
                In-House Development<br />
                Pitch Deck & More
              </h1>

              <button className="px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-semibold border-2 border-orange-600 text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 mx-auto md:mx-0">
                Get Started
              </button>
            </div>

            {/* Right side - 3D Animation */}
            <div className="flex justify-center md:justify-end mt-8 md:mt-0">
              <div className="w-full max-w-[300px] md:w-96 md:h-96 relative aspect-square">
                <Image 
                  src="/Hero/3DHero.gif"
                  alt="3D Hero Animation"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Logo scroll at the bottom */}
          <div className="mt-16 overflow-hidden px-4">
            <div className="logo-scroll-container">
              <div className="logo-scroll">
                {[...logos, ...logos].map((logo, index) => (
                  <div key={index} className="inline-block w-20 sm:w-24 md:w-32 h-10 sm:h-12 md:h-16 mx-2">
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
    </>
  );
}
