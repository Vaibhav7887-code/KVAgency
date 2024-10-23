'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import LoadingSkeleton from './LoadingSkeleton';

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
  const [loadedIcons, setLoadedIcons] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);

  const handleIconLoad = (title: string) => {
    setLoadedIcons(prev => new Set(prev).add(title));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isVisible) return;

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
        prev.map((_, index) => {
          const delay = index * 0.1; // Add delay for sequential animation
          const adjustedProgress = Math.max(0, sectionProgress - delay);
          return Math.min(180, adjustedProgress * 180 * 1.5);
        })
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="py-20 bg-cover bg-center bg-no-repeat animate-fade-in dark:bg-dark-bg" 
      style={{ backgroundImage: "url('/Backgrounds/WhiteBG1.jpg')" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-dark-primary animate-slide-in">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`glassmorphism dark:bg-dark-surface/70 p-6 sm:p-8 h-[400px] relative animate-fade-in`}
              style={{
                perspective: '2000px',
                animationDelay: `${index * 100}ms`
              }}
            >
              <div
                className="w-full h-full relative"
                style={{
                  transform: `rotateY(${cardRotations[index]}deg)`,
                  transition: 'transform 0.5s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Blank front face */}
                <div 
                  className="absolute inset-0"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div className="flex flex-col items-center justify-between h-full p-6">
                    <LoadingSkeleton type="image" className="w-40 sm:w-48 h-[90px] sm:h-[108px] mb-4 loading-shimmer" />
                    <LoadingSkeleton type="title" className="w-3/4 mb-4 loading-shimmer" />
                    <LoadingSkeleton type="text" className="w-full mb-2 loading-shimmer" />
                    <LoadingSkeleton type="text" className="w-5/6 mb-4 loading-shimmer" />
                    <LoadingSkeleton type="button" className="loading-shimmer" />
                  </div>
                </div>

                {/* Content back face */}
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
                        className="mx-auto transition-transform duration-300 hover:scale-110 dark:brightness-90"
                        onLoadingComplete={() => handleIconLoad(service.title)}
                      />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800 dark:text-dark-primary">
                      {service.title}
                    </h3>
                    <p className="text-center text-gray-600 dark:text-dark-secondary text-sm sm:text-base">
                      {service.description}
                    </p>
                    <button className="mt-4 px-4 sm:px-6 py-2 border-2 border-orange-600 dark:border-orange-500 text-orange-600 dark:text-orange-500 rounded-full hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm sm:text-base hover-lift">
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
