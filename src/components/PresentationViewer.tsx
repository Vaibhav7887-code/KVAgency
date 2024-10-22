'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface PresentationViewerProps {
  projectName: string;
  totalSlides: number;
  onClose: () => void;
}

const PresentationViewer: React.FC<PresentationViewerProps> = ({ projectName, totalSlides, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides, onClose]);

  useEffect(() => {
    const preloadImages = async () => {
      const imagesToLoad = [currentSlide, currentSlide + 1, currentSlide + 2].filter(slide => slide <= totalSlides);
      const newLoadedImages = [...loadedImages];

      for (const slide of imagesToLoad) {
        if (!newLoadedImages.includes(slide)) {
          await new Promise((resolve) => {
            const img = new window.Image();
            img.src = slidePath(slide);
            img.onload = () => {
              newLoadedImages.push(slide);
              resolve(null);
            };
            img.onerror = () => resolve(null);
          });
        }
      }

      setLoadedImages(newLoadedImages);
      setIsLoading(false);
    };

    preloadImages();
  }, [currentSlide, totalSlides, projectName, loadedImages]);

  const slidePath = (slideNumber: number) => 
    `/Projects/${projectName}/fe${slideNumber}.png`;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="text-white text-2xl">Loading presentation...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative w-full max-w-6xl" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-3xl p-2"
        >
          &times;
        </button>
        <div className="relative">
          <Image
            src={slidePath(currentSlide)}
            alt={`Slide ${currentSlide}`}
            width={2000}
            height={1125}
            layout="responsive"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 flex items-center justify-between">
            <div className="text-white">
              {currentSlide} / {totalSlides}
            </div>
            <div className="w-2/3 bg-gray-200 rounded-full h-2.5 ml-4">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide(prev => Math.max(prev - 1, 1));
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-black bg-opacity-50 p-2 rounded-full"
          disabled={currentSlide === 1}
        >
          &#8249;
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-black bg-opacity-50 p-2 rounded-full"
          disabled={currentSlide === totalSlides}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default PresentationViewer;
