import { createSignal, onMount } from 'solid-js';
import type { UserSessionData } from '../../types/sg-dashboard-i-m';
import { esAdmin } from '../../types/sg-dashboard-i-m';
import { triggerPageExitAnimation } from './sg-dashboard-estilo';
import { obtenerSesionDashboard } from '../../services/apis_SG/dashboard_api';

export const useDashboardLogic = (navigate: (to: string) => void) => {
  // Guardamos la sesión (solo el rol) mientras carga
  const [session, setSession] = createSignal<UserSessionData | null>(null);
  const [isLoading, setIsLoading] = createSignal<boolean>(true);

  // Al cargar el componente, pedimos el rol a la API
  onMount(async () => {
    try {
      const data = await obtenerSesionDashboard();
      
      // Guardamos el rol REAL que viene del backend (ADMINISTRADOR, SUPERADMIN o TRABAJADOR)
      setSession({
        role: data.rol
      });
    } catch (error) {
      console.error('Error de sesión:', error);
      // Si el backend rechaza la cookie (401), lo mandamos al login
      navigate('/inicioSG');
    } finally {
      setIsLoading(false);
    }
  });

  // Usamos el helper para saber si es Admin (Administrador o Superadmin)
  const isAdmin = () => esAdmin(session()?.role);

  const handleNavigateCard = (route: string, containerRef: HTMLElement | undefined) => {
    triggerPageExitAnimation(containerRef, () => {
      navigate(route);
    });
  };

  const handleNavigateToCambiarContrasena = (containerRef: HTMLElement | undefined) => {
    triggerPageExitAnimation(containerRef, () => {
      navigate('/gmail-recuperacion');
    });
  };

  return {
    session,
    isLoading,
    isAdmin, // Retorna true si es ADMINISTRADOR o SUPERADMIN
    handleNavigateCard,
    handleNavigateToCambiarContrasena
  };
};