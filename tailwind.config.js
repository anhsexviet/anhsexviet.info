/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // ✅ App Router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Roboto',           // Dùng chính cho body, description, tag
          'Open Sans',        // fallback
          'Montserrat',       // cho heading, dùng luôn fallback nếu chưa dùng class riêng
          'Arial',
          'Helvetica Neue',
          'sans-serif',
        ],
        heading: [
          'Montserrat',
          'Roboto',
          'Open Sans',
          'Arial',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
