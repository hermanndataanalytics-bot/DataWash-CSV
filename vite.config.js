import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Fikirakirana an'i Vite.
 *
 * Ity rakitra ity dia manampy amin'ny famahana ny olana momba ny lalana (path) rehefa 
 * manao deploy amin'ny serivera Node/Express toy ny Render.
 */
export default defineConfig({
  plugins: [react()],
  
  build: {
    // 1. Mametraka ny 'base' ho './' (relative path)
    // Izany dia manome antoka fa ny rakitra toy ny main.js dia ho antsoina hoe
    // assets/main.js fa tsy /assets/main.js ao anaty index.html.
    // Tsy maintsy atao izany satria ny Express Server no mikarakara ny routing, 
    // fa tsy ny web server an'i Vite.
    base: './', 
    
    // 2. Tondroinay mazava tsara fa ao anaty lahatahiry 'dist' ny vokatra
    outDir: 'dist',
  },
  
  // Tsy maintsy manome antoka isika fa ny server.js dia ao amin'ny fakan'ny tetikasa
  // ary tsy misy olana momba ny 'root' na 'publicDir'
  server: {
    port: 3000,
  }
});