import { fileURLToPath } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

import rootPkg from '../../package.json';
import { join } from 'node:path';

export default defineConfig(({ mode }) => {
  const rootPath = join('..', '..');
  const viteEnv = loadEnv(mode, rootPath);  

  const base = mode === 'production'
    ? join('/', rootPkg.name)
    : '/';

  return {
    base,
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    envDir: rootPath,
    build: {
      outDir: join(rootPath, 'dist'),
    },
    server: {
      port: Number(viteEnv.VITE_APP_APP_PORT),
    },
  };
});
