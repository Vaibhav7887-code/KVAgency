'use client';

import React, { useRef, useEffect } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxSection({ children, className = '' }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollProgress = (viewportHeight - rect.top) / viewportHeight;
      
      // Only apply effect when section is entering viewport
      if (scrollProgress > 0 && scrollProgress < 1) {
        // Start with section pushed down and scale slightly smaller
        const translateY = Math.max(0, 100 - (scrollProgress * 100));
        const scale = 0.95 + (scrollProgress * 0.05);
        const opacity = scrollProgress;
        
        requestAnimationFrame(() => {
          section.style.transform = `translateY(${translateY}px) scale(${scale})`;
          section.style.opacity = opacity.toString();
          section.style.zIndex = Math.floor(scrollProgress * 100).toString();
        });
      } else if (scrollProgress >= 1) {
        // When fully in view, reset to normal
        section.style.transform = 'translateY(0) scale(1)';
        section.style.opacity = '1';
      } else {
        // When out of view above, hide it
        section.style.opacity = '0';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className={`relative h-screen w-full flex items-center justify-center p-4 md:p-8 transition-all duration-300 ease-out ${className}`}
      style={{
        willChange: 'transform, opacity',
        transformOrigin: 'center bottom',
        minHeight: '100vh',
        height: 'auto'
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
