import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  build: {
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-editor': ['@uiw/react-codemirror', '@codemirror/lang-javascript', '@codemirror/theme-one-dark'],
          'vendor-markdown': ['react-markdown', 'remark-gfm', 'rehype-highlight'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
});
