// ============================================================================
// INICIO MODIFICACIÓN: Director visual y gestión de estado reactivo del menú desplegable móvil
// ============================================================================
import { createSignal } from 'solid-js';

export const useHeaderEstilo = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen());
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu
  };
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================