// src/services/apis_SG/ver_productos_api.ts

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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
    alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
    window.location.href = '/inicioSG';
    throw new Error('No autorizado');
  }

  if (response.status === 403) {
    alert('No tiene permisos para acceder a esta sección.');
    throw new Error('Prohibido');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al cargar los productos');
  }

  return response.json();
};