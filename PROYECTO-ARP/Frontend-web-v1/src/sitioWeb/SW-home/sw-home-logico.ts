// src/sitioWeb/SW-home/sw-home-logico.ts

import { createSignal, onCleanup, onMount } from 'solid-js';
import type { CarouselImage, HomeInfo } from '../../types/SW-types/sw-home-i-m';
import { apiObtenerHomeInfo, apiObtenerLogo } from '../../services/apis_SW/home_api';
import { mapCarouselImagesToFrontend, mapInfoToFrontend } from '../../types/SW-types/sw-home-i-m';

export const useHomeLogic = (navigate: (to: string) => void) => {
  const [images, setImages] = createSignal<CarouselImage[]>([]);
  const [homeInfo, setHomeInfo] = createSignal<HomeInfo | null>(null);
  const [logoUrl, setLogoUrl] = createSignal<string | null>(null);
  const [ubicacionUrl, setUbicacionUrl] = createSignal<string | null>(null);
  
  const [currentSlide, setCurrentSlide] = createSignal(0);
  const [isPaused, setIsPaused] = createSignal(false);
  let intervalId: number | undefined;

  const nextSlide = () => {
    if (images().length === 0) return;
    setCurrentSlide((prev) => (prev === images().length - 1 ? 0 : prev + 1));
  };

  const startCarousel = () => {
    if (!intervalId) {
      intervalId = window.setInterval(() => {
        if (!isPaused()) nextSlide();
      }, 5000);
    }
  };

  const stopCarousel = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  };

  const handleCarouselInteraction = (paused: boolean) => setIsPaused(paused);

  const handleVerProductos = () => navigate('/catalogo-productos');
  const handleAsistente = () => navigate('/asistente');
  const handleUbicacion = () => navigate('/ubicacion');

  onMount(async () => {
    try {
      const data = await apiObtenerHomeInfo();
      
      if (data.ofertas && data.ofertas.length > 0) {
        setImages(mapCarouselImagesToFrontend(data.ofertas));
      }

      if (data.ubicacion) {
        setUbicacionUrl(data.ubicacion); 
      }

      setHomeInfo(mapInfoToFrontend(data));

      const logoData = await apiObtenerLogo();
      if (logoData && logoData.logo_url_sw) {
        setLogoUrl(`http://localhost:3000${logoData.logo_url_sw}`);
      }

      if (images().length > 0) startCarousel();

    } catch (error) {
      console.error("Error cargando datos del home:", error);
    }
  });

  onCleanup(() => stopCarousel());

  return {
    images,
    homeInfo,
    logoUrl,
    ubicacionUrl,
    currentSlide,
    handleCarouselInteraction,
    handleVerProductos,
    handleAsistente,
    handleUbicacion
  };
};