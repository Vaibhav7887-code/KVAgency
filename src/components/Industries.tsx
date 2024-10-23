'use client';

import React from 'react';
import Image from 'next/image';

const industries = [
  { 
    name: 'FinTech', 
    icon: '/industries/fintech-icon.svg',
    description: 'Innovative solutions for financial technology and digital banking.'
  },
  { 
    name: 'Healthcare', 
    icon: '/industries/healthcare-icon.svg',
    description: 'Digital transformation for modern healthcare services.'
  },
  { 
    name: 'E-commerce', 
    icon: '/industries/ecommerce-icon.svg',
    description: 'Cutting-edge platforms for online retail and marketplaces.'
  },
  { 
    name: 'Education', 
    icon: '/industries/education-icon.svg',
    description: 'Digital learning solutions and educational platforms.'
  },
  { 
    name: 'Real Estate', 
    icon: '/industries/realestate-icon.svg',
    description: 'Digital solutions for property management and real estate.'
  },
  { 
    name: 'Manufacturing', 
    icon: '/industries/manufacturing-icon.svg',
    description: 'Digital transformation for modern manufacturing.'
  },
  { 
    name: 'Entertainment', 
    icon: '/industries/entertainment-icon.svg',
    description: 'Creative solutions for media and entertainment.'
  },
  { 
    name: 'Automotive', 
    icon: '/industries/automotive-icon.svg',
    description: 'Digital innovation for the automotive industry.'
  },
  { 
    name: 'Travel & Tourism', 
    icon: '/industries/travel-icon.svg',
    description: 'Digital solutions for travel and hospitality.'
  }
];

export default function Industries() {
  return (
    <section id="industries" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Industries We Serve</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="glassmorphism p-6 sm:p-8 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 relative mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Image 
                      src={industry.icon} 
                      alt={industry.name} 
                      layout="fill"
                      objectFit="contain"
                      className="transition-all duration-300 group-hover:filter group-hover:brightness-110" 
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{industry.name}</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {industry.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-orange-600 hover:text-orange-700 text-sm font-semibold flex items-center">
                    Learn More
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
