# --- СТАДИЯ 1: СБОРКА ПРИЛОЖЕНИЯ ---
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и lock-файл
COPY package.json package-lock.json ./

# --- НАЧАЛО ОТЛАДОЧНЫХ КОМАНД (ОБЯЗАТЕЛЬНО ДЛЯ ДИАГНОСТИКИ) ---
# Выводим содержимое package.json, чтобы убедиться, что Docker его видит
RUN echo "--- Содержимое package.json в контейнере ---"
RUN cat package.json

# Выводим содержимое package-lock.json
RUN echo "--- Содержимое package-lock.json в контейнере ---"
RUN cat package-lock.json

# Проверяем, есть ли папка node_modules до установки
RUN echo "--- Проверяем node_modules до npm ci ---"
RUN ls -la /app/node_modules || echo "node_modules не существует или пуста"
# --- КОНЕЦ ОТЛАДОЧНЫХ КОМАНД ДО npm ci ---

# Устанавливаем зависимости. Используем npm ci для детерминированной установки
# Это должно строго следовать package-lock.json
RUN npm ci

# --- НАЧАЛО ОТЛАДОЧНЫХ КОМАНД ПОСЛЕ npm ci (ОБЯЗАТЕЛЬНО ДЛЯ ДИАГНОСТИКИ) ---
# Проверяем, что npm ci завершился успешно
RUN echo "--- npm ci завершен. Проверяем статус ---"
RUN test $? -eq 0 && echo "npm ci успешно завершен." || echo "npm ci завершился с ошибкой."

# Проверяем наличие папки node_modules после установки
RUN echo "--- Проверяем node_modules после npm ci ---"
RUN ls -la /app/node_modules || echo "node_modules все еще не существует или пуста"

# Проверяем конкретно наличие всех проблемных пакетов
RUN echo "--- Проверяем наличие @reduxjs/toolkit в node_modules ---"
RUN ls -la /app/node_modules/@reduxjs/toolkit || echo "@reduxjs/toolkit не найден в node_modules!"
RUN echo "--- Проверяем содержимое @reduxjs/toolkit ---"
RUN ls -la /app/node_modules/@reduxjs/toolkit/package.json || echo "package.json в @reduxjs/toolkit не найден"

RUN echo "--- Проверяем наличие react-outside-click-handler в node_modules ---"
RUN ls -la /app/node_modules/react-outside-click-handler || echo "react-outside-click-handler не найден в node_modules!"
RUN echo "--- Проверяем содержимое react-outside-click-handler ---"
RUN ls -la /app/node_modules/react-outside-click-handler/package.json || echo "package.json в react-outside-click-handler не найден"

RUN echo "--- Проверяем наличие clsx в node_modules ---"
RUN ls -la /app/node_modules/clsx || echo "clsx не найден в node_modules!"
RUN echo "--- Проверяем содержимое clsx ---"
RUN ls -la /app/node_modules/clsx/package.json || echo "package.json в clsx не найден"
# --- КОНЕЦ ОТЛАДОЧНЫХ КОМАНД ПОСЛЕ npm ci ---

# Копируем остальной код приложения
COPY . .

# Запускаем сборку Vite-приложения.
# Результат (статические файлы) будет в папке 'dist' (по умолчанию для Vite)
RUN npm run build

# --- СТАДИЯ 2: ОТДАЧА СТАТИЧЕСКИХ ФАЙЛОВ NGINX ---
FROM nginx:alpine

# Копируем собранные статические файлы из стадии 'builder'
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем наш кастомный конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
