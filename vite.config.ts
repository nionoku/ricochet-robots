import path from 'node:path';
import { defineConfig } from 'vite';

const config = defineConfig({
  envDir: import.meta.dirname,
  resolve: {
    alias: {
      '#app-config': path.resolve(import.meta.dirname, 'config', 'app-config.json'),
    },
  },
});

export default config;
