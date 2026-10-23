// src/services/apis_SW/asistente_arp_api.ts

// ============================================================================
// IMPORTACIONES
// ============================================================================
import type { SWAstistenteProductoDTO } from './sw-asistente-arp-i-m';

// URL base del backend (ajústala según tu docker-compose, usualmente puerto 3000)
const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

// ============================================================================
// FUNCIÓN PRINCIPAL: OBTENER PRODUCTOS PARA EL ASISTENTE
// ============================================================================
/**
 * ¿QUÉ HACE? Hace una petición GET al backend para obtener los productos activos.
 * ¿DE QUIÉN RECIBE? Nada. No necesita parámetros.
 * ¿A QUIÉN DEVUELVE? Al archivo que la llame (probablemente un .tsx o un lógico.ts).
 * ¿QUÉ DEVUELVE? Un array de objetos con los datos crudos de la BD.
 */
export const apiObtenerProductosAsistente = async (): Promise<SWAstistenteProductoDTO[]> => {
  try {
    // 1. Hacemos la petición fetch al endpoint público del asistente
    // Ruta: GET http://localhost:3000/api/products/asistente
    const response = await fetch(`${API_BASE_URL}/products/asistente`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json' 
      },
      // No enviamos cookies porque es una ruta pública (según product.routes.js)
    });

    // 2. Verificamos si la respuesta fue exitosa
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al cargar los productos del asistente');
    }

    // 3. Convertimos la respuesta a JSON
    const data = await response.json();

    // 4. Devolvemos el array de productos
    // Nota: El backend devuelve los nombres exactos de la BD (marca_celular, etc.)
    // pero el DTO que definimos espera nombres cortos (marca, etc.).
    // ⚠️ ESTO ES UN PROBLEMA QUE DEBEMOS CORREGIR ANTES DE USARLO.
    return data;

  } catch (error) {
    console.error("Error en apiObtenerProductosAsistente:", error);
    throw error;
  }
};