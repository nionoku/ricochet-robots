import { defineConfig } from 'vite';
import { resolve } from 'path';

import rootPkg from '../../package.json';

export default defineConfig({
  base: resolve(rootPkg.name, 'core'),
  build: {
    outDir: resolve(process.cwd(), '..', '..', 'dist', 'core'),
  },
});