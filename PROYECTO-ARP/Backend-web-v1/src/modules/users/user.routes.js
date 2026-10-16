/**
 * Módulo: users - user.routes.js
 * Descripción: Endpoints para gestión de usuarios y perfiles (/api/users).
 */
const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const verificarAutenticacion = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { validarCrearUsuarioSchema, validarGmailsSchema } = require('./user.schema');
const {
  verMisDatos,
  editarMisDatos,
  verGmails,
  editarGmails,
  crearUsuario,
  listarUsuarios,
  buscarUsuarioPorNombre,
  actualizarUsuarioPorAdmin
} = require('./user.controller');

// Rutas de Trabajador / Admin
router.get('/me', verificarAutenticacion(['TRABAJADOR']), asyncHandler(verMisDatos));
router.put('/me', verificarAutenticacion(['TRABAJADOR']), asyncHandler(editarMisDatos));

router.get('/gmails', verificarAutenticacion(['TRABAJADOR']), asyncHandler(verGmails));
router.put('/gmails', verificarAutenticacion(['TRABAJADOR']), validate(validarGmailsSchema), asyncHandler(editarGmails));

// Rutas exclusivas de Administrador
router.get('/', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(listarUsuarios));
router.post('/', verificarAutenticacion(['ADMINISTRADOR']), validate(validarCrearUsuarioSchema), asyncHandler(crearUsuario));
router.get('/buscar', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(buscarUsuarioPorNombre));
router.put('/:id', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(actualizarUsuarioPorAdmin));

module.exports = router;
