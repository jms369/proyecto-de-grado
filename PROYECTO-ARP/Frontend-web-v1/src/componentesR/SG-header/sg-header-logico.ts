import type { MappedHeaderData } from './sg-header-i-m';

/**
 * Controlador para la acción de Cerrar Sesión
 */
export const handleLogoutSubmit = (
  e: MouseEvent,
  navigate?: (to: string) => void,
  onLogoutCallback?: () => void
): void => {
  e.preventDefault();

  // Si existe un callback personalizado
  if (onLogoutCallback) {
    onLogoutCallback();
  }

  // Redirección por defecto al Login si se proporciona la función navigate
  if (navigate) {
    navigate('/');
  }
};

/**
 * Helper para validar si la URL de la imagen del logo existe
 */
export const hasValidLogo = (headerData: MappedHeaderData): boolean => {
  return Boolean(headerData.imageUrl && headerData.imageUrl.trim() !== '');
};