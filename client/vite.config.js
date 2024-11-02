import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@layouts': '/src/layouts',
      '@state': '/src/state',
      '@services': '/src/services',
      '@views': '/src/views',
      '@icons': '/src/icons',
      '@assets': '/src/assets',
    },
  },
})
