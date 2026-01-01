/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        concrete: '#9CA3AF',
        // We will add the Iron X colors here later
      }
    },
  },
  plugins: [],
}