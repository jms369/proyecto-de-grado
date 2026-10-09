// src/sitioWeb/SW-home/sw-home-logico.ts
import { createSignal, onCleanup, onMount } from 'solid-js';
import type { CarouselImage, HomeInfo } from '../../types/SW-types/sw-home-i-m';

export const useHomeLogic = (navigate: (to: string) => void) => {
  // Estados simulados recibidos del backend
  const [images, setImages] = createSignal<CarouselImage[]>([]);
  const [homeInfo, setHomeInfo] = createSignal<HomeInfo | null>(null);
  
  // Lógica del Carrusel
  const [currentSlide, setCurrentSlide] = createSignal(0);
  const [isPaused, setIsPaused] = createSignal(false);
  let intervalId: number | undefined;

  // ============================================================================
  // INICIO MODIFICACIÓN: Controladores del Carrusel y Navegación
  // ============================================================================
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images().length - 1 ? 0 : prev + 1));
  };

  const startCarousel = () => {
    if (!intervalId) {
      intervalId = window.setInterval(() => {
        if (!isPaused()) {
          nextSlide();
        }
      }, 5000); // Cambia cada 5 segundos
    }
  };

  const stopCarousel = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  };

  const handleCarouselInteraction = (paused: boolean) => {
    setIsPaused(paused);
  };

  const handleVerProductos = () => {
    navigate('/catalogo-productos');
  };

  const handleAsistente = () => {
    navigate('/asistente');
  };

  const handleUbicacion = () => {
    navigate('/ubicacion');
  };
  // ============================================================================
  // FIN MODIFICACIÓN
  // ============================================================================

  onMount(() => {
    // Simulación de carga desde el backend
    setImages([
      { id: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMG30CQG9Ob3sgklWuNzSGNZGBSbcMYavfuI-nZRYvUt-Ri60--BtPOTU&s=10', alt: 'Oferta 1' },
      { id: 2, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ-Me3jbqa7OVKwfd6zGNH0_2bQwzWD_Dz4ncfGI5zR3dD2JH05xE_6uZC&s=10', alt: 'Oferta 2' },
      { id: 3, url: 'https://i.pinimg.com/originals/2e/b1/0b/2eb10bfb266bc7258be7fe10ff183057.png', alt: 'Oferta 3' }
    ]);
    
    setHomeInfo({
      calle: 'Av. Heroínas esq. Ayacucho',
      ubicacion: 'Cochabamba, Bolivia',
      horarios: 'Lunes a Viernes: 08:00 - 18:00 hrs.'
    });

    startCarousel();
  });

  onCleanup(() => {
    stopCarousel();
  });

  return {
    images,
    homeInfo,
    currentSlide,
    handleCarouselInteraction,
    handleVerProductos,
    handleAsistente,
    handleUbicacion
  };
};