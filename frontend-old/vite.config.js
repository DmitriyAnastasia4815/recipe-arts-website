import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Добавьте эту секцию для настройки esbuild
  esbuild: {
    // Указываем esbuild использовать 'jsx' loader для файлов с расширением '.js'
    // Это соответствует предложению из ошибки.
    // Если у вас также есть .ts файлы с JSX, которые вы хотите обрабатывать как tsx,
    // можно добавить '.ts': 'tsx'
    loader: {
      '.js': 'jsx',
      // '.ts': 'tsx', // Раскомментируйте, если нужно
    },
    // Опционально: можно указать, к каким файлам применять эту настройку.
    // По умолчанию применяется ко всем файлам, которые esbuild обрабатывает.
    // include: /src\/.*\.jsx?$/, // Пример: применять только к .js и .jsx в src
  },

  // ... другие опции
});
