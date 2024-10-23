/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        glass: 'rgba(255, 255, 255, 0.1)',
        'dark-glass': 'rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      backgroundColor: {
        'dark-card': '#1a1a1a',
        'dark-hover': '#2a2a2a',
        'dark-bg': '#121212',
        'dark-surface': '#1e1e1e',
      },
      textColor: {
        'dark-primary': '#ffffff',
        'dark-secondary': '#a0a0a0',
        'dark-muted': '#6b7280',
      },
      borderColor: {
        'dark-border': '#333333',
      },
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
      },
      glassmorphism: {
        dark: {
          background: 'rgba(26, 26, 26, 0.7)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
  plugins: [],
};
