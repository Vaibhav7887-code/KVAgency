'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface PresentationViewerProps {
  projectName: string;
  totalSlides: number;
  slides: string[];
  onClose: () => void;
}

const PresentationViewer: React.FC<PresentationViewerProps> = ({ 
  projectName, 
  totalSlides, 
  slides,
  onClose 
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  // Add handleClose function
  const handleClose = () => {
    onClose();
  };

  const changeSlide = useCallback((direction: 'next' | 'prev') => {
    if (direction === 'next' && currentSlide < totalSlides) {
      setCurrentSlide(prev => prev + 1);
    } else if (direction === 'prev' && currentSlide > 1) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide, totalSlides]);

  // Handle window resize and orientation
  useEffect(() => {
    const updateDimensions = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setOrientation(isPortrait ? 'portrait' : 'landscape');
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Initial calculation

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle keyboard navigation and fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        changeSlide('next');
      } else if (e.key === 'ArrowLeft') {
        changeSlide('prev');
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides, onClose, isFullscreen, changeSlide]);

  // Handle image preloading
  useEffect(() => {
    const preloadImages = async () => {
      if (!slides || !totalSlides) return;
      
      const imagesToLoad = [currentSlide, currentSlide + 1, currentSlide + 2].filter(slide => slide <= totalSlides);
      
      for (const slide of imagesToLoad) {
        if (!loadedImages.includes(slide)) {
          await new Promise((resolve) => {
            const img = new window.Image();
            img.src = slides[slide - 1];
            img.onload = () => {
              setLoadedImages(prev => [...prev, slide]);
              resolve(null);
            };
            img.onerror = () => resolve(null);
          });
        }
      }
    };

    preloadImages();
  }, [currentSlide, totalSlides, slides, loadedImages]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-white dark:bg-dark-bg flex items-center justify-center z-50 transition-all duration-300"
      onClick={handleClose}
      aria-label={`Presentation viewer for ${projectName}`}
    >
      <div 
        className="relative w-full h-full flex flex-col justify-center items-center"
        onClick={e => e.stopPropagation()}
      >
        {/* Main content container with proper ordering */}
        <div className="relative w-full max-w-7xl px-4 flex flex-col">
          {/* Image container */}
          <div className="relative w-full bg-white dark:bg-dark-surface rounded-lg shadow-xl overflow-hidden">
            <div className="relative aspect-[16/9]" style={{ position: 'relative' }}>
              <Image
                src={slides[currentSlide - 1]}
                alt={`Slide ${currentSlide}`}
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
                priority
                className="transition-opacity duration-300 dark:brightness-90"
              />

              {/* Navigation buttons - positioned absolutely within image container */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    changeSlide('prev');
                  }}
                  className="text-gray-800 dark:text-dark-primary bg-white dark:bg-dark-surface bg-opacity-90 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110"
                  disabled={currentSlide === 1}
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    changeSlide('next');
                  }}
                  className="text-gray-800 dark:text-dark-primary bg-white dark:bg-dark-surface bg-opacity-90 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110"
                  disabled={currentSlide === totalSlides}
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress bar and counter - below image */}
            <div className="relative bg-white dark:bg-dark-surface bg-opacity-90 p-4 flex items-center justify-between">
              <div className="text-gray-800 dark:text-dark-primary font-medium">
                {currentSlide} / {totalSlides}
              </div>
              <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 ml-4">
                <div 
                  className="bg-orange-600 dark:bg-orange-500 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mobile orientation message - at the bottom */}
          {orientation === 'portrait' && window.innerWidth <= 768 && (
            <div className="mt-4 bg-orange-600 dark:bg-orange-500 text-white p-4 rounded-lg text-center text-sm">
              Tip: Rotate your device horizontally for a better viewing experience
            </div>
          )}
        </div>

        {/* Close button - positioned absolutely at top-right */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 bg-white dark:bg-dark-surface rounded-full shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PresentationViewer;
