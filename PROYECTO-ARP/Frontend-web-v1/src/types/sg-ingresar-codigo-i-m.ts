// Interfaz para los datos recolectados en la UI (Formulario Frontend)
export interface MappedCodeVerificationData {
  verificationCode: string;
}

// DTO para la petición a la API backend (Paso 2)
export interface CodeVerificationRequest {
  email: string;
  verificationCode: string;
}

/**
 * Mapea la información del formulario de código hacia la estructura DTO esperada por el backend.
 * Recupera el email desde el localStorage (guardado en el paso 1).
 */
export const mapFrontendToBackendCode = (
  data: MappedCodeVerificationData
): CodeVerificationRequest => {
  // Leemos el correo que se guardó en la página anterior
  const correoGuardado = localStorage.getItem('recuperacion_email') || '';

  return {
    email: correoGuardado.trim().toLowerCase(),
    verificationCode: data.verificationCode.trim(),
  };
};