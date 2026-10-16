/**
 * Archivo: src/middleware/errorHandler.js
 * Descripción: Manejador global de errores para respuestas limpias al cliente.
 */
function errorHandler(err, req, res, next) {
  console.error('🔥 Error capturado:', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Error interno del servidor.'
  });
}

module.exports = errorHandler;
