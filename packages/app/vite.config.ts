import path from 'node:path';
import { defineConfig, loadEnv, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import baseConfig from '../../vite.config';

import rootPkg from '../../package.json';

const config = defineConfig(({ mode }) => {
  const base = mode === 'production'
    ? path.join('/', rootPkg.name)
    : '/';

  const root = path.resolve(process.cwd(), '..', '..');

  process.env = {
    ...process.env,
    ...loadEnv(mode, root),
  };

  return {
    base,
    plugins: [
      vue(),
      vueDevTools(),
    ],
    build: {
      outDir: path.join(root, 'dist'),
    },
    server: {
      port: Number(process.env.VITE_APP_APP_PORT),
    },
  };
});

export default defineConfig((configEnv) => mergeConfig(baseConfig, config(configEnv)));
