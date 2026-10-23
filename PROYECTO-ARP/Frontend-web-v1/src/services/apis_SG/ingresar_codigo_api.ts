import type { CodeVerificationRequest } from '../../types/sg-ingresar-codigo-i-m';

const API_BASE_URL = import.meta.env.API_URL ?? 'http://localhost:3000/api';

export interface CodeApiResult {
  ok: boolean;
  status: number;
  mensaje?: string;
  gmail_usuario?: string;
  id_recuperacion?: number; // 👈 NUEVO: Recibimos el ID del backend
  error?: string;
}

export async function verificarCodigoApi(payload: CodeVerificationRequest): Promise<CodeApiResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/verificar-codigo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: data?.error || 'Error al verificar el código.',
      };
    }

    return {
      ok: true,
      status: res.status,
      mensaje: data?.mensaje || 'Código verificado.',
      gmail_usuario: data?.gmail_usuario,
      id_recuperacion: data?.id_recuperacion, // 👈 Lo guardamos en la respuesta
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: 'No se pudo conectar con el servidor.',
    };
  }
}