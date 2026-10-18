/**
 * Archivo: src/utils/normalize.js
 * Descripción: Funciones de sanitización y normalización de textos, correos, contraseñas y números.
 */

// ⚠️ CORRECCIÓN: Si el valor es null o undefined, devolvemos null.
// Esto permite que el COALESCE en SQL mantenga el valor anterior de la BD.
// Si el valor es un string vacío "", lo mantenemos como "" (para permitir borrar intencionalmente).

const sanitizeLettersOnly = (val) => {
  if (val === null || val === undefined) return null;
  return String(val).replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').trim();
};

const sanitizeEmailOrPassword = (val) => {
  if (val === null || val === undefined) return null;
  return String(val).replace(/\s+/g, '').trim();
};

const sanitizeNumbersOnly = (val) => {
  if (val === null || val === undefined) return null;
  return String(val).replace(/\D/g, '').trim();
};

const sanitizeAlphanumericNoSpaces = (val) => {
  if (val === null || val === undefined) return null;
  return String(val).replace(/[^a-zA-Z0-9]/g, '').trim();
};

const sanitizePhone = (val) => {
  if (val === null || val === undefined) return null;
  return String(val).replace(/[^0-9\s]/g, '').trim();
};

const sanitizeBloodType = (val) => {
  if (val === null || val === undefined) return null;
  return String(val).replace(/[^a-zA-Z+\-]/g, '').trim();
};

function validarEmail(email) {
  const lower = email.toLowerCase();
  return lower.endsWith('@gmail.com') || lower.endsWith('@hotmail.com');
}

function validarContrasena(pwd) {
  const hasMinLen = pwd.length >= 8;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  return hasMinLen && hasUpper && hasLower && hasNumber;
}

module.exports = {
  sanitizeLettersOnly,
  sanitizeEmailOrPassword,
  sanitizeNumbersOnly,
  sanitizeAlphanumericNoSpaces,
  sanitizePhone,
  sanitizeBloodType,
  validarEmail,
  validarContrasena
};