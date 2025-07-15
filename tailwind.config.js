// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      transitionProperty: {
        'spacing': 'margin, padding',
        'width-scale': 'width, transform', // For effects where both width and scale change
      },
      transitionDuration: {
        'extra-slow': '1500ms', // Custom longer transition
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Custom timing function
      },
      // Add your custom keyframes here
      keyframes: {
        'spin-slow':  {
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
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shine: {
          '100%': { left: '125%' }, // For a "shining" effect
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px #ff00ff' },
          '50%': { boxShadow: '0 0 20px #ff00ff' },
        },
        pulseSmall: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      // Add your custom animation utilities here
      animation: {
        'spin-slow': 'spin-slow 10s linear infinite',    // Adjust duration as needed
        'spin-slower': 'spin-slower 15s linear infinite', // Adjust duration as needed
        'spin-slowest': 'spin-slowest 20s linear infinite',
        'fade-in': 'fadeIn 2s ease-out',
        'shine': 'shine 1s forwards', // Using forwards to keep the final state
        'glow': 'glow 1.5s infinite',
        'pulse-small': 'pulseSmall 1s infinite ease-in-out',// Adjust duration as needed
      },
    },
  },
  plugins: [],
}

