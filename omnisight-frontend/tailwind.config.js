// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'omni-emerald': '#10B981', // Your luminous accent green
        'omni-dark': '#111827',     // Main background dark
        'omni-dark-card': '#1F2937', // Slightly lighter dark for components
      },
      backgroundSize: {
        "200": "200% 200%",
      },
      animation: {
        gradientMove: "gradientMove 4s ease infinite",
      },
      keyframes: {
        gradientMove: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
}