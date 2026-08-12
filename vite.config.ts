import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // This forces Vite to re-scan dependencies (like html-to-image) and restart the dev server!
    force: true,
  },
})
