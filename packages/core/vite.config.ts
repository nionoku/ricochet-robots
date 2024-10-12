import { defineConfig, loadEnv } from 'vite';
import { join } from 'node:path';

import rootPkg from '../../package.json';

export default defineConfig(({ mode }) => {
  const rootPath = join('..', '..');
  const viteEnv = loadEnv(mode, rootPath);  

  const base = mode === 'production'
    ? join('/', rootPkg.name, 'core')
    : '/';

  return {
    base,
    build: {
      outDir: join(rootPath, 'dist', 'core'),
      emptyOutDir: true,
    },
    server: {
      port: Number(viteEnv.VITE_APP_CORE_PORT),
    },
  };
});