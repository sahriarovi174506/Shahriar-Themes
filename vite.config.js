import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_URL || 'https://shahriarthemes-marketplace.vercel.app'

  return {
    plugins: [react()],
    server: {
      watch: {
        ignored: ['**/api/**']
      },
      // Proxy /api/* to the deployed backend (or your local dev backend).
      // This avoids CORS issues in the browser during local development.
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: true
        }
      }
    },
    optimizeDeps: {
      // These should NEVER be bundled for the frontend
      exclude: ['ioredis', 'nodemailer', '@vercel/kv']
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        // Ensure backend-only modules are treated as external and never bundled
        external: [
          'ioredis',
          'nodemailer',
          '@vercel/kv',
          /^api\/.*/
        ],
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            animations: ['gsap', 'aos', 'lenis']
          }
        }
      }
    }
  }
})
