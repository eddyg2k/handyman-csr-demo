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
          gold: "#ffd166",
          ember: "#c3870a",
          dark: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};
