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
          blue: "#0ea5e9",
          red: "#ef4444",
          dark: "#0f172a",
          gold: "#f6c343",
          goldSoft: "#ffe7a3",
          night: "#0b1222",
        },
      },
    },
  },
  plugins: [],
};
