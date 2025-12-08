import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Fanamarinana ho an'ny Render/Express
    // Ny base: './' dia manome antoka fa ny referansa rehetra (toy ny /assets/...) 
    // ao anatin'ny index.html dia ho lasa assets/ mba hiasa amin'ny serivera Express.
    base: './', 
    outDir: 'dist', // Mamorona ny lahatahiry dist
  },
  // Raha toa ka ao anaty lahatahiry hafa ny rakitra lehibe:
  // root: './src',
});