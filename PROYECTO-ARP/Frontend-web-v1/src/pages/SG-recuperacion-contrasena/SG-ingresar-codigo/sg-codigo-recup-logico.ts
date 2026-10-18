import type { MappedCodeVerificationData, CodeVerificationRequest } from '../../../types/sg-ingresar-codigo-i-m';
import { mapFrontendToBackendCode } from '../../../types/sg-ingresar-codigo-i-m';
import { triggerSlideLeftExitAnimation, triggerSlideRightExitAnimation } from './sg-codigo-recup-estilo';
import { verificarCodigoApi } from '../../../services/apis_SG/ingresar_codigo_api';

export const handleCodeSubmit = async (
  e: SubmitEvent,
  formData: MappedCodeVerificationData,
  navigate: (to: string) => void,
  onCodeSuccess: (payload: CodeVerificationRequest) => void
): Promise<void> => {
  e.preventDefault();
  
  const payload = mapFrontendToBackendCode(formData);

  // Validar que exista un correo en localStorage
  if (!payload.email) {
    alert('No se encontró el correo de recuperación. Vuelva a empezar.');
    navigate('/gmail-recuperacion');
    return;
  }

  // 1. Llamar al backend
  const result = await verificarCodigoApi(payload);

  // 2. Si el código es incorrecto o expiró, avisamos y no avanzamos
  if (!result.ok) {
    alert(result.error);
    return;
  }

  // 3. 🔒 Guardamos el ID de recuperación (¡La corrección clave!)
  if (result.id_recuperacion) {
    localStorage.setItem('recuperacion_id', result.id_recuperacion.toString());
  }
  
  // Limpiamos el correo porque ya no lo necesitamos
  localStorage.removeItem('recuperacion_email');

  // 4. Animación y navegación al paso 3
  triggerSlideLeftExitAnimation(() => {
    onCodeSuccess(payload);
    navigate('/reestablecer-contrasena'); 
  });
};

export const handleBackClick = (
  e: MouseEvent,
  navigate: (to: string) => void
): void => {
  e.preventDefault();
  triggerSlideRightExitAnimation(() => {
    navigate('/gmail-recuperacion'); 
  });
};