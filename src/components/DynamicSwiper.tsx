'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Image from 'next/image';
import LoadingSkeleton from './LoadingSkeleton';

interface DynamicSwiperProps {
  images: string[];
  className?: string;
}

export default function DynamicSwiper({ images, className = '' }: DynamicSwiperProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => new Set(prev).add(imagePath));
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className={`w-full ${className}`}
      a11y={{
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="relative">
          {/* Skeleton loader */}
          {!loadedImages.has(image) && (
            <div className="relative aspect-video w-full">
              <LoadingSkeleton type="image" className="absolute inset-0 rounded-lg" />
            </div>
          )}
          
          {/* Image */}
          <div className={`relative aspect-video w-full ${!loadedImages.has(image) ? 'hidden' : ''}`}>
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg transition-opacity duration-300"
              onLoadingComplete={() => handleImageLoad(image)}
              priority={index === 0} // Prioritize loading of first image
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
