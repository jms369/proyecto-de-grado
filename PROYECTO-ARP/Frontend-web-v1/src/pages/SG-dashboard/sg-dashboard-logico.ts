import { createSignal } from 'solid-js';
import type { UserSessionData } from '../../types/sg-dashboard-i-m';
import { triggerPageExitAnimation } from './sg-dashboard-estilo';

export const useDashboardLogic = (navigate: (to: string) => void) => {
  const [session] = createSignal<UserSessionData>({
    role: 'admin',
    email: 'admin@gmail.com'
  });

  const isAdmin = () => session().role === 'admin';

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
    isAdmin,
    handleNavigateCard,
    handleNavigateToCambiarContrasena
  };
};