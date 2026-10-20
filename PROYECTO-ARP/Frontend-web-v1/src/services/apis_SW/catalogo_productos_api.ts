// src/services/apis_SW/catalogo_productos_api.ts

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiObtenerCatalogoPublico = async (): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    // credentials: 'include', // Opcional para rutas públicas
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al cargar el catálogo');
  }

  return response.json();
};