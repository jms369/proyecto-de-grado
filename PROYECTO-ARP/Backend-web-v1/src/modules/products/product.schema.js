/**
 * Módulo: products - product.schema.js
 * Descripción: Validación de tipos de datos para productos celulares (números enteros y strings).
 */
function validarProductoSchema(body) {
  const {
    precio, almacenamiento, ram, bateria, puntuacionAntutu,
    camaraPrincipal, cargaRapida, camaraFrontal, tasaRefresco
  } = body;

  const camposNumericos = { precio, almacenamiento, ram, bateria, puntuacionAntutu, camaraPrincipal, cargaRapida, camaraFrontal, tasaRefresco };

  for (const [key, val] of Object.entries(camposNumericos)) {
    if (val !== undefined && val !== null && !Number.isInteger(Number(val))) {
      return `El campo ${key} debe ser un número entero.`;
    }
  }
  return null;
}

module.exports = {
  validarProductoSchema
};
