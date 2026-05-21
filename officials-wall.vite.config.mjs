// Vite build config for the officials-wall Svelte submodule.
// Lives in the parent project so it never conflicts with submodule updates.
// Running: `vite build --config officials-wall.vite.config.mjs`
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname, 'src/officials-wall'),
  plugins: [svelte()],
  build: {
    outDir: path.resolve(__dirname, 'dist/assets/wall'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Stable, hash-free filenames so the HTML can reference them directly
        entryFileNames: 'wall.js',
        chunkFileNames: 'wall-[name].js',
        assetFileNames: 'wall[extname]',
      },
    },
  },
});
