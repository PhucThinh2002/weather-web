import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/ionicons': {
        target: 'https://unpkg.com/ionicons@7.1.0',
        changeOrigin: true,
      },
    },
  },
});
