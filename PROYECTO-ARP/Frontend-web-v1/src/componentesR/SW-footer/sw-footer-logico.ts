// src/componentesR/SW-footer/sw-footer-logico.ts

import { createSignal, onMount } from 'solid-js';
import { apiObtenerFooter } from './footer_api';

export const handleInternalNavigation = (
  navigate: (to: string) => void,
  path: string
): void => {
  navigate(path);
};

export const handleExternalSocialClick = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

// ⚠️ NUEVO: Lógica para obtener los enlaces del backend
export const useFooterLogic = () => {
  const [socialLinks, setSocialLinks] = createSignal({
    facebook: null as string | null,
    instagram: null as string | null,
    tiktok: null as string | null,
  });

  onMount(async () => {
    try {
      const data = await apiObtenerFooter();
      setSocialLinks({
        facebook: data.url_facebook_sw,
        instagram: data.url_instagram_sw,
        tiktok: data.url_tiktok_sw,
      });
    } catch (error) {
      console.error('Error al cargar los enlaces del footer:', error);
    }
  });

  return { socialLinks };
};