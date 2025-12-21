import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          pdf: ['pdfjs-dist', 'pdf-lib'],
          // Removed driver.js from here so it can be truly lazy loaded via React.lazy in App.tsx
          ui: ['lucide-react'] 
        }
      }
    }
  }
})