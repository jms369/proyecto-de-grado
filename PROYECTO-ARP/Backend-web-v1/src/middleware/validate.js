/**
 * Archivo: src/middleware/validate.js
 * Descripción: Middleware genérico para validación de esquemas y reglas de negocio en peticiones.
 */
function validate(schemaFn) {
  return (req, res, next) => {
    const error = schemaFn(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    next();
  };
}

module.exports = validate;
