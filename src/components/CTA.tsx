'use client';

import React from 'react';

export default function CTA() {
  return (
    <section id="contact" className="py-20 bg-white relative">
      {/* Sticky CTA Button - Hidden on larger screens */}
      <div className="fixed bottom-8 right-4 sm:right-8 z-50 md:hidden">
        <button className="bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out transform">
          Contact Us
        </button>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Ready to Start?</h2>
        <div className="max-w-xl mx-auto">
          <form className="space-y-4 sm:space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 sm:py-4 glassmorphism focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800 rounded-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 sm:py-4 glassmorphism focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800 rounded-lg"
              />
              <textarea
                placeholder="Your Message"
                className="w-full px-4 py-3 sm:py-4 glassmorphism focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800 rounded-lg resize-none"
                rows={5}
              ></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button 
                type="submit" 
                className="w-full sm:w-2/3 px-6 py-3 sm:py-4 bg-orange-600 text-white font-semibold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out transform text-sm sm:text-base"
              >
                Send Message
              </button>
              <button 
                type="button"
                className="w-full sm:w-1/3 px-6 py-3 sm:py-4 border-2 border-orange-600 text-orange-600 font-semibold rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
              >
                Schedule Call
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              We'll get back to you within 24 hours
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
