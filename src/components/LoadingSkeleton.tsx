'use client';

import React from 'react';

interface SkeletonProps {
  type: 'image' | 'text' | 'title' | 'button' | 'avatar';
  className?: string;
}

export default function LoadingSkeleton({ type, className = '' }: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded";
  
  const skeletonTypes = {
    image: "w-full aspect-video",
    text: "h-4 w-full",
    title: "h-8 w-3/4",
    button: "h-10 w-32 rounded-full",
    avatar: "w-20 h-20 rounded-full"
  };

  return (
    <div 
      className={`${baseClasses} ${skeletonTypes[type]} ${className} transition-colors duration-200`}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
