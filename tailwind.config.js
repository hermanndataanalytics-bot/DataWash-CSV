/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ny SaaSMetricsDashboard.jsx dia tokony ho ao anaty src/
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Ampiasaina ny font Inter
      },
    },
  },
  plugins: [],
}