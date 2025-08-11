/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: '#1a1a40', // Dark blue for background
        stardust: '#4b0082', // Purple accent
        nebula: '#ff00ff', // Pink for flair
      },
    },
  },
  plugins: [],
};