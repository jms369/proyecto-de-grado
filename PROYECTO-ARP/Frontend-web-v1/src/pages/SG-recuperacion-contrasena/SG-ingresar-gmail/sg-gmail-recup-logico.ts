import type { MappedGmailRecoveryData, RecoveryEmailRequest } from '../../../types/sg-ingresar-gmail-i-m';
import { mapFrontendToBackendRecovery } from '../../../types/sg-ingresar-gmail-i-m';
import { triggerSlideLeftExitAnimation, triggerBackAnimation } from './sg-gmail-recup-estilo';
import { solicitarRecuperacionApi } from '../../../services/apis_SG/ingresar_gmail_api'; // Ajusta la ruta si es necesario

export const handleRecoverySubmit = async (
  e: SubmitEvent,
  formData: MappedGmailRecoveryData,
  navigate: (to: string) => void,
  onRecoverySuccess: (payload: RecoveryEmailRequest) => void
): Promise<void> => {
  e.preventDefault();
  
  const payload = mapFrontendToBackendRecovery(formData);

  // 1. Llamamos al backend
  const result = await solicitarRecuperacionApi(payload);

  // 2. Si hay error (correo no existe o inhabilitado), lo mostramos y NO avanzamos
  if (!result.ok) {
    alert(result.error); // (Puedes cambiar esto por un toast o mensaje visual)
    return;
  }

  // 3. 🔒 GUARDAMOS EL CORREO EN EL NAVEGADOR (¡Esto es lo que faltaba!)
  localStorage.setItem('recuperacion_email', payload.email);

  // 4. Si el backend confirma que el correo existe y el código fue enviado, animamos y avanzamos
  triggerSlideLeftExitAnimation(() => {
    onRecoverySuccess(payload);
    navigate('/codigo-recuperacion'); // Avanza a la pantalla donde se ingresa el código
  });
};

export const handleBackClick = (
  e: MouseEvent,
  navigate: (to: string) => void
): void => {
  e.preventDefault();
  triggerBackAnimation(() => {
    navigate('/inicioSG');
  });
};