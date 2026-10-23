// src/services/apis_SW/asistente_recomendacion_api.ts

const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

// Este archivo actúa como puente entre la página de recomendación
// y el módulo de procesamiento.

import { apiObtenerProductosAsistente } from '../../asistentes/SW-asistente-arp/asistente_arp_api';
import { procesarAsistenteArp } from '../../asistentes/SW-asistente-arp/sw-asistente-arp-runner';
import type { SWAstistenteConfigDTO, SWAstistenteResultadoDTO } from '../../asistentes/SW-asistente-arp/sw-asistente-arp-i-m';

// Esta función es la que llamará tu página .tsx
export const ejecutarProcesamientoAsistente = async (
  config: SWAstistenteConfigDTO
): Promise<SWAstistenteResultadoDTO[]> => {
  
  // 1. Traemos los productos reales de la base de datos
  const productosReales = await apiObtenerProductosAsistente();

  // 2. Si no hay productos, devolvemos vacío
  if (!productosReales || productosReales.length === 0) {
    return [];
  }

  // 3. Pasamos los datos al procesador (que hace el filtrado y puntuación)
  const resultados = procesarAsistenteArp(productosReales as any, config);

  // 4. Devolvemos el Top 10
  return resultados;
};


// 2. NUEVO: Obtener solo el número de WhatsApp
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