import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit'],
          'canvas-vendor': ['fabric', 'fabricjs-react'],
          'ui-vendor': ['react-bootstrap', 'bootstrap', 'lucide-react'],
        },
      },
    },
  },
})
