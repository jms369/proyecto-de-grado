import type { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import type { SGHeaderProps } from './sg-header-i-m';
import { mapBackendToHeaderLogo } from './sg-header-i-m';
import { handleLogoutSubmit, hasValidLogo } from './sg-header-logico';
import './sg-header.css';

export const SGHeader: Component<SGHeaderProps> = (props) => {
  const navigate = useNavigate();

  // Mapeo del logo traído por props/BD
  const logoData = () => mapBackendToHeaderLogo(props.logoUrl ? { logoUrl: props.logoUrl, altText: 'Logo DB' } : undefined);

  return (
    <header class="sg-header-container">
      {/* ESPACIO PEQUEÑO: Logo / BD URL */}
      <div class="sg-header-logo-section">
        {hasValidLogo(logoData()) ? (
          <img
            src={logoData().imageUrl}
            alt={logoData().imageAlt}
            class="sg-header-logo-img"
          />
        ) : (
          <div class="sg-header-logo-placeholder">LOGO</div>
        )}
      </div>

      {/* ESPACIO AMPLIO: Título de la pantalla/módulo */}
      <div class="sg-header-title-section">
        <h1 class="sg-header-title">
          {props.title || 'SISTEMA DE GESTIÓN'}
        </h1>
      </div>

      {/* ESPACIO MODERADO: Botón de Cerrar Sesión con animación roja */}
      <div class="sg-header-action-section">
        <button
          type="button"
          class="btn-logout-animated"
          onClick={(e) => handleLogoutSubmit(e, navigate, props.onLogout)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>CERRAR SESIÓN</span>
        </button>
      </div>
    </header>
  );
};

export default SGHeader;