/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hai: {
          forest: '#174A32',
          agri: '#2E8B57',
          leaf: '#E8F3E8',
          offwhite: '#FAFAF5',
          charcoal: '#26332D',
          earth: '#B77A43',
          earthLight: '#E8D8C8',
          border: '#D8E2DC',
          surface: '#FFFFFF',
          muted: '#62736B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Tamil', 'system-ui', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(23, 74, 50, 0.08)',
        'lift': '0 10px 30px -4px rgba(23, 74, 50, 0.12)'
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
}
