/**
 * Módulo: auth - auth.routes.js
 * Descripción: Endpoints para /api/auth (login, logout, recuperación de contraseña).
 */
const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const validate = require('../../middleware/validate');
const { loginRateLimiter } = require('../../middleware/rateLimiters');
const {
  validarLoginSchema,
  validarRecuperacionSchema,
  validarReestablecerSchema
} = require('./auth.schema');
const {
  login,
  logout,
  solicitarRecuperacion,
  verificarCodigo,
  reestablecerContrasena
} = require('./auth.controller');

router.post('/login', loginRateLimiter, validate(validarLoginSchema), asyncHandler(login));
router.post('/logout', asyncHandler(logout));
router.post('/recuperar', validate(validarRecuperacionSchema), asyncHandler(solicitarRecuperacion));
router.post('/verificar-codigo', asyncHandler(verificarCodigo));
router.post('/reestablecer', validate(validarReestablecerSchema), asyncHandler(reestablecerContrasena));

module.exports = router;
