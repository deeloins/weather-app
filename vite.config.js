import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'public',
  server: {
    historyApiFallback: true, // This helps handle client-side routing
  },
});
