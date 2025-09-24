/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
    "./public/*.html"
    // Add other file paths here if needed
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          primary: '#f1d416',    // Green accent
          blue: '#0a1f3c',       // Deep blue
          black: '#111827',      // Rich black
          white: '#ffffff'       // Pure white
        },
        // UI Colors
        ui: {
          success: '#f1d416',
          error: '#ef4444',
          warning: '#f59e0b',
          info: '#3b82f6'
        }
      },
      animation: {
        'gradient-x': 'gradient 15s ease infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    }
  },
  plugins: [],
};