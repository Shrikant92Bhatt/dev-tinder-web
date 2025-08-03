import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [react(), tailwindcss()],
    
    // Build optimizations
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            redux: ['@reduxjs/toolkit', 'react-redux'],
            utils: ['axios', 'js-cookie']
          }
        }
      },
      chunkSizeWarningLimit: 1000
    },
    
    // Development server with proxy
    server: {
      port: 3000,
      host: true,
      open: true,
      proxy: {
        // Proxy API requests to backend server
        '/api': {
          target: 'http://localhost:7777',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        // Alternative: proxy all requests to backend
        '/login': {
          target: 'http://localhost:7777',
          changeOrigin: true,
          secure: false
        },
        '/signup': {
          target: 'http://localhost:7777',
          changeOrigin: true,
          secure: false
        },
        '/logout': {
          target: 'http://localhost:7777',
          changeOrigin: true,
          secure: false
        },
        '/profile': {
          target: 'http://localhost:7777',
          changeOrigin: true,
          secure: false
        },
        '/user': {
          target: 'http://localhost:7777',
          changeOrigin: true,
          secure: false
        },
        '/request': {
          target: 'http://localhost:7777',
          changeOrigin: true,
          secure: false
        }
      }
    },
    
    // Preview server
    preview: {
      port: 3000,
      host: true
    },
    
    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    },
    
    // Optimizations
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom']
    }
  }
})
