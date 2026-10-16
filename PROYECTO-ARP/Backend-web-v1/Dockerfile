FROM node:18-alpine

# Crear directorio de trabajo en el contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto 3000 como solicitaste
EXPOSE 3000

# Comando para iniciar la aplicación (ajusta según tu package.json, ej: "start" o "dev")
CMD ["npm", "run", "dev"]