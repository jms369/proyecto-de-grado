/**
 * Módulo: auth - auth.schema.js
 * Descripción: Reglas de validación para inicio de sesión y recuperación de contraseña.
 */
const { validarEmail, validarContrasena } = require('../../utils/normalize');

function validarLoginSchema(body) {
  const { email, password } = body;
  if (!email || !password) return 'Email y contraseña son obligatorios.';
  if (!validarEmail(email)) return 'El correo debe terminar en @gmail.com o @hotmail.com.';
  return null;
}

function validarRecuperacionSchema(body) {
  const { email } = body;
  if (!email) return 'El email es obligatorio.';
  if (!validarEmail(email)) return 'El correo debe terminar en @gmail.com o @hotmail.com.';
  return null;
}

function validarReestablecerSchema(body) {
  const { gmail_usuario, nuevaContrasena } = body;
  if (!gmail_usuario || !nuevaContrasena) return 'Gmail y nueva contraseña son obligatorios.';
  if (!validarContrasena(nuevaContrasena)) return 'La contraseña requiere mín. 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.';
  return null;
}

module.exports = {
  validarLoginSchema,
  validarRecuperacionSchema,
  validarReestablecerSchema
};
