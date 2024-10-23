'use client';

import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 animate-fade-in">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 text-center sm:text-left">
            <p>
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
              <a href="/privacy-policy" className="text-orange-600 hover:text-orange-700 underline">
                Learn more
              </a>
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-orange-600 text-white text-sm rounded-full hover:bg-orange-700 transition-colors hover:scale-105 transform duration-300"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
