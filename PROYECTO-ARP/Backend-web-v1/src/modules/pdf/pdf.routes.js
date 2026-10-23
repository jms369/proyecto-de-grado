const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const verificarAutenticacion = require('../../middleware/auth');
const { generarReporteProductos } = require('./pdf.controller');

// Ruta para descargar el reporte de productos
router.get(
  '/reporte-productos', 
  verificarAutenticacion(['TRABAJADOR']), 
  asyncHandler(generarReporteProductos)
);

module.exports = router;