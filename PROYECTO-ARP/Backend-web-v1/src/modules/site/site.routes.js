/**
 * Módulo: site - site.routes.js
 * Descripción: Endpoints para contenido del sitio web, header, footer y administración del sitio (/api/site).
 */
const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const verificarAutenticacion = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { validarWhatsappSchema } = require('./site.schema');
const {
  obtenerLogo,
  obtenerFooter,
  obtenerHomeInfo,
  actualizarLogo,
  actualizarRedesYContacto,
  actualizarTextoInformativo,
  listarOfertas,
  crearOferta,
  eliminarOferta
} = require('./site.controller');

// Rutas públicas
router.get('/logo', asyncHandler(obtenerLogo));
router.get('/footer', asyncHandler(obtenerFooter));
router.get('/home', asyncHandler(obtenerHomeInfo));
router.get('/ofertas', asyncHandler(listarOfertas));

// Rutas protegidas (Administrador)
router.put('/logo', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(actualizarLogo));
router.put('/redes', verificarAutenticacion(['ADMINISTRADOR']), validate(validarWhatsappSchema), asyncHandler(actualizarRedesYContacto));
router.put('/info', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(actualizarTextoInformativo));
router.post('/ofertas', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(crearOferta));
router.delete('/ofertas/:id', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(eliminarOferta));

module.exports = router;
