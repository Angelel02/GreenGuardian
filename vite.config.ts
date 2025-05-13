import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/green-guardian/', // Add this line for GitHub Pages
  css: {
    postcss: './postcss.config.cjs'
  }
})
