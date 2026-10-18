// Interfaz para la data recolectada en la UI
export interface MappedGmailRecoveryData {
  email: string;
}

// DTO para la petición de la API de recuperación (Backend)
export interface RecoveryEmailRequest {
  email: string;
}

/**
 * Mapea la información del formulario de Gmail hacia la estructura DTO esperada por la API
 */
export const mapFrontendToBackendRecovery = (
  data: MappedGmailRecoveryData
): RecoveryEmailRequest => {
  return {
    email: data.email.trim().toLowerCase(), // Limpieza básica
  };
};