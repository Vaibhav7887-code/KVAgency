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
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [viewerDimensions, setViewerDimensions] = useState({ width: 0, height: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const [slideTransition, setSlideTransition] = useState<'next' | 'prev' | null>(null);
  const [failedSlides, setFailedSlides] = useState<Set<number>>(new Set());

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Match duration with CSS transition
  };

  const changeSlide = (direction: 'next' | 'prev') => {
    setSlideTransition(direction);
    setCurrentSlide(prev => {
      if (direction === 'next') return Math.min(prev + 1, totalSlides);
      return Math.max(prev - 1, 1);
    });
    setTimeout(() => setSlideTransition(null), 300);
  };

  // Handle window resize and orientation
  useEffect(() => {
    const updateDimensions = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setOrientation(isPortrait ? 'portrait' : 'landscape');

      // Calculate viewer dimensions based on screen size and orientation
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const aspectRatio = 16/9; // Assuming slides are 16:9

      if (isPortrait) {
        const width = screenWidth * 0.9;
        setViewerDimensions({
          width,
          height: width / aspectRatio
        });
      } else {
        const height = screenHeight * 0.8;
        setViewerDimensions({
          width: height * aspectRatio,
          height
        });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Initial calculation

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0 && currentSlide < totalSlides) {
        setCurrentSlide(prev => prev + 1);
      } else if (diff < 0 && currentSlide > 1) {
        setCurrentSlide(prev => prev - 1);
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  // Handle keyboard navigation and fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 1));
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
  }, [totalSlides, onClose, isFullscreen]);

  // Handle image preloading
  useEffect(() => {
    const preloadImages = async () => {
      if (!slides || !totalSlides) return; // Add guard clause
      
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
      setIsLoading(false);
    };

    preloadImages();
  }, [currentSlide, totalSlides, slides]); // Remove loadedImages from dependencies

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Also, let's add error handling for image loading
  const handleImageError = (slideNumber: number) => {
    console.error(`Failed to load slide ${slideNumber} for ${projectName}`);
    setFailedSlides(prev => new Set(prev).add(slideNumber));
  };

  return (
    <div 
      className="fixed inset-0 bg-white dark:bg-dark-bg flex items-center justify-center z-50 transition-all duration-300"
      onClick={handleClose}
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
                onLoad={() => setIsLoading(false)}
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
