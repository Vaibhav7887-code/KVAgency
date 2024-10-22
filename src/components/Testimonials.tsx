import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    client: 'John Doe',
    feedback: 'Great service!',
    image: '/placeholder-client1.jpg',
  },
  // Add more testimonials
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-800">
      <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="relative">
            <div className="glassmorphism p-8 transition transform hover:rotateY-180">
              <p>{testimonial.feedback}</p>
            </div>
            <div className="absolute inset-0 backface-hidden p-8 flex flex-col items-center justify-center glassmorphism">
              <Image 
                src={testimonial.image} 
                alt={testimonial.client} 
                width={96} 
                height={96} 
                className="rounded-full"
              />
              <h3 className="text-xl font-semibold mt-4">{testimonial.client}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
