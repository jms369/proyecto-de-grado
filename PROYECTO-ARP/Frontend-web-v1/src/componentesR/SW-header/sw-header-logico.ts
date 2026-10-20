// src/componentesR/SW-header/sw-header-logico.ts

import { createSignal, onMount } from 'solid-js';
import { apiObtenerLogo } from './header_api';

export const handleNavigation = (
  navigate: (to: string) => void,
  path: string,
  onNavigated?: () => void
): void => {
  if (onNavigated) {
    onNavigated();
  }
  navigate(path);
};

// ⚠️ NUEVO: Lógica para obtener el logo del backend
export const useHeaderLogic = () => {
  const [logoUrl, setLogoUrl] = createSignal<string | null>(null);

  onMount(async () => {
    try {
      const data = await apiObtenerLogo();
      if (data.logo_url_sw) {
        setLogoUrl(`http://localhost:3000${data.logo_url_sw}`);
      }
    } catch (error) {
      console.error('Error al cargar el logo del header:', error);
    }
  });

  return { logoUrl };
};