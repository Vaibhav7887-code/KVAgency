'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PresentationViewer from './PresentationViewer';
import LoadingSkeleton from './LoadingSkeleton';

// Update the portfolios data
const portfolios = [
  {
    title: 'Fleetedge',
    previewImage: '/Projects/Fleetedge/fe1.png',
    totalSlides: 21,
    slides: Array.from({ length: 21 }, (_, i) => `/Projects/Fleetedge/fe${i + 1}.png`),
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('projects');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (title: string) => {
    setLoadedImages(prev => new Set(prev).add(title));
  };

  // Add error handling for preview image
  const handleImageError = (title: string) => {
    console.error(`Failed to load preview image for ${title}`);
    setImageError(prev => new Set(prev).add(title));
  };

  return (
    <section id="projects" className="py-20">
      <h2 className="text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800 px-4 animate-fade-in">Projects</h2>
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {portfolios.map((portfolio, index) => (
          <div 
            key={index} 
            className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer group animate-fade-in hover-scale ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              transitionDelay: `${index * 100}ms`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
            }}
            onClick={() => setSelectedProject(portfolio.title)}
          >
            {/* Skeleton loader */}
            {!loadedImages.has(portfolio.title) && (
              <div className="relative aspect-video">
                <LoadingSkeleton type="image" className="loading-shimmer" />
              </div>
            )}
            
            {/* Image Container with aspect ratio */}
            <div className={`relative aspect-video ${!loadedImages.has(portfolio.title) ? 'hidden' : ''}`}>
              {!imageError.has(portfolio.title) && (
                <Image 
                  src={portfolio.previewImage}
                  alt={portfolio.title} 
                  layout="fill"
                  objectFit="cover"
                  priority={true}  // Force immediate loading
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="transition-transform duration-500 group-hover:scale-110"
                  onLoadingComplete={() => handleImageLoad(portfolio.title)}
                  onError={() => handleImageError(portfolio.title)}
                />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {portfolio.title}
                    </h3>
                    <span className="inline-block px-4 py-2 bg-orange-600 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 hover:bg-orange-700 transform hover:scale-105 transition-transform">
                      View Project
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProject && (
        <PresentationViewer
          projectName={selectedProject}
          totalSlides={portfolios.find(p => p.title === selectedProject)?.totalSlides || 0}
          slides={portfolios.find(p => p.title === selectedProject)?.slides || []}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
