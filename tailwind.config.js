/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mining: {
          bg: '#0f1115',
          card: '#151923',
          accent: '#f5ad42',
        },
        neon: {
          cyan: '#22d3ee',
          violet: '#a78bfa',
          pink: '#f472b6',
        }
      },
      boxShadow: {
        soft: '0 6px 20px rgba(0,0,0,0.15)',
        glow: '0 0 0 2px rgba(167,139,250,0.25), 0 10px 30px rgba(34,211,238,0.08)'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}
