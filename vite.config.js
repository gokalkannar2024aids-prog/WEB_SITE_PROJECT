import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/WEB_SITE_PROJECT/',
  server: {
    port: 5173,
    open: true,
  },
});
