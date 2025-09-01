# --- СТАДИЯ 1: СБОРКА ПРИЛОЖЕНИЯ ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Запускаем сборку Vite-приложения.
# Результат (статические файлы) будет в папке 'dist' (по умолчанию для Vite)
RUN npm run build

# --- СТАДИЯ 2: ОТДАЧА СТАТИЧЕСКИХ ФАЙЛОВ NGINX ---
FROM nginx:alpine

# Копируем собранные статические файлы из стадии 'builder'
# /app/dist - это путь к собранным файлам в стадии 'builder'
# /usr/share/nginx/html - это стандартная директория, откуда Nginx отдает статику
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем наш кастомный конфиг Nginx
# default.conf - это файл, который Nginx использует по умолчанию в этой директории
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80, который Nginx слушает
EXPOSE 80

# Команда, которая запускает Nginx. Она уже есть в базовом образе,
# но можно явно указать, если ты хочешь переопределить.
CMD ["nginx", "-g", "daemon off;"]
