// src/services/apis_SG/gmails_recuperacion_api.ts

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
    window.location.href = '/inicioSG';
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

// 1. Obtener gmails de recuperación
export const apiObtenerGmails = async (): Promise<{
  gmail1_sg: string | null;
  gmail2_sg: string | null;
  gmail3_sg: string | null;
}> => {
  const response = await fetch(`${API_BASE_URL}/users/gmails`, {
    method: 'GET',
    credentials: 'include', // Envía la cookie de sesión
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

// 2. Actualizar gmails (envía null si el campo está vacío)
export const apiActualizarGmails = async (
  email1: string | null,
  email2: string | null,
  email3: string | null
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/gmails`, {
    method: 'PUT',
    credentials: 'include', // Envía la cookie de sesión
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email1, email2, email3 }),
  });
  await handleResponse(response);
};