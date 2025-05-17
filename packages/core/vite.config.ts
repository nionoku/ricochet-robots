import path from 'node:path';
import { defineConfig, loadEnv, mergeConfig } from 'vite';
import baseConfig from '../../vite.config';

import rootPkg from '../../package.json';
import pkg from './package.json';

const config = defineConfig(({ mode }) => {
  const base = mode === 'production'
    ? path.join('/', rootPkg.name, pkg.name)
    : '/';

  const root = path.resolve(process.cwd(), '..', '..');

  process.env = {
    ...process.env,
    ...loadEnv(mode, root),
  };

  return {
    base,
    build: {
      outDir: path.join(root, 'dist', pkg.name),
    },
    server: {
      port: Number(process.env.VITE_APP_CORE_PORT),
    },
  };
});

export default defineConfig((configEnv) => mergeConfig(baseConfig, config(configEnv)));
