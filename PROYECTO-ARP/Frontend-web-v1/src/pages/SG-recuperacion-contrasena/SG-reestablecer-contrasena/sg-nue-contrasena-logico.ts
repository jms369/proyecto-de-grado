import type { MappedResetPasswordData, ResetPasswordRequest } from '../../../types/sg-reestablecer-contrasena-i-m';
import { mapFrontendToBackendReset, validatePasswordFormat } from '../../../types/sg-reestablecer-contrasena-i-m';
import { triggerSlideLeftExitAnimation } from './sg-nue-contrasena-estilo';

export const handleResetPasswordSubmit = (
  e: SubmitEvent,
  formData: MappedResetPasswordData,
  setError: (msg: string | null) => void,
  onSuccess: (payload: ResetPasswordRequest) => void,
  navigate: (to: string) => void
): void => {
  e.preventDefault();
  setError(null);

  // 1. Validar formato de contraseña
  if (!validatePasswordFormat(formData.newPassword)) {
    setError('La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.');
    return;
  }

  // 2. Validar que ambas contraseñas coincidan
  if (formData.newPassword !== formData.confirmPassword) {
    setError('Las contraseñas no coinciden.');
    return;
  }

  const payload = mapFrontendToBackendReset(formData);

  // 3. Ejecutar animación de salida y redirigir
  triggerSlideLeftExitAnimation(() => {
    onSuccess(payload);
    navigate('/'); // Redirige al login o a la página deseada
  });
};