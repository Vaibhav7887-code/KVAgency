import React from 'react';
import Image from 'next/image';

const industries = [
  { name: 'FinTech', icon: '/placeholder-industry1.svg' },
  // Add more industries
];

export default function Industries() {
  return (
    <section className="py-20 bg-gray-900">
      <h2 className="text-4xl font-bold text-center mb-12">Industries We Serve</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {industries.map((industry, index) => (
          <div
            key={index}
            className="glassmorphism p-8 hover:transform hover:scale-105 transition cursor-pointer"
          >
            <Image 
              src={industry.icon} 
              alt={industry.name} 
              width={48} 
              height={48} 
              className="h-12 mb-4" 
            />
            <h3 className="text-2xl font-semibold">{industry.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
