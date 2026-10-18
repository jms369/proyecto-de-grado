import type { ResetPasswordRequest } from '../../types/sg-reestablecer-contrasena-i-m';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export interface ResetPasswordApiResult {
  ok: boolean;
  status: number;
  mensaje?: string;
  error?: string;
}

export async function reestablecerContrasenaApi(payload: ResetPasswordRequest): Promise<ResetPasswordApiResult> {
  try {
    const res = await fetch(`${API_URL}/auth/reestablecer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: data?.error || 'Error al restablecer la contraseña.',
      };
    }

    return {
      ok: true,
      status: res.status,
      mensaje: data?.mensaje || 'Contraseña restablecida exitosamente.',
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: 'No se pudo conectar con el servidor.',
    };
  }
}