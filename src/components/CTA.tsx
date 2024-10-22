import React from 'react';

export default function CTA() {
  return (
    <section className="py-20 bg-gray-900 relative">
      {/* Sticky CTA Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="glassmorphism px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold animate-pulse">
          Contact Us
        </button>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Ready to Start?</h2>
      {/* Interactive Form */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <form className="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-4 p-3 sm:p-4 glassmorphism focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full mb-4 p-4 glassmorphism focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            className="w-full mb-4 p-4 glassmorphism focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          ></textarea>
          <button type="submit" className="w-full px-6 py-3 sm:py-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
