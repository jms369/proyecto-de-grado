// ============================================================================
// INICIO MODIFICACIÓN: Construcción del JSX y enlazado de lógica/estilos
// ============================================================================
import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { headerLinks } from './sw-header-i-m';
import { handleNavigation } from './sw-header-logico';
import './sw-header.css';

const SWHeader: Component = () => {
  const navigate = useNavigate();

  return (
    <header class="sw-header-container">
      {/* Mitad superior: Logo Institucional/Empresa */}
      <div class="logo-section">
        {/* Sustituye la ruta del src por la ubicación real de tu logo en /public o importado */}
        <img 
          /*src="/assets/logo-empresa.png" */
          src= "https://images-platform.99static.com/q0ZnEPaMI6sdJYxhpr6m36HxQ84=/369x164:1232x1027/500x500/top/smart/99designs-contests-attachments/60/60900/attachment_60900817"
          alt="Logo de la Empresa" 
          class="logo-image" 
        />
      </div>

      {/* Mitad inferior: Enlaces de Navegación */}
      <nav class="nav-section">
        <For each={headerLinks}>
          {(link) => (
            <button
              class="nav-link"
              onClick={() => handleNavigation(navigate, link.path)}
            >
              {link.label}
            </button>
          )}
        </For>
      </nav>
    </header>
  );
};

export default SWHeader;
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================