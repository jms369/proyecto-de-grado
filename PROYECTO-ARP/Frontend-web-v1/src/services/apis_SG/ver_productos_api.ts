// src/services/apis_SG/ver_productos_api.ts

const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

/**
 * ¿QUÉ HACE? Hace un GET al backend para obtener todos los productos.
 * ¿A QUIÉN LLAMA? A la ruta /api/products/admin (protegida por cookie).
 * ¿QUÉ DEVUELVE? Un array con los datos crudos de la BD (snake_case).
 */
export const apiObtenerProductosAdmin = async (): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/products/admin`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // CRUCIAL: Envía la cookie de sesión
  });

  if (response.status === 401) {
    window.location.href = '/inicioSG';
    alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
    throw new Error('No autorizado');
  }

  if (response.status === 403) {
    window.location.href = '/dashboard'; // Redirige al dashboard si no tiene permisos
    alert('No tiene permisos para acceder a esta sección.');
    throw new Error('Prohibido');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al cargar los productos');
  }

  return response.json();

};


// ⚠️ NUEVO: Función para descargar el reporte PDF
export const apiDescargarReporteProductos = async (): Promise<Blob> => {
  const response = await fetch(`${API_BASE_URL}/pdf/reporte-productos`, {
    method: 'GET',
    credentials: 'include', // Envía la cookie de sesión
  });

  if (response.status === 401) {
    window.location.href = '/inicioSG';
    alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
    throw new Error('No autorizado');
  }

  if (response.status === 403) {
    alert('No tiene permisos para descargar este reporte.');
    throw new Error('Prohibido');
  }

  if (!response.ok) {
    throw new Error('Error al generar el PDF');
  }

  // Retornamos la respuesta como un Blob (archivo binario)
  return response.blob();
};