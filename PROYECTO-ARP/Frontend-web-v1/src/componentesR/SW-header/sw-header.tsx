// ============================================================================
// INICIO MODIFICACIÓN: Estructura JSX respetando la distribución original vertical
// ============================================================================
import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import type { SWHeaderLink } from './sw-header-i-m';
import { headerLinks } from './sw-header-i-m';
import { handleNavigation } from './sw-header-logico';
import { useHeaderEstilo } from './sw-header-estilo';
import './sw-header.css';

const SWHeader: Component = () => {
  const navigate = useNavigate();
  const { isMenuOpen, toggleMenu, closeMenu } = useHeaderEstilo();

  return (
    <header class="sw-header-container">
      {/* Mitad superior: Logo institucional centrado (Distribución original) */}
      <div class="logo-section">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/84/Logo_horizontal.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
          alt="Logo de la Empresa" 
          class="logo-image" 
        />
      </div>

      {/* Mitad inferior: Sección de Navegación y Menú Desplegable */}
      <nav class="nav-section">
        {/* Botón Burger ubicado en la sección inferior (visible solo en móviles) */}
        <label for="burger-menu-input" class="burger">
          <input 
            id="burger-menu-input" 
            type="checkbox" 
            checked={isMenuOpen()}
            onChange={toggleMenu}
          />
          <span></span>
          <span></span>
          <span></span>
        </label>

        {/* Contenedor de enlaces: barra horizontal en pantallas grandes, lista desplegable en móviles */}
        <div class={`nav-links-wrapper ${isMenuOpen() ? 'mobile-open' : ''}`}>
          <For each={headerLinks}>
            {(link: SWHeaderLink) => (
              <button
                class="nav-link"
                onClick={() => {
                  closeMenu();
                  handleNavigation(navigate, link.path);
                }}
              >
                {link.label}
              </button>
            )}
          </For>
        </div>
      </nav>
    </header>
  );
};

export default SWHeader;
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================