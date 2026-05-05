/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: "#C8A96E", light: "#E2CB9B", dark: "#9A7A43" },
        surface: { DEFAULT: "#0E0E0E", raised: "#141414", card: "#1A1A1A" },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        bodoni: ['"Bodoni Moda"', "serif"],
      },
    },
  },
  plugins: [],
};
