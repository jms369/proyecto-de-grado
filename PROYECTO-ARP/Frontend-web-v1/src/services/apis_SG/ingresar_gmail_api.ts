import type { RecoveryEmailRequest } from '../../types/sg-ingresar-gmail-i-m';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export interface RecoveryApiResult {
  ok: boolean;
  status: number;
  mensaje?: string;
  error?: string;
}

/**
 * Envía el correo al backend para solicitar el código de recuperación.
 */
export async function solicitarRecuperacionApi(payload: RecoveryEmailRequest): Promise<RecoveryApiResult> {
  try {
    const res = await fetch(`${API_URL}/auth/recuperar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // No usamos credentials: 'include' porque para recuperar contraseña no hay sesión activa aún
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: data?.error || 'Error al solicitar la recuperación.',
      };
    }

    return {
      ok: true,
      status: res.status,
      mensaje: data?.mensaje || 'Código enviado exitosamente.',
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: 'No se pudo conectar con el servidor.',
    };
  }
}