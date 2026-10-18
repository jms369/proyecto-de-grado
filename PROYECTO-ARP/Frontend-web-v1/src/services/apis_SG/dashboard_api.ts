const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export interface DashboardSessionResponse {
  rol: 'ADMINISTRADOR' | 'TRABAJADOR' | 'SUPERADMIN';
}

export async function obtenerSesionDashboard(): Promise<DashboardSessionResponse> {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Sesión expirada o no autorizada');
    }
    throw new Error('Error al obtener la sesión');
  }

  return await res.json();
}