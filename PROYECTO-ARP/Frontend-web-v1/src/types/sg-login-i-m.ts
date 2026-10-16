export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  mensaje: string;
  cookie_sesion: string;
  data_sesion: {
    id_usuario: string;
    email: string;
    rol: string;
    nombre?: string;
    apellido?: string;
    [key: string]: unknown;
  };
  rol: string;
}

export interface MappedLoginData {
  email: string;
  password: string;
}

/**
 * Mapea los datos del formulario (frontend) al DTO que espera la API.
 * El backend espera: { email, password }
 */
export const mapFrontendToBackendLogin = (data: MappedLoginData): LoginRequest => {
  return {
    email: data.email.trim().toLowerCase(),
    password: data.password,
  };
};