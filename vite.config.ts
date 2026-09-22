import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'src/about_page.html'),
          agentic: path.resolve(__dirname, 'src/agentic_loop.html'),
          lab: path.resolve(__dirname, 'src/lab_page.html'),
          dashboard: path.resolve(__dirname, 'src/dashboard_content.html'),
          playground: path.resolve(__dirname, 'src/playground.html'),
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/motion')) {
              return 'motion-vendor';
            }
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons-vendor';
            }
          },
        },
      },
    },
  };
});
