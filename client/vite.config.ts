/// <reference types="vitest" />
/// <reference types="vite/client" />

import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@auth',
        replacement: fileURLToPath(
          new URL('./src/modules/auth', import.meta.url)
        ),
      },
      {
        find: '@chat',
        replacement: fileURLToPath(
          new URL('./src/modules/chat', import.meta.url)
        ),
      },
      {
        find: '@contact',
        replacement: fileURLToPath(
          new URL('./src/modules/contact', import.meta.url)
        ),
      },
      {
        find: '@modal',
        replacement: fileURLToPath(
          new URL('./src/modules/modal', import.meta.url)
        ),
      },
      {
        find: '@profile',
        replacement: fileURLToPath(
          new URL('./src/modules/profile', import.meta.url)
        ),
      },
      {
        find: '@settings',
        replacement: fileURLToPath(
          new URL('./src/modules/settings', import.meta.url)
        ),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__test__/setup.ts',
    css: true,
  },
});
