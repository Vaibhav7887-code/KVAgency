'use client';

import React, { useRef, useEffect, useState } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxSection({ children, className = '' }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    const handleScroll = () => {
      if (!isVisible) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollProgress = (viewportHeight - rect.top) / viewportHeight;
      
      if (scrollProgress > 0 && scrollProgress < 1) {
        const translateY = Math.max(0, 100 - (scrollProgress * 100));
        const scale = 0.95 + (scrollProgress * 0.05);
        const opacity = scrollProgress;
        
        requestAnimationFrame(() => {
          section.style.transform = `translateY(${translateY}px) scale(${scale})`;
          section.style.opacity = opacity.toString();
          section.style.zIndex = Math.floor(scrollProgress * 100).toString();
        });
      } else if (scrollProgress >= 1) {
        section.style.transform = 'translateY(0) scale(1)';
        section.style.opacity = '1';
      } else {
        section.style.opacity = '0';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isVisible]);

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
        {isLoading ? (
          <div className="space-y-4">
            <LoadingSkeleton type="title" className="w-3/4 mx-auto" />
            <LoadingSkeleton type="text" className="w-full" />
            <LoadingSkeleton type="text" className="w-5/6 mx-auto" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
