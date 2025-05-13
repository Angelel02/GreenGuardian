/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        background: {
          DEFAULT: '#1F2937',
          darker: '#111827',
        },
        surface: {
          DEFAULT: '#374151',
          light: '#4B5563',
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}

export default config
