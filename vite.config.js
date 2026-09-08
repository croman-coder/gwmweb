import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    // Los assets ya vienen optimizados desde public/, no hace falta inlinear.
    assetsInlineLimit: 4096,
  },
});
