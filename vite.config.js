import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePrerender from 'vite-plugin-prerender';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/resume', '/projects'], 
    }),
  ],
});