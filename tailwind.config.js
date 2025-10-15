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
        // Coldplay-inspired multi-color palette
        vibrant: {
          pink: '#ff6b9d',
          purple: '#c44569',
          blue: '#4dabf7',
          cyan: '#22d3ee',
          green: '#51cf66',
          yellow: '#ffd43b',
          orange: '#ff922b',
          red: '#ff6b6b',
        },
        gradient: {
          sunset: '#ff6b9d, #c44569, #4dabf7',
          ocean: '#22d3ee, #4dabf7, #51cf66',
          fire: '#ff922b, #ff6b6b, #ff6b9d',
          forest: '#51cf66, #22d3ee, #4dabf7',
          rainbow: '#ff6b9d, #c44569, #4dabf7, #22d3ee, #51cf66, #ffd43b',
        },
        // Legacy colors for backward compatibility
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
