import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@image': fileURLToPath(new URL('./src/assets/image', import.meta.url)),
      '@icon': fileURLToPath(new URL('./src/assets/image/icon', import.meta.url)),
      '@components-common': fileURLToPath(
        new URL('./src/components/common', import.meta.url),
      ),
      '@components-layout': fileURLToPath(
        new URL('./src/components/layout', import.meta.url),
      ),
      '@components-ui': fileURLToPath(
        new URL('./src/components/ui', import.meta.url),
      ),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
    },
  },
});
