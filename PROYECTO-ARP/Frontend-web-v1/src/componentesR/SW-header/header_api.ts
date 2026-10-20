// src/services/apis_SW/header_api.ts

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiObtenerLogo = async (): Promise<{ logo_url_sw: string | null }> => {
  const response = await fetch(`${API_BASE_URL}/site/logo`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Error al cargar el logo');
  }

  return response.json();
};