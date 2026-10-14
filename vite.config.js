import { defineConfig } from 'vite';
import seo from './scripts/seo.js';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  // Al compilar: HTML por ficha con sus metadatos, sitemap.xml y robots.txt (ver scripts/seo.js).
  plugins: [seo()],
  server: {
    port: 5173,
    open: false,
    proxy: { '/api': { target: `http://127.0.0.1:${process.env.GWM_DEV_API_PORT || 3001}` } },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    // Los assets ya vienen optimizados desde public/, no hace falta inlinear.
    assetsInlineLimit: 4096,
  },
});
