// src/sitioWeb/SW-home/sw-home.tsx
import type { Component } from 'solid-js';
import { onMount, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { useHomeLogic } from './sw-home-logico';
import { triggerFadeInAnimation } from './sw-home-estilo';
import './sw-home.css';

// Importación de componentes reutilizables (Ajustar ruta según configuración del proyecto)
import SWHeader from '../../componentesR/SW-header/sw-header';
import SWFooter from '../../componentesR/SW-footer/sw-footer';

import SWBotonWhatsapp from '../../componentesR/SW-boton-whatsapp/sw-boton-whatsapp';



const SWHome: Component = () => {
  const navigate = useNavigate();
  const {
    images,
    homeInfo,
    currentSlide,
    handleCarouselInteraction,
    handleVerProductos,
    handleAsistente,
    handleUbicacion
  } = useHomeLogic(navigate);

  let containerRef: HTMLDivElement | undefined;

  onMount(() => {
    triggerFadeInAnimation(containerRef || null);
  });

  return (
    <div class="sw-home-wrapper" ref={containerRef}>
      <SWHeader />

      {/* ============================================================================ */}
      {/* INICIO MODIFICACIÓN: Estructura del contenido principal de la página Inicio */}
      {/* ============================================================================ */}
      <main class="content-container">
        <h1 class="title">Ofertas</h1>

        <div 
          class="carousel-container"
          onMouseEnter={() => handleCarouselInteraction(true)}
          onMouseLeave={() => handleCarouselInteraction(false)}
          onClick={() => handleCarouselInteraction(!images().length)} // Click pausa/reanuda
        >
          <div 
            class="carousel-track"
            style={{ transform: `translateX(-${currentSlide() * 100}%)` }}
          >
            {images().map((img) => (
              <img class="carousel-slide" src={img.url} alt={img.alt} />
            ))}
          </div>
        </div>

        <div class="buttons-container">
          <button class="btn-ver-productos" onClick={handleVerProductos}>
            VER PRODUCTOS
          </button>
          
          <button class="btn-asistente" onClick={handleAsistente}>
            Asistente de Recomendación
          </button>
        </div>

        <Show when={homeInfo()}>
          <div class="info-box">
            <p>Nos ubicamos en la calle {homeInfo()?.calle}</p>
            <p>{homeInfo()?.ubicacion}.</p>
            <p>Días y horarios de atención:</p>
            <p>{homeInfo()?.horarios}</p>
          </div>
        </Show>

        <button class="btn-ubicacion" onClick={handleUbicacion}>
          <div class="svg-wrapper-1">
            <div class="svg-wrapper">
              {/* Icono vectorial SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" class="icon">
                {/* Nuevo path: Marcador de mapa con círculo interior */}
                <path d="M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7-7.75 7-13C19,5.13 15.87,2 12,2z M12,11.5c-1.38,0 -2.5,-1.12 -2.5,-2.5s1.12,-2.5 2.5,-2.5s2.5,1.12 2.5,2.5S13.38,11.5 12,11.5z"></path>
              </svg>
            </div>
          </div>
          <span>Ubicación</span>
        </button>

      </main>
      {/* ============================================================================ */}
      {/* FIN MODIFICACIÓN                                                             */}
      {/* ============================================================================ */}

      <SWFooter />
      {/*Renderizado de boton de WhatsApp con número y mensaje predefinidos*/}
      <SWBotonWhatsapp 
        phone="59178008122" 
        message="Hola, quisiera obtener más información." 
      />


    </div>


  );
};

export default SWHome;