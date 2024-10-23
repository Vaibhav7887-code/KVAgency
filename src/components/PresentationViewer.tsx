'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const slidePath = useCallback((slideNumber: number) => 
    `/Projects/${projectName}/fe${slideNumber}.png`,
    [projectName]
  );

  // Handle orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    handleOrientationChange(); // Initial check

    return () => window.removeEventListener('orientationchange', handleOrientationChange);
  }, []);

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
  }, [currentSlide, totalSlides, slidePath, loadedImages]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="text-gray-800 text-xl sm:text-2xl animate-pulse">Loading presentation...</div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50" 
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-6xl px-4 ${orientation === 'landscape' ? 'rotate-90 scale-[85%]' : ''}`} 
        onClick={e => e.stopPropagation()}
      >
        {/* Close and Fullscreen buttons */}
        <div className="absolute -top-12 right-4 flex items-center space-x-4 z-10">
          <button 
            onClick={toggleFullscreen}
            className="text-gray-800 hover:text-gray-600 transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isFullscreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4m12 0h-4m4 12v4h-4M4 16v4h4" />
              )}
            </svg>
          </button>
          <button 
            onClick={onClose}
            className="text-gray-800 hover:text-gray-600 transition-colors text-3xl p-2"
          >
            &times;
          </button>
        </div>

        {/* Main content */}
        <div className="relative rounded-lg overflow-hidden shadow-xl">
          <Image
            src={slidePath(currentSlide)}
            alt={`Slide ${currentSlide}`}
            width={2000}
            height={1125}
            layout="responsive"
            className="bg-white"
          />
          
          {/* Progress bar and counter */}
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 flex items-center justify-between">
            <div className="text-gray-800 font-medium">
              {currentSlide} / {totalSlides}
            </div>
            <div className="w-2/3 bg-gray-200 rounded-full h-2.5 ml-4">
              <div 
                className="bg-orange-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(prev => Math.max(prev - 1, 1));
            }}
            className="text-gray-800 bg-white bg-opacity-90 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSlide === 1}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
            }}
            className="text-gray-800 bg-white bg-opacity-90 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSlide === totalSlides}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile orientation message */}
        {orientation === 'portrait' && (
          <div className="fixed bottom-4 left-4 right-4 md:hidden bg-orange-600 text-white p-4 rounded-lg text-center text-sm">
            Tip: Rotate your device horizontally for a better viewing experience
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentationViewer;
