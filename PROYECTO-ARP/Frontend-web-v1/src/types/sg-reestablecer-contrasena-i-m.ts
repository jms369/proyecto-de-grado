// Interfaz para la data recolectada en el formulario del Frontend
export interface MappedResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}

// DTO para enviar al Backend (¡Ahora enviamos el ID!)
export interface ResetPasswordRequest {
  id_recuperacion: number;
  nuevaContrasena: string;
}

/**
 * Valida los requisitos de la contraseña en el frontend (solo para UX):
 * - Mínimo 8 caracteres
 * - Al menos 1 mayúscula
 * - Al menos 1 minúscula
 * - Al menos 1 número
 */
export const validatePasswordFormat = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Mapea la data del frontend al DTO esperado por la API, incluyendo el ID.
 */
export const mapFrontendToBackendReset = (
  data: MappedResetPasswordData
): ResetPasswordRequest => {
  // Leemos el ID guardado en el Paso 2
  const idGuardado = localStorage.getItem('recuperacion_id') || '';
  
  return {
    id_recuperacion: Number(idGuardado),
    nuevaContrasena: data.newPassword,
  };
};