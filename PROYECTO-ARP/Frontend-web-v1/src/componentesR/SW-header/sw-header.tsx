// src/componentesR/SW-header/sw-header.tsx

import type { Component } from 'solid-js';
import { For, Show } from 'solid-js'; // ⚠️ Agregamos Show
import { useNavigate } from '@solidjs/router';
import type { SWHeaderLink } from './sw-header-i-m';
import { headerLinks } from './sw-header-i-m';
import { handleNavigation, useHeaderLogic } from './sw-header-logico'; // ⚠️ Importamos useHeaderLogic
import { useHeaderEstilo } from './sw-header-estilo';
import './sw-header.css';

const SWHeader: Component = () => {
  const navigate = useNavigate();
  const { isMenuOpen, toggleMenu, closeMenu } = useHeaderEstilo();
  const { logoUrl } = useHeaderLogic(); // ⚠️ Obtenemos el logo de la BD

  return (
    <header class="sw-header-container">
      {/* Mitad superior: Logo institucional centrado */}
      <div class="logo-section">
        {/* ⚠️ Solo mostramos el logo si existe en la BD */}
        <Show when={logoUrl()}>
          <img 
            src={logoUrl()!}
            alt="Logo de la Empresa" 
            class="logo-image" 
          />
        </Show>
      </div>

      {/* Mitad inferior: Sección de Navegación y Menú Desplegable */}
      <nav class="nav-section">
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