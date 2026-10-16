/**
 * Módulo: products - product.routes.js
 * Descripción: Endpoints para catálogo de celulares y gestión administrativa (/api/products).
 */
const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const verificarAutenticacion = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { validarProductoSchema } = require('./product.schema');
const {
  verProductosAdmin,
  verCatalogoPublico,
  asistenteRecomendacion,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('./product.controller');

// Rutas públicas
router.get('/', asyncHandler(verCatalogoPublico));
router.get('/asistente', asyncHandler(asistenteRecomendacion));

// Rutas protegidas (Admin / Trabajador)
router.get('/admin', verificarAutenticacion(['TRABAJADOR']), asyncHandler(verProductosAdmin));
router.post('/', verificarAutenticacion(['ADMINISTRADOR']), validate(validarProductoSchema), asyncHandler(crearProducto));
router.put('/:id', verificarAutenticacion(['ADMINISTRADOR']), validate(validarProductoSchema), asyncHandler(actualizarProducto));
router.delete('/:id', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(eliminarProducto));

module.exports = router;
