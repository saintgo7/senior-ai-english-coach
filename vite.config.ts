import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split the ~496 scenario data files out of the entry bundle so the
        // initial JS chunk is smaller for low-spec / senior devices.
        manualChunks(id) {
          if (id.includes('/src/data/scenarios')) {
            return 'scenarios';
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
