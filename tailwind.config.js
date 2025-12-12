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
          blue: "#f6c343",
          amber: "#facc15",
          gold: "#e0a100",
          dark: "#0f172a",
          sand: "#fef3c7",
        },
      },
    },
  },
  plugins: [],
};
