// ============================================================================
// INICIO MODIFICACIÓN: Lógica de construcción de URL para WhatsApp
// ============================================================================
import { mapWhatsAppUrl } from './sw-boton-whatsapp-i-m';

export const getWhatsAppLink = (phone: string, message?: string): string => {
  // Aquí se podrían agregar validaciones de negocio adicionales si fuesen necesarias
  return mapWhatsAppUrl(phone, message);
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================