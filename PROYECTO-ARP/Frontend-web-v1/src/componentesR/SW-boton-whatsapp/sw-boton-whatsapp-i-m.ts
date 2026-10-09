// ============================================================================
// INICIO MODIFICACIÓN: Creación de interfaces y mapeo del botón WhatsApp
// ============================================================================
export interface SWBotonWhatsappProps {
  /** Número de teléfono con código de país (ej. 591XXXXXXXX) sin signos ni espacios */
  phone: string;
  /** Mensaje inicial opcional que aparecerá preescrito en WhatsApp */
  message?: string;
}

/**
 * Mapeo y transformación de los datos del Frontend a una URL válida de Backend/Externa.
 * Aplica encodeURIComponent para asegurar que los espacios y tildes sean seguros.
 */
export const mapWhatsAppUrl = (
  phone: string, 
  message: string = "Hola, quisiera obtener más información."
): string => {
  // Eliminamos cualquier espacio accidental en el número provisto
  const cleanPhone = phone.replace(/\s+/g, '');
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================