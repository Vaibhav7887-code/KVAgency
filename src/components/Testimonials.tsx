'use client';

import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    client: 'John Smith',
    role: 'CEO, TechCorp',
    feedback: 'The team delivered exceptional results. Their attention to detail and creative approach transformed our brand identity.',
    image: '/testimonials/client1.jpg',
  },
  {
    client: 'Sarah Johnson',
    role: 'Marketing Director, InnovateCo',
    feedback: 'Outstanding service! The motion graphics they created for our campaign exceeded our expectations.',
    image: '/testimonials/client2.jpg',
  },
  {
    client: 'Michael Chen',
    role: 'Product Manager, Futuretech',
    feedback: 'Their web development expertise helped us create a seamless user experience. Highly recommended!',
    image: '/testimonials/client3.jpg',
  },
  {
    client: 'Emma Davis',
    role: 'Creative Director, DesignHub',
    feedback: 'Incredible creativity and professionalism. They truly understand how to bring ideas to life.',
    image: '/testimonials/client4.jpg',
  },
  {
    client: 'Alex Thompson',
    role: 'Founder, StartupX',
    feedback: 'Working with them was a game-changer for our startup. Their designs perfectly captured our vision.',
    image: '/testimonials/client5.jpg',
  },
  {
    client: 'Lisa Wang',
    role: 'CMO, GlobalTech',
    feedback: "The team's innovative approach to motion graphics helped us stand out in a crowded market.",
    image: '/testimonials/client6.jpg',
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glassmorphism p-6 sm:p-8 transition-all duration-300 hover:shadow-xl group"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 relative mb-4 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.client} 
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">{testimonial.client}</h3>
                  <p className="text-sm text-gray-600 mb-4">{testimonial.role}</p>
                  <div className="relative">
                    <svg className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 w-8 h-8 text-orange-600 opacity-50" 
                         fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <p className="text-sm sm:text-base text-gray-700 italic px-6">
                      {testimonial.feedback}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
