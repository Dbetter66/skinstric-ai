// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Add your custom keyframes here
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-slower': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-slowest': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      // Add your custom animation utilities here
      animation: {
        'spin-slow': 'spin-slow 10s linear infinite',    // Adjust duration as needed
        'spin-slower': 'spin-slower 15s linear infinite', // Adjust duration as needed
        'spin-slowest': 'spin-slowest 20s linear infinite',// Adjust duration as needed
      },
    },
  },
  plugins: [],
}

