/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50: '#faf6f1',
          100: '#f0e6d6',
          200: '#e2d0b5',
          300: '#d4b88e',
          400: '#c9a470',
        },
        leaf: {
          50: '#f0faf4',
          100: '#d1f0df',
          200: '#a3e1bf',
          300: '#6bc895',
          400: '#3baf6e',
          500: '#2d8a56',
          600: '#236e44',
        },
      },
    },
  },
  plugins: [],
}
