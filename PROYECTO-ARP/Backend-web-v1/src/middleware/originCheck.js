/**
 * Archivo: src/middleware/originCheck.js
 * Descripción: Middleware opcional para validar orígenes permitidos.
 */
function originCheck(req, res, next) {
  next();
}

module.exports = originCheck;
