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
          // Экспериментальная опция для нарезки чанков (работает не во всех версиях Rollup)
          experimentalMinChunkSize: 300_000, // минимальный размер чанка в байтах

          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Разбиваем по библиотекам/фреймворкам для более точного контроля
              if (id.includes('vue') && !id.includes('vue-router')) return 'vendor-vue';
              if (id.includes('vue-router')) return 'vendor-router';
              if (id.includes('axios')) return 'vendor-axios';
              if (id.includes('element-plus') || id.includes('vant') || id.includes('ant-design')) {
                return 'vendor-ui';
              }

              // Остальные зависимости разбиваем по пакетам автоматически
              // Для этого парсим node_modules путь
              const match = id.match(/node_modules\/(?:@[^/]+\/)?([^/]+)/);
              if (match && match[1]) {
                return `vendor-${match[1]}`;
              }
              return 'vendor-other';
            }
          },

          chunkFileNames: (chunkInfo) => {
            // Группировка малых чанков (можно объединять логически)
            return 'assets/[name]-[hash].js';
          },

          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',

          // Разделение больших чанков (Vite 5+)
          chunkSizeWarningLimit: 300, // переносим предупреждение на 300 КБ
        }
      },

      chunkSizeWarningLimit: 300, // предупреждать при превышении 300 КБ

      // Vite 4+ экспериментальная нарезка (работает поверх rollup)
      experimental: {
        renderBuiltUrl: undefined, // не трогаем
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

