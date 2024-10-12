import { defineConfig } from 'vite';
import { join } from 'path';

import rootPkg from '../../package.json';

export default defineConfig({
  base: join('/', rootPkg.name, 'core'),
  build: {
    outDir: join('..', '..', 'dist', 'core'),
    emptyOutDir: true,
  },
});