import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
//import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'public/build/www',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // manualChunks: (id) => {
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //   }
        // }
        //entryFileNames: `assets/[name].js`,
        //chunkFileNames: `assets/[name].js`,
        //assetFileNames: `assets/[name].[ext]`
      }
    },
  },
  publicDir: 'www',
  server: {
    proxy: {
      '/adm': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        cookiePathRewrite: {
          "*": "/",
        },
      },
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }

    }
  }
})
