// ============================================================================
// INICIO MODIFICACIÓN: Estructura visual JSX del botón Asistente ARP
// ============================================================================
import type { Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import { useNavigate } from '@solidjs/router';
import type { SWBotonHaciaArpProps } from './sw-boton-hacia-arp-logico';
import { handleArpNavigation } from './sw-boton-hacia-arp-logico';
import './sw-boton-hacia-arp.css';

const SWBotonHaciaArp: Component<SWBotonHaciaArpProps> = (props) => {
  const navigate = useNavigate();

  return (
    <Portal>
      {/* Usamos <button> en lugar de <a> ya que es navegación interna por Router */}
      <button
        type="button"
        class="sw-boton-hacia-arp-container"
        onClick={() => handleArpNavigation(navigate, props.rutaDestino)}
        aria-label="Ir al Asistente ARP"
      >
        {/* Etiqueta pasiva con la animación de 5s visible y 1s oculto */}
        <div class="sw-arp-label">
          <span class="sw-arp-text-line1">¿No sabes cual elegir?</span>
          <span class="sw-arp-text-line2">YO TE AYUDO</span>
        </div>

        {/* Círculo base (Animación de onda y latido) */}
        <div class="sw-arp-btn-circle">
          <div class="sw-arp-sign">
            {/* SVG del Robot (Silueta monocromática en 1 solo path) */}
              <svg class="sw-arp-svg" viewBox="0 0 200 200">
                <path 
                  fill-rule="evenodd" 
                  clip-rule="evenodd" 
                  d="M35,110 L65,30 L90,45 L70,95 Z M140,80 L180,30 L195,45 L155,100 Z M126,75 L111,35 L109,35.5 L124,75.5 Z M114,30 A7,7 0 1,1 100,30 A7,7 0 1,1 114,30 Z M164,95 A14,14 0 1,1 136,95 A14,14 0 1,1 164,95 Z M160,95 A10,10 0 1,0 140,95 A10,10 0 1,0 160,95 Z M30,165 C5,130 35,80 85,75 C135,70 175,95 165,145 C155,195 55,200 30,165 Z M36,160 C15,130 40,85 85,82 C125,79 155,100 148,140 C143,175 57,190 36,160 Z M48,145 C45,130 65,125 70,140 L70,150 C70,155 50,160 48,145 Z M90,135 C87,120 107,115 112,130 L112,140 C112,145 92,150 90,135 Z M75,147 L90,143 L90,145 L75,149 Z M150,115 L160,135 L145,140 Z" 
                />
              </svg>
          </div>
          {/* Mensaje al hacer Hover */}
          <div class="sw-arp-hover-text">vamos</div>
        </div>
      </button>
    </Portal>
  );
};

export default SWBotonHaciaArp;
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================