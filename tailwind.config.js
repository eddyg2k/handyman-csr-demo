/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#fbbf24",
          amber: "#f59e0b",
          sand: "#fef3c7",
          dark: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};
