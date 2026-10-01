import type { MappedGmailRecoveryData, RecoveryEmailRequest } from '../../../types/sg-ingresar-gmail-i-m';
import { mapFrontendToBackendRecovery } from '../../../types/sg-ingresar-gmail-i-m';
import { triggerSlideLeftExitAnimation, triggerBackAnimation } from './sg-gmail-recup-estilo';

export const handleRecoverySubmit = (
  e: SubmitEvent,
  formData: MappedGmailRecoveryData,
  onRecoverySuccess: (payload: RecoveryEmailRequest) => void
): void => {
  e.preventDefault();
  const payload = mapFrontendToBackendRecovery(formData);

  // Ejecuta la animación de salida a la izquierda y luego redirige
  triggerSlideLeftExitAnimation(() => {
    onRecoverySuccess(payload);
  });
};

export const handleBackClick = (
  e: MouseEvent,
  navigate: (to: string) => void
): void => {
  e.preventDefault();
  triggerBackAnimation(() => {
    navigate('/');
  });
};