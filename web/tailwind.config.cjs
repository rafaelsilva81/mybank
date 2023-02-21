/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        greek: ["Caesar Dressing", "cursive"],
      },
    
    },
    fontFamily: {
      sans: ["Alegreya Sans", "sans-serif"],
    },
  },
  plugins: [],
};
