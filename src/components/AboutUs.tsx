import React from 'react';

const milestones = [
  { year: '2018', event: 'Company Founded' },
  { year: '2019', event: 'First Major Client' },
  // Add more milestones
];

export default function AboutUs() {
  return (
    <section className="py-20 bg-gray-800">
      <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
      <div className="container mx-auto">
        {/* Interactive Timeline */}
        <div className="relative">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="mb-8 flex items-center justify-between w-full right-timeline"
            >
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">{milestone.year}</h1>
              </div>
              <div className="order-1 bg-gray-700 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <p className="mb-3 font-bold text-white text-xl">{milestone.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
