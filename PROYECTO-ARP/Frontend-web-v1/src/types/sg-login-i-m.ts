export interface LoginRequest {
  correoUsuario: string;
  contrasenaUsuario: string;
}

export interface LoginResponse {
  tokenAcceso: string;
  tipoToken: string;
  idUsuario: string;
  nombreCompleto: string;
}

export interface MappedLoginData {
  email: string;
  password: string;
}

/**
 * Mapea los datos del formulario (frontend) hacia el DTO que espera la API (backend)
 */
export const mapFrontendToBackendLogin = (data: MappedLoginData): LoginRequest => {
  return {
    correoUsuario: data.email,
    contrasenaUsuario: data.password,
  };
};