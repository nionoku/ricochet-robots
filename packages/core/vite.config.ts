import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

import rootPkg from '../../package.json';
import pkg from './package.json';

export default defineConfig(({ mode }) => {
  const rootPath = path.join('..', '..');
  const viteEnv = {
    ...process.env,
    ...loadEnv(mode, rootPath),
  };

  const base = mode === 'production'
    ? path.join('/', rootPkg.name, pkg.name)
    : '/';

  return {
    base,
    envDir: rootPath,
    build: {
      outDir: path.join(rootPath, 'dist', pkg.name),
    },
    server: {
      port: Number(viteEnv.VITE_APP_CORE_PORT),
    },
  };
});
