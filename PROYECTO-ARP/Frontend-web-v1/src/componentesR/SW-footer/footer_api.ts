// src/services/apis_SW/footer_api.ts

const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

export const apiObtenerFooter = async (): Promise<{
  url_facebook_sw: string | null;
  url_instagram_sw: string | null;
  url_tiktok_sw: string | null;
}> => {
  const response = await fetch(`${API_BASE_URL}/site/footer`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Error al cargar el footer');
  }

  return response.json();
};