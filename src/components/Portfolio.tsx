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
    <section className="py-20 bg-gray-900">
      <h2 className="text-4xl font-bold text-center mb-12">Our Work</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolios.map((portfolio, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => setSelectedProject(portfolio.title)}
          >
            <Image 
              src={portfolio.previewImage}
              alt={portfolio.title} 
              width={2000}
              height={1125}
              layout="responsive"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-2xl font-semibold text-white">{portfolio.title}</h3>
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
