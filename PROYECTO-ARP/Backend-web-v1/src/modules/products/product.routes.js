/**
 * Módulo: products - product.routes.js
 * Descripción: Endpoints para catálogo de celulares y gestión administrativa (/api/products).
 */
const express = require('express');
const router = express.Router();

const upload = require('../../utils/upload');
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

// ==========================================
// RUTAS PÚBLICAS
// ==========================================
router.get('/', asyncHandler(verCatalogoPublico));
router.get('/asistente', asyncHandler(asistenteRecomendacion));

// ==========================================
// RUTAS PROTEGIDAS (Admin / Trabajador)
// ==========================================

// Ruta de lectura (Admin)
router.get('/admin', verificarAutenticacion(['TRABAJADOR']), asyncHandler(verProductosAdmin));

// RUTA DE SUBIDA DE IMAGEN (Debe ir antes de /:id)
router.post(
  '/upload', 
  verificarAutenticacion(['ADMINISTRADOR']), 
  upload.single('imagen'), 
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }
    const imageUrl = `/uploads/img_productos/${req.file.filename}`;
    return res.json({ mensaje: 'Imagen subida correctamente', url: imageUrl });
  }
);

// Rutas CRUD estándar
router.post('/', verificarAutenticacion(['ADMINISTRADOR']), validate(validarProductoSchema), asyncHandler(crearProducto));
router.put('/:id', verificarAutenticacion(['ADMINISTRADOR']), validate(validarProductoSchema), asyncHandler(actualizarProducto));
router.delete('/:id', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(eliminarProducto));

module.exports = router;