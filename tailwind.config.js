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
        ink: {
          DEFAULT: '#0a0618', // page background
          900: '#0a0618',
          800: '#120a2a',
          700: '#1b1240',
          600: '#2a1f5c',
        },
        // Neon "prism" palette
        prism: {
          pink:   '#ff3d9a',
          violet: '#8b5cf6',
          blue:   '#3b82f6',
          cyan:   '#22d3ee',
          lime:   '#b8f53a',
          yellow: '#ffd23f',
          orange: '#ff8a3d',
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans:    ["var(--font-body)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          from: { backgroundPosition: '0% 50%' },
          to:   { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        marquee:     'marquee 40s linear infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        shimmer:     'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};
