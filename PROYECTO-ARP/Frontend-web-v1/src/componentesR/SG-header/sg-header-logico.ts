import type { MappedHeaderData } from './sg-header-i-m';
import { logoutApi } from '../../services/apis_SG/logout_api';

/**
 * Controlador para la acción de Cerrar Sesión.
 * 1. Llama al backend para eliminar la sesión y la cookie.
 * 2. Ejecuta callback opcional.
 * 3. Navega al login.
 */
export const handleLogoutSubmit = async (
  e: MouseEvent,
  navigate?: (to: string) => void,
  onLogoutCallback?: () => void
): Promise<void> => {
  e.preventDefault();

  // Llamar al backend (limpia sesión en BD + cookie del navegador)
  const result = await logoutApi();

  if (!result.ok) {
    console.warn('Logout backend falló:', result.error);
    // Aun así continuamos con la salida del usuario
  }

  // Callback opcional (por si el componente padre quiere limpiar estado)
  if (onLogoutCallback) {
    onLogoutCallback();
  }

  // Redirigir al login
  if (navigate) {
    navigate('/inicioSG');
  }
};

/**
 * Helper para validar si la URL de la imagen del logo existe
 */
export const hasValidLogo = (headerData: MappedHeaderData): boolean => {
  return Boolean(headerData.imageUrl && headerData.imageUrl.trim() !== '');
};