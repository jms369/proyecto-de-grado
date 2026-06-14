# Usamos Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copiamos todo el contenido del frontend al directorio público de Nginx
COPY . /usr/share/nginx/html

# Exponemos el puerto 80 para acceder desde el navegador
EXPOSE 80

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]
