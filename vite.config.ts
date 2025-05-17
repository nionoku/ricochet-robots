import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const config = defineConfig({
  envDir: process.cwd(),
  resolve: {
    alias: {
      '#app-config': fileURLToPath(new URL('./config/app-config.json', import.meta.url)),
    },
  },
});

export default config;
