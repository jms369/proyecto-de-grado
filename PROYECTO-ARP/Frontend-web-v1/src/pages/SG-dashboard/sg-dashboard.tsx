import { type Component, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import './sg-dashboard.css';
import { useDashboardLogic } from './sg-dashboard-logico';

// Importación de Header y Footer reutilizables
import SGHeader from '../../componentesR/SG-header/sg-header';
import SGFooter from '../../componentesR/SG-footer/sg-footer';
// Importación de los Módulos Independientes
import SGGmailsRecuperacion from '../SG-gmails-recuperacion/sg-gmails-recuperacion';
import SGMisDatos from '../SG-mis-datos/sg-mis-datos';




const SGDashboard: Component = () => {
  const navigate = useNavigate();
  let containerRef: HTMLDivElement | undefined;

  const [isMisDatosOpen, setIsMisDatosOpen] = createSignal<boolean>(false);

  const {
    isAdmin,
    handleNavigateCard,
    handleNavigateToCambiarContrasena
  } = useDashboardLogic(navigate);

  return (
    <div ref={containerRef} class="sg-dashboard-layout">
      {/* HEADER REUTILIZABLE */}
      <SGHeader />

      {/* DASHBOARD BODY */}
      <div class="sg-dashboard-body">
        {/* MAIN CONTENIDO */}
        <main class="sg-dashboard-main">
          {/* BOTONES DE ACCIÓN SUPERIORES (Solo Administrador) */}
          {isAdmin() && (
            <div class="top-action-buttons">
              <button 
                id="btn-editar-productos" 
                class="btn-top btn-productos"
                onClick={() => navigate('/editar-productos')}
              >
                EDITAR PRODUCTOS
              </button>
              <button 
                id="btn-editar-web" 
                class="btn-top btn-web"
                onClick={() => navigate('/editar-web')}
              >
                EDITAR WEB
              </button>
            </div>
          )}

          {/* GRILLA DE TARJETAS */}
          <div class="cards-grid">
            {/* Tarjeta Crear Usuario (Solo Admin) */}
            {isAdmin() && (
              <div 
                class="card" 
                role="button"
                tabindex="0"
                onClick={() => handleNavigateCard('/crear-usuario', containerRef)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigateCard('/crear-usuario', containerRef)}
              >
                <div class="first-content">
                  <div class="card-icon-wrapper">
                    <svg class="card-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Crear nuevo usuario</span>
                  </div>
                </div>
                <div class="second-content">
                  <span>Módulo para registrar, ver y asignar roles a nuevos usuarios.</span>
                </div>
              </div>
            )}

            {/* Tarjeta Ver Productos */}
            <div 
              class="card" 
              role="button"
              tabindex="0"
              onClick={() => handleNavigateCard('/ver-productos', containerRef)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigateCard('/ver-productos', containerRef)}
            >
              <div class="first-content">
                <div class="card-icon-wrapper">
                  <svg class="card-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span>Ver productos</span>
                </div>
              </div>
              <div class="second-content">
                <span>Consulta el inventario y lista completa de productos.</span>
              </div>
            </div>
          </div>
        </main>

        {/* SIDEBAR DERECHO */}
        <aside class="sg-dashboard-sidebar">
          {/* MÓDULO INDEPENDIENTE: AGREGAR GMAIL DE RECUPERACIÓN */}
          <SGGmailsRecuperacion />

          {/* NAVEGACIÓN SECUNDARIA */}
          <div class="sidebar-navigation-actions">
            <button class="btn" onClick={() => handleNavigateToCambiarContrasena(containerRef)}>
              Cambiar contraseña
            </button>
            <button class="btn" onClick={() => setIsMisDatosOpen(true)}>
              Mis datos
            </button>
          </div>
        </aside>
      </div>
      <SGMisDatos 
        isOpen={isMisDatosOpen()} 
        onClose={() => setIsMisDatosOpen(false)} />

      
      {/* FOOTER REUTILIZABLE */}
      <SGFooter />
    </div>
  );
};

export default SGDashboard;