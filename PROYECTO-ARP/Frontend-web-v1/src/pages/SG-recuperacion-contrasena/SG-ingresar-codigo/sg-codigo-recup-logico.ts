import type { MappedCodeVerificationData, CodeVerificationRequest } from '../../../types/sg-ingresar-codigo-i-m';
import { mapFrontendToBackendCode } from '../../../types/sg-ingresar-codigo-i-m';
import { triggerSlideLeftExitAnimation, triggerSlideRightExitAnimation } from './sg-codigo-recup-estilo';

export const handleCodeSubmit = (
  e: SubmitEvent,
  formData: MappedCodeVerificationData,
  navigate: (to: string) => void, // Asegúrate de incluir navigate
  onCodeSuccess: (payload: CodeVerificationRequest) => void
): void => {
  e.preventDefault();
  const payload = mapFrontendToBackendCode(formData);

  // Ejecuta la animación hacia la izquierda y luego dispara la acción/redirección
  triggerSlideLeftExitAnimation(() => {
    onCodeSuccess(payload);
    navigate('/reestablecer-contrasena'); // <-- Redirige a la nueva pantalla
  });
};

export const handleBackClick = (
  e: MouseEvent,
  navigate: (to: string) => void
): void => {
  e.preventDefault();

  // Ejecuta la animación hacia la derecha y luego regresa a la pantalla anterior
  triggerSlideRightExitAnimation(() => {
    navigate('/gmail-recuperacion'); // Ajustar la ruta según la configuración del router
  });
};