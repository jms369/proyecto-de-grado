// Interfaz para los datos recolectados en la UI (Formulario Frontend)
export interface MappedCodeVerificationData {
  verificationCode: string;
}

// DTO para la petición a la API backend
export interface CodeVerificationRequest {
  codigoVerificacion: string;
}

/**
 * Mapea la información del formulario de código hacia la estructura DTO esperada por el backend
 */
export const mapFrontendToBackendCode = (
  data: MappedCodeVerificationData
): CodeVerificationRequest => {
  return {
    codigoVerificacion: data.verificationCode,
  };
};