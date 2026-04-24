import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
//import vueDevTools from 'vite-plugin-vue-devtools'



export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');

  const targetIp = env.VITE_CONTROLLER_URL || '';
  return {
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
        }
      },
    },
    publicDir: 'www',
    server: {
      proxy: {
        '/api': {
          target: `${targetIp}`,
          changeOrigin: true,
        }

      }
    }
  }
})

