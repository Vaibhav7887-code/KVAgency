'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const services = [
  {
    title: 'Graphic Design',
    description: 'We create visually stunning designs that captivate and communicate effectively.',
    icon: '/services/graphic-design/graphic-design-icon.png',
    gif: '/services/graphic-design/graphic-design.gif',
  },
  {
    title: 'Motion Graphics',
    description: 'Bringing designs to life with fluid animations and dynamic visual storytelling.',
    icon: '/services/motion-graphics/motion-graphics-icon.png',
    gif: '/services/motion-graphics/motion-graphics.gif',
  },
  {
    title: 'Web Development',
    description: 'Building responsive, user-friendly websites with cutting-edge technologies.',
    icon: '/services/web-dev/web-dev-icon.png',
    gif: '/services/web-dev/web-dev.gif',
  },
  // Add more services as needed
];

export default function Services() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section className="py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/Backgrounds/BlackBG1.jpg')" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="glassmorphism p-6 sm:p-8 h-[400px] transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="transition-all duration-300 flex flex-col items-center">
                <div className="w-40 sm:w-48 h-[90px] sm:h-[108px] mb-4 relative perspective-1000">
                  <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${hoveredService === index ? 'rotate-y-180' : ''}`}>
                    <div className="absolute w-full h-full backface-hidden">
                      <Image 
                        src={service.icon}
                        alt={service.title} 
                        layout="fill"
                        objectFit="contain"
                        className="mx-auto" 
                      />
                    </div>
                    <div className="absolute w-full h-full backface-hidden rotate-y-180">
                      <Image 
                        src={service.gif}
                        alt={`${service.title} animation`} 
                        layout="fill"
                        objectFit="contain"
                        className="mx-auto" 
                      />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">{service.title}</h3>
                <p className={`text-center transition-opacity duration-300 text-white text-sm sm:text-base ${hoveredService === index ? 'opacity-100' : 'opacity-0'}`}>
                  {service.description}
                </p>
              </div>
              <button className="mt-4 px-4 sm:px-6 py-2 glassmorphism text-white rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20 text-sm sm:text-base">
                Explore More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
