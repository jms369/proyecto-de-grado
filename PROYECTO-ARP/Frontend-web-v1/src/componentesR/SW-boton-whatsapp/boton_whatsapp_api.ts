// src/services/apis_SW/boton_whatsapp_api.ts

const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

/**
 * ¿QUÉ HACE? Hace un GET al backend para obtener solo el número de WhatsApp.
 * ¿QUÉ DEVUELVE? Un objeto con la propiedad 'whatsapp' (ej. { whatsapp: "59178008122" }).
 */
export const apiObtenerWhatsapp = async (): Promise<{ whatsapp: string | null }> => {
  const response = await fetch(`${API_BASE_URL}/site/whatsapp`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el número de WhatsApp');
  }

  return response.json();
};