// Interfaz para la data recolectada en el formulario del Frontend
export interface MappedResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}

// DTO para enviar al Backend
export interface ResetPasswordRequest {
  nuevaContrasena: string;
}

/**
 * Valida los requisitos de la contraseña:
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
 * Mapea la data del frontend al DTO esperado por la API
 */
export const mapFrontendToBackendReset = (
  data: MappedResetPasswordData
): ResetPasswordRequest => {
  return {
    nuevaContrasena: data.newPassword,
  };
};