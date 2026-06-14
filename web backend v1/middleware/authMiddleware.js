// Middleware para validaciones futuras
// Ejemplo: verificar token JWT

module.exports = (req, res, next) => {
  console.log("Middleware de autenticación ejecutado.");
  next();
};
