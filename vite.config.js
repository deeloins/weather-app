import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',  // Output directory outside of `public` for the final build
  },
});
