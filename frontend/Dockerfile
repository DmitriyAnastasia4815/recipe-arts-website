# --- СТАДИЯ 1: СБОРКА ПРИЛОЖЕНИЯ ---
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и lock-файл, чтобы Docker мог кэшировать установку зависимостей
# Это важно: если изменится только код, а не зависимости, этот слой будет взят из кэша
COPY package.json package-lock.json ./

# Устанавливаем зависимости.
# Используем npm ci для детерминированной установки в продакшн-среде
RUN npm ci

# Копируем остальной код приложения
COPY . .

# Запускаем сборку Vite-приложения.
# Результат (статические файлы) будет в папке 'dist'
RUN npm run build

# --- СТАДИЯ 2: ОТДАЧА СТАТИЧЕСКИХ ФАЙЛОВ NGINX ---
FROM nginx:alpine

# Копируем кастомный конфиг Nginx для SPA-роутинга
# Создай файл nginx.conf рядом с Dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем статические файлы, собранные на первой стадии (из папки dist),
# в директорию Nginx для статических файлов
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт 80, который слушает Nginx
EXPOSE 80

# Запускаем Nginx на переднем плане
CMD ["nginx", "-g", "daemon off;"]
