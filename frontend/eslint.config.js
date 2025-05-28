import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
// import pluginImport from 'eslint-plugin-import'; // Возможно, уже включен через extends

export default [
  { // Базовая конфигурация для всех файлов
    ignores: ["dist", ".eslintcache", "*.config.js"], // Игнорируем папки/файлы
  },
  pluginJs.configs.recommended, // Базовые рекомендованные правила JS
  ...tseslint.configs.recommended, // Рекомендованные правила TS

  { // Конфигурация для React и TypeScript файлов
    files: ["src/**/*.{js,jsx,ts,tsx}"], // Применяется к этим файлам
    settings: {
      react: {
        version: 'detect', // Автоматически определяет версию React
      },
      // === ДОБАВЬТЕ ЭТУ СЕКЦИЮ ===
      'import/resolver': {
        // Используем резолвер typescript
        typescript: {
          // Указываем путь к вашему tsconfig.json
          project: './tsconfig.json'
        }
      }
      // =========================
    },
    languageOptions: {
      parser: tseslint.parser, // Указываем парсер TypeScript
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json', // Важно для резолвера TS
      },
      globals: {
        ...globals.browser, // Добавляем глобальные переменные браузера
        ...globals.node, // Добавляем глобальные переменные Node.js
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      prettier: pluginPrettier, // Подключаем плагин Prettier
      // import: pluginImport,
    },
    rules: {
      // Рекомендованные правила React и React Hooks
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,

      // Правила Prettier (включает eslint-config-prettier)
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,

      // Ваши собственные правила или переопределения
      // '@typescript-eslint/no-unused-vars': 'warn',
      // 'react/react-in-jsx-scope': 'off', // Для React 17+
    },
  },
];
