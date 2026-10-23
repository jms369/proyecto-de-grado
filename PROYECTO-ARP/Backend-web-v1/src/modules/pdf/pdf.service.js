const PDFDocument = require('pdfkit');
const { dibujarReporteProductos } = require('./templates/reporte_productos');

/**
 * Genera un PDF llamando a la plantilla específica.
 * @param {String} tipoReporte - Nombre de la plantilla a usar.
 * @param {Object} datos - Datos de la BD.
 * @returns {Promise<Buffer>}
 */
function generarPdf(tipoReporte, datos) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks = [];
      
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Selección de plantilla según el tipo de reporte
      switch (tipoReporte) {
        case 'productos':
          dibujarReporteProductos(doc, datos);
          break;
        // Aquí añadirás más casos en el futuro: 
        // case 'usuarios': dibujarReporteUsuarios(doc, datos); break;
        default:
          throw new Error('Plantilla de PDF no encontrada');
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { generarPdf };