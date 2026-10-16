import type { LoginRequest, LoginResponse } from '../../types/sg-login-i-m';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export interface LoginApiResult {
  ok: boolean;
  status: number;
  data?: LoginResponse;
  error?: string;
}

/**
 * Envía credenciales al backend y devuelve la respuesta con la cookie de sesión y el rol.
 * Usa credentials:'include' para que el navegador guarde la cookie_sesion.
 */
export async function loginApi(payload: LoginRequest): Promise<LoginApiResult> {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // 👈 imprescindible para la cookie de sesión
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: data?.error || 'Error al iniciar sesión.',
      };
    }

    return { ok: true, status: res.status, data: data as LoginResponse };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: 'No se pudo conectar con el servidor.',
    };
  }
}