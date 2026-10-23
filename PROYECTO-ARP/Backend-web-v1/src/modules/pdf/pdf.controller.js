/**
 * Módulo: pdf - pdf.controller.js
 * Descripción: Controlador para generar reportes en PDF.
 */

const pool = require('../../config/db');
const { generarPdf } = require('./pdf.service');

async function generarReporteProductos(req, res) {
  try {
    // ⚠️ Consulta optimizada: Solo los campos necesarios para el PDF
    const query = `
      SELECT 
        marca_celular, 
        modelo_celular, 
        almacenamiento_celular, 
        ram_celular, 
        precio_celular 
      FROM PRODUCTOS_CELULAR ORDER BY marca_celular ASC, modelo_celular ASC;
    `;
    const [productos] = await pool.query(query);

    // Generamos el PDF pasando los datos a la plantilla
    const pdfBuffer = await generarPdf('productos', productos);

    // Configuramos la respuesta para descargar el archivo
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="reporte_productos.pdf"');
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error en generarReporteProductos:', error);
    res.status(500).json({ error: 'No se pudo generar el PDF.' });
  }
}

module.exports = { generarReporteProductos };