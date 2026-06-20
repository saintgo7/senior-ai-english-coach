import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 487개 시나리오 데이터를 메인 청크에서 분리해 초기 로드 부담을 줄인다
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
