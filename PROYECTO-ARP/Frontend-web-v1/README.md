
Uso

Para levantar la aplicación dentro del entorno de Docker (recomendado):

# Ubícate en la carpeta raíz del proyecto (PROYECTO-ARP) y ejecuta:
docker compose up --build


Si necesitas ejecutarlo localmente sin Docker:

npm install


Aprende más en el sitio web de Solid y ven a conversar con nosotros en nuestro Discord

Scripts disponibles

En el directorio del proyecto (o dentro del contenedor), puedes ejecutar:

npm run dev

Ejecuta la aplicación en el modo de desarrollo.




Abre http://localhost:3000 para verla en el navegador (este es el puerto expuesto por Docker).

npm run build

Compila la aplicación para producción en la carpeta dist.




Empaqueta correctamente Solid en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación es minificada y los nombres de archivo incluyen los hashes.


¡Tu aplicación está lista para ser desplegada!

Despliegue

Aprende más sobre cómo desplegar tu aplicación en la documentación de Vite https://vite.dev/guide/static-deploy.html.

//GUIA RAPIDA DEL PROYECTO//
-assets: para svg,png, jpeg, webp, etc.
-componentesR: todo aquello que se reutilize como lo header, footer, demas.
-pages: donde van las paginas
-services: archivos de las apis
-types: archivos donde van las interfaces de Type script y se añadio el mapeo de variables, por el el archivo termina en i-m.ts
-sitioWeb: donde va todo para la vista del publico.