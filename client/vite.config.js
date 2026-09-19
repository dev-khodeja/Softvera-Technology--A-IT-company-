import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // or 'tailwindcss' depending on your setup

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  build: {
    sourcemap: false,          // Disable source maps in production
    minify: 'terser',           // Use Terser for better minification (default is 'esbuild')
    terserOptions: {
      compress: {
        drop_console: true,     // Remove console.log statements (optional)
        drop_debugger: true,    // Remove debugger statements
      },
    },
  },
});