/**
 * Módulo: users - user.schema.js
 * Descripción: Validaciones para creación y actualización de usuarios y gmails de recuperación.
 */
const { validarEmail, validarContrasena } = require('../../utils/normalize');

function validarCrearUsuarioSchema(body) {
  const { nombre1, apellido1, gmailUsuario, contrasena, carnetIdentidad, numeroCelular, rol } = body;
  if (!nombre1 || !apellido1) return 'Primer nombre y primer apellido son obligatorios.';
  if (!gmailUsuario || !validarEmail(gmailUsuario)) return 'Correo válido (@gmail.com o @hotmail.com) es obligatorio.';
  if (!contrasena || !validarContrasena(contrasena)) return 'Contraseña inválida (mín 8 chars, 1 Mayús, 1 minús, 1 número).';
  if (!carnetIdentidad || carnetIdentidad.length < 7) return 'El C.I. debe tener al menos 7 dígitos.';
  if (!numeroCelular || numeroCelular.replace(/\s/g, '').length < 8) return 'El celular debe tener al menos 8 dígitos.';
  if (!rol || (rol.toUpperCase() !== 'ADMINISTRADOR' && rol.toUpperCase() !== 'TRABAJADOR')) {
    return 'El rol debe ser ADMINISTRADOR o TRABAJADOR.';
  }
  return null;
}

function validarGmailsSchema(body) {
  const { email1, email2, email3 } = body;
  if (!email1 || !validarEmail(email1)) return 'El email1 es obligatorio y debe ser válido.';
  if (email2 && !validarEmail(email2)) return 'El email2 debe ser válido (@gmail.com o @hotmail.com).';
  if (email3 && !validarEmail(email3)) return 'El email3 debe ser válido (@gmail.com o @hotmail.com).';
  return null;
}

module.exports = {
  validarCrearUsuarioSchema,
  validarGmailsSchema
};
