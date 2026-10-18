import type { MappedResetPasswordData, ResetPasswordRequest } from '../../../types/sg-reestablecer-contrasena-i-m';
import { mapFrontendToBackendReset, validatePasswordFormat } from '../../../types/sg-reestablecer-contrasena-i-m';
import { triggerSlideLeftExitAnimation } from './sg-nue-contrasena-estilo';
import { reestablecerContrasenaApi } from '../../../services/apis_SG/reestablecer_contrasena_api';

export const handleResetPasswordSubmit = async (
  e: SubmitEvent,
  formData: MappedResetPasswordData,
  setError: (msg: string | null) => void,
  onSuccess: (payload: ResetPasswordRequest) => void,
  navigate: (to: string) => void
): Promise<void> => {
  e.preventDefault();
  setError(null);

  // 1. Validar que el usuario no haya entrado directo sin pasar por los otros pasos
  const idGuardado = localStorage.getItem('recuperacion_id');
  if (!idGuardado || idGuardado === '0') {
    setError('No se encontró una sesión de recuperación válida. Vuelva a empezar.');
    setTimeout(() => navigate('/gmail-recuperacion'), 2000);
    return;
  }

  // 2. Validar formato de contraseña en el frontend (UX rápida)
  if (!validatePasswordFormat(formData.newPassword)) {
    setError('La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.');
    return;
  }

  // 3. Validar que ambas contraseñas coincidan
  if (formData.newPassword !== formData.confirmPassword) {
    setError('Las contraseñas no coinciden.');
    return;
  }

  const payload = mapFrontendToBackendReset(formData);

  // 4. Enviar al backend
  const result = await reestablecerContrasenaApi(payload);

  if (!result.ok) {
    setError(result.error || 'Error al cambiar la contraseña.');
    return;
  }

  // 5. Limpiar el localStorage y ejecutar animación de salida
  localStorage.removeItem('recuperacion_id');

  triggerSlideLeftExitAnimation(() => {
    onSuccess(payload);
    navigate('/inicioSG'); // Redirige al login
  });
};