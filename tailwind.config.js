// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // paper:   "#f9f2e7",
        teal:    "#2ba99a",
        magenta: "#e24084",
        mustard: "#f2bc57",
        lime:    "#a6d552",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["JetBrains Mono", "Monaco", "Consolas", "monospace"],
        sketch: ["var(--font-patrick)", "Patrick Hand", "cursive"],
      },
    },
  },
  plugins: [],
};
