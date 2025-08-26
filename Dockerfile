# Используем официальный Node.js образ
FROM node:20-alpine

# Рабочая директория в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем всё приложение
COPY . .

# Собираем Next.js
RUN npm run build

# Указываем порт
EXPOSE 3000

USER nextjs

# Запускаем приложение
CMD ["npm", "start"]
