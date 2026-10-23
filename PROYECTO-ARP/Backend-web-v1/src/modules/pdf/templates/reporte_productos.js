/**
 * Plantilla: Reporte de Productos
 * Descripción: Dibuja una tabla con las columnas específicas de productos.
 * Coordenadas predefinidas para tamaño A4.
 */

const dibujarReporteProductos = (doc, productos) => {
  // --- 1. Encabezado ---
  doc.fontSize(20).fillColor('#0163e0').font('Helvetica-Bold')
     .text('Lista de Productos', { align: 'center' });
  
  doc.moveDown(0.5);
  doc.fontSize(10).fillColor('#666').font('Helvetica')
     .text(`Generado el: ${new Date().toLocaleDateString('es-BO')}`, { align: 'center' });
  
  doc.moveDown(2);

  // --- 2. Configuración de la Tabla ---
  const tableTop = doc.y;
  const itemHeight = 25;
  
  // Coordenadas X para las 5 columnas (Marca, Modelo, Almac., RAM, Precio)
  const colMarca = 50;
  const colModelo = 160;
  const colAlmacenamiento = 310;
  const colRam = 400;
  const colPrecio = 480;

  // --- 3. Cabecera de la Tabla ---
  doc.rect(50, tableTop, 500, itemHeight).fill('#0163e0');
  
  doc.fontSize(10).fillColor('#ffffff').font('Helvetica-Bold');
  doc.text('Marca', colMarca + 5, tableTop + 8);
  doc.text('Modelo', colModelo + 5, tableTop + 8);
  doc.text('Almac.', colAlmacenamiento + 5, tableTop + 8);
  doc.text('RAM', colRam + 5, tableTop + 8);
  doc.text('Precio', colPrecio + 5, tableTop + 8);

  // --- 4. Filas de la Tabla ---
  let y = tableTop + itemHeight;
  doc.font('Helvetica').fontSize(9).fillColor('#333');

  productos.forEach((p, index) => {
    // Salto de página si llegamos al límite inferior
    if (y > 750) {
      doc.addPage();
      y = 50; 
    }

    // Fondo alternado (Zebra) para facilitar la lectura
    if (index % 2 === 0) {
      doc.rect(50, y, 500, itemHeight).fill('#f9f9f9');
    }

    // Dibujar los datos de cada fila
    doc.fillColor('#333');
    doc.text(p.marca_celular || '', colMarca + 5, y + 8, { width: 140, ellipsis: true });
    doc.text(p.modelo_celular || '', colModelo + 5, y + 8, { width: 140, ellipsis: true });
    doc.text(`${p.almacenamiento_celular} GB`, colAlmacenamiento + 5, y + 8);
    doc.text(`${p.ram_celular} GB`, colRam + 5, y + 8);
    doc.text(`Bs. ${p.precio_celular}`, colPrecio + 5, y + 8);

    y += itemHeight;
  });

  // --- 5. Línea final de la tabla y Pie de página ---
  doc.moveTo(50, y).lineTo(550, y).stroke('#ddd');
  
  doc.fontSize(8).fillColor('#999').text(
    'Sistema de Gestión v1 - Lista de Productos',
    50, 780, { align: 'center', width: 500 }
  );
};

module.exports = { dibujarReporteProductos };