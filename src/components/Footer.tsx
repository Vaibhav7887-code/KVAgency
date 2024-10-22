import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 bg-gray-800 glassmorphism">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My Agency. All rights reserved.</p>
      </div>
    </footer>
  );
}
