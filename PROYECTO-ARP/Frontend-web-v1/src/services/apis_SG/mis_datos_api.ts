// src/services/apis_SG/mis_datos_api.ts

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
    window.location.href = '/inicioSG'; // Redirige al login
    throw new Error('No autorizado');
  }
  if (response.status === 403) {
    alert('No tiene permisos para realizar esta acción.');
    throw new Error('Prohibido');
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error en la petición');
  }
  if (response.status === 204) return null;
  return response.json();
};

// 1. Obtener los datos del usuario logueado
export const apiObtenerMisDatos = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include', // ⚠️ CRUCIAL: Envía la cookie de sesión
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

// 2. Actualizar los datos del usuario logueado
export const apiActualizarMisDatos = async (datos: any): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'PUT',
    credentials: 'include', // ⚠️ CRUCIAL: Envía la cookie de sesión
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  await handleResponse(response);
};