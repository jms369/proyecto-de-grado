/**
 * Interfaces, Tipos y Helpers para SG-Dashboard
 */

// 👈 Roles reales que vienen de la base de datos
export type BackendRole = 'ADMINISTRADOR' | 'TRABAJADOR' | 'SUPERADMIN';

// 👈 Ahora la sesión solo contiene el rol, ya que es lo único que envía el backend
export interface UserSessionData {
  role: BackendRole;
}

// (Opcional) Si usas esta interfaz para armar las tarjetas del dashboard
export interface DashboardCardItem {
  id: string;
  title: string;
  iconSvg: string;
  description: string;
  requiredRole?: BackendRole | BackendRole[];
  actionRoute?: string;
}

// ==========================================
// HELPERS DE ROLES (Para usar en la UI)
// ==========================================

/**
 * Determina si el usuario tiene permisos de administrador.
 * ADMINISTRADOR y SUPERADMIN tienen el mismo nivel.
 */
export const esAdmin = (role?: BackendRole): boolean => {
  return role === 'ADMINISTRADOR' || role === 'SUPERADMIN';
};

/**
 * Determina si el usuario es un trabajador (sin permisos de admin).
 */
export const esTrabajador = (role?: BackendRole): boolean => {
  return role === 'TRABAJADOR';
};

// Regex de validación de correo electrónico (por si lo usas en otros lados)
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateRecoveryEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

export const sanitizeEmailInput = (value: string): string => {
  return value.replace(/\s+/g, '');
};