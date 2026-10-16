/**
 * Archivo: src/utils/normalize.js
 * Descripción: Funciones de sanitización y normalización de textos, correos, contraseñas y números.
 */

// Elimina números y caracteres especiales, permitiendo letras, tildes, ñ y espacios
const sanitizeLettersOnly = (val) => (val ? val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').trim() : '');

// Elimina espacios en blanco
const sanitizeEmailOrPassword = (val) => (val ? val.replace(/\s+/g, '').trim() : '');

// Solo números
const sanitizeNumbersOnly = (val) => (val ? val.replace(/\D/g, '').trim() : '');

// Alfanumérico sin espacios (para complemento)
const sanitizeAlphanumericNoSpaces = (val) => (val ? val.replace(/[^a-zA-Z0-9]/g, '').trim() : '');

// Celular (números y espacios)
const sanitizePhone = (val) => (val ? val.replace(/[^0-9\s]/g, '').trim() : '');

// Grupo sanguíneo (letras y +/-)
const sanitizeBloodType = (val) => (val ? val.replace(/[^a-zA-Z+\-]/g, '').trim() : '');

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
