/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {
    colors: {
      navy: { DEFAULT: '#0A1628', light: '#1A3A6B' },
      brand: { DEFAULT: '#3B82F6', dark: '#1D4ED8', pale: '#EFF6FF', soft: '#DBEAFE' },
      arc: { red: '#C0392B', green: '#2E7D32' }
    }
  }},
  plugins: [],
};
