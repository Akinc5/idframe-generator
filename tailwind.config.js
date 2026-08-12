/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        goa: {
          green: '#006B3C',
          dark: '#004F32',
          bright: '#159447',
        },
        sun: {
          yellow: '#FFD21C',
        },
        cream: '#FFF8DE',
        accent: {
          pink: '#FF007A',
        }
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'paper': "url('https://www.transparenttextures.com/patterns/rice-paper-2.png')",
      }
    },
  },
  plugins: [],
}
