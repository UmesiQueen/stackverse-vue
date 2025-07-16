import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://stackverse-server.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  },
  base: './',
  build: {
    outDir: 'dist'
  }
})
