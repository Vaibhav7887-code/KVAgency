'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const services = [
  {
    title: 'Graphic Design',
    description: 'We create visually stunning designs that captivate and communicate effectively.',
    icon: '/services/graphic-design/graphic-design-icon.png',
  },
  {
    title: 'Motion Graphics',
    description: 'Bringing designs to life with fluid animations and dynamic visual storytelling.',
    icon: '/services/motion-graphics/motion-graphics-icon.png',
  },
  {
    title: 'Web Development',
    description: 'Building responsive, user-friendly websites with cutting-edge technologies.',
    icon: '/services/web-dev/web-dev-icon.png',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [cardRotations, setCardRotations] = useState<number[]>(Array(services.length).fill(0));

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const startOffset = viewportHeight * 0.3;
      const endOffset = viewportHeight * 0.7;
      const totalDistance = endOffset - startOffset;
      
      const sectionProgress = Math.max(0, Math.min(1, 
        (viewportHeight - (rect.top + startOffset)) / totalDistance
      ));

      setCardRotations(prev => 
        prev.map(() => Math.min(180, sectionProgress * 180))
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/Backgrounds/WhiteBG1.jpg')" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="glassmorphism p-6 sm:p-8 h-[400px] relative"
              style={{
                perspective: '2000px'
              }}
            >
              <div
                className="w-full h-full relative"
                style={{
                  transform: `rotateY(${cardRotations[index]}deg)`,
                  transition: 'transform 0.3s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Blank front face (starts visible) */}
                <div 
                  className="absolute inset-0"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div className="flex flex-col items-center justify-between h-full p-6">
                    <div className="w-40 sm:w-48 h-[90px] sm:h-[108px] mb-4"></div>
                  </div>
                </div>

                {/* Content back face (starts hidden, rotated) */}
                <div 
                  className="absolute inset-0"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="flex flex-col items-center justify-between h-full p-6">
                    <div className="w-40 sm:w-48 h-[90px] sm:h-[108px] mb-4 relative">
                      <Image 
                        src={service.icon}
                        alt={service.title} 
                        layout="fill"
                        objectFit="contain"
                        className="mx-auto" 
                      />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">{service.title}</h3>
                    <p className="text-center text-gray-600 text-sm sm:text-base">
                      {service.description}
                    </p>
                    <button className="mt-4 px-4 sm:px-6 py-2 border-2 border-orange-600 text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm sm:text-base">
                      Explore More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
