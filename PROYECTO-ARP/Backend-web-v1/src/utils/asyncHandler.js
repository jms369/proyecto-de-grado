/**
 * Archivo: src/utils/asyncHandler.js
 * Descripción: Capturador automático de errores asíncronos para controladores.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
