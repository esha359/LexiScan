import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/LexiScan/',
  server: {
    port: 3000,
  }
})
