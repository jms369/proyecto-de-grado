/**
 * Módulo: site - site.schema.js
 * Descripción: Esquemas de validación para configuración del sitio web e imágenes de ofertas.
 */
function validarWhatsappSchema(body) {
  const { whatsapp } = body;
  if (whatsapp && /\D/.test(whatsapp)) {
    return 'El número de WhatsApp solo debe admitir números y sin espacios.';
  }
  return null;
}

module.exports = {
  validarWhatsappSchema
};
