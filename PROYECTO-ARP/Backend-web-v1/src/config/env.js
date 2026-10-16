/**
 * Archivo: src/config/env.js
 * Descripción: Valida y centraliza las variables de entorno de la aplicación.
 */
const requiredEnvs = ['DB_HOST', 'DB_USER', 'DB_NAME', 'FRONTEND_URL'];

requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    console.warn(`⚠️ Advertencia: La variable de entorno ${env} no está definida.`);
  }
});

module.exports = {
  PORT: process.env.PORT || 3000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173'
};
