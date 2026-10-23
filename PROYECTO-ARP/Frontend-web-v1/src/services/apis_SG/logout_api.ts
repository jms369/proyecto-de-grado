const API_BASE_URL = import.meta.env.API_URL ?? 'http://localhost:3000/api';

export interface LogoutApiResult {
  ok: boolean;
  status: number;
  mensaje?: string;
  error?: string;
}

/**
 * Llama al backend para cerrar la sesión activa.
 * El backend:
 *  - Elimina la fila de la tabla SESIONES
 *  - Limpia sesiones expiradas
 *  - Envía Set-Cookie con Max-Age=0 para borrar la cookie del navegador
 */
export async function logoutApi(): Promise<LogoutApiResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // 👈 imprescindible para enviar/recibir cookies
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: data?.error || 'Error al cerrar sesión.',
      };
    }

    return {
      ok: true,
      status: res.status,
      mensaje: data?.mensaje || 'Sesión cerrada exitosamente.',
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: 'No se pudo conectar con el servidor.',
    };
  }
}