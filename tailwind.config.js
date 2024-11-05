/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FE5454',
        secondary: '#60B3F5'
      },
      boxShadow: {
        'form': '1px 2px 8px 8px rgba(204, 204, 204, 0.2)',
      }

    },
  },
  plugins: [],
}