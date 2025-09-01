# --- СТАДИЯ 1: СБОРКА ПРИЛОЖЕНИЯ ---
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и lock-файл
COPY package.json package-lock.json ./

# --- НАЧАЛО ОТЛАДОЧНЫХ КОМАНД ---
# Выводим содержимое package.json, чтобы убедиться, что Docker его видит
RUN echo "--- Содержимое package.json в контейнере ---"
RUN cat package.json

# Выводим содержимое package-lock.json
RUN echo "--- Содержимое package-lock.json в контейнере ---"
RUN cat package-lock.json

# Проверяем, есть ли папка node_modules до установки
RUN echo "--- Проверяем node_modules до npm ci ---"
RUN ls -la /app/node_modules || echo "node_modules не существует или пуста"
# --- КОНЕЦ ОТЛАДОЧНЫХ КОМАНД ---

# Устанавливаем зависимости. Используем npm ci для детерминированной установки
RUN npm ci

# --- НАЧАЛО ОТЛАДОЧНЫХ КОМАНД ПОСЛЕ npm ci ---
# Проверяем, что npm ci завершился успешно
RUN echo "--- npm ci завершен. Проверяем статус ---"
RUN test $? -eq 0 && echo "npm ci успешно завершен." || echo "npm ci завершился с ошибкой."

# Проверяем наличие папки node_modules после установки
RUN echo "--- Проверяем node_modules после npm ci ---"
RUN ls -la /app/node_modules || echo "node_modules все еще не существует или пуста"

# Проверяем конкретно наличие @reduxjs/toolkit
RUN echo "--- Проверяем наличие @reduxjs/toolkit в node_modules ---"
RUN ls -la /app/node_modules/@reduxjs/toolkit || echo "@reduxjs/toolkit не найден в node_modules!"

# Проверяем, что папка @reduxjs/toolkit не пуста
RUN echo "--- Проверяем содержимое @reduxjs/toolkit ---"
RUN ls -la /app/node_modules/@reduxjs/toolkit/package.json || echo "package.json в @reduxjs/toolkit не найден"
# --- КОНЕЦ ОТЛАДОЧНЫХ КОМАНД ---

# Копируем остальной код приложения
COPY . .

# Запускаем сборку Vite-приложения.
RUN npm run build

# ... остальная часть Dockerfile ...
