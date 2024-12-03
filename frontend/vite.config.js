import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/search': 'http://127.0.0.1:5000', // Địa chỉ Flask backend
    },
  },
});