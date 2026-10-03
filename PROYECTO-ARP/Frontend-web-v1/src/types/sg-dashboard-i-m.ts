/**
 * Interfaces, Tipos, Mapeos y Validaciones para SG-Dashboard
 */

export type UserRole = 'admin' | 'worker';

export interface UserSessionData {
  role: UserRole;
  email: string;
  name?: string;
}

export interface DashboardCardItem {
  id: string;
  title: string;
  iconSvg: string;
  description: string;
  requiredRole?: UserRole;
  actionRoute?: string;
}

export interface RecoveryEmailForm {
  recoveryEmail: string;
}

// Regex de validación de correo electrónico
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateRecoveryEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

// Sanitización de inputs
export const sanitizeEmailInput = (value: string): string => {
  return value.replace(/\s+/g, '');
};