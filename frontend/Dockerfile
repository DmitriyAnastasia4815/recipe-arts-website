
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и lock-файл
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install
COPY . .

EXPOSE 3000

# Запускаем React Development Server
CMD ["npm", "run" , "dev"]
