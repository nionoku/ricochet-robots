import { fileURLToPath } from 'node:url';

import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

import rootPkg from '../../package.json';

export default defineConfig(({ mode }) => {
  const rootPath = path.join('..', '..');
  const viteEnv = {
    ...process.env,
    ...loadEnv(mode, rootPath),
  };

  const base = mode === 'production'
    ? path.join('/', rootPkg.name)
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
      outDir: path.join(rootPath, 'dist'),
    },
    server: {
      port: Number(viteEnv.VITE_APP_APP_PORT),
    },
  };
});
