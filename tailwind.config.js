/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        one: "url('/images/1.png')",
        two: "url('/images/2.png')",
        three: "url('/images/3.png')",
        four: "url('/images/4.png')",
        five: "url('/images/5.png')",
        six: "url('/images/6.png')",
      },
      colors: {
        // Light theme colors
        "light-primary": "#...",
        "light-secondary": "#...",
        // Dark theme colors
        "dark-primary": "#...",
        "dark-secondary": "#...",
      },
      boxShadow: {
        glow: "0 0 15px 5px rgba(66, 153, 225, 0.5)", // Custom glow effect
      },
    },
  },
  plugins: [],
};
