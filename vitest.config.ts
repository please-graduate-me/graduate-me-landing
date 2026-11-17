import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

/** 외부 API를 연결하지 않고 체험 계약과 화면 동작을 검증한다. */
export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src/', import.meta.url)) },
  },
  test: { environment: 'happy-dom', include: ['src/**/*.test.{ts,tsx}'] },
});
