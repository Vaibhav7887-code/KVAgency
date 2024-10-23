'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PresentationViewer from './PresentationViewer';

const portfolios = [
  {
    title: 'Fleetedge',
    previewImage: '/Projects/Fleetedge/fe1.png',
    totalSlides: 21,
  },
  // Add more portfolio items as needed
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20">
      <h2 className="text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800 px-4">Projects</h2>
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {portfolios.map((portfolio, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
            onClick={() => setSelectedProject(portfolio.title)}
          >
            {/* Image Container with aspect ratio */}
            <div className="relative aspect-video">
              <Image 
                src={portfolio.previewImage}
                alt={portfolio.title} 
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center p-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{portfolio.title}</h3>
                  <span className="inline-block px-4 py-2 bg-orange-600 text-white text-sm rounded-full">
                    View Project
                  </span>
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
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
