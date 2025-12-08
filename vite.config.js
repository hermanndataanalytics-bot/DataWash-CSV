import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Manome antoka ny lalana (path) ho an'ny fametrahana (deployment)
  base: '/', 
  build: {
    outDir: 'dist', // Mamorona ny lahatahiry 'dist' izay ampiasain'ny server.js
  },
  server: {
    open: true,
  },
});