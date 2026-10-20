// src/services/apis_SW/home_api.ts

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// 1. Obtener ofertas y ubicación (datos del Home)
export const apiObtenerHomeInfo = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/site/home`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Error al cargar la información del home');
  }

  return response.json();
};

// 2. Obtener solo el logo (si lo necesitas en el home)
export const apiObtenerLogo = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/site/logo`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Error al cargar el logo');
  }

  return response.json();
};