// ============================================================================
// INICIO CREACIÓN: Interfaces, DTOs, Validaciones y Mapeos del Módulo Crear Usuario
// ============================================================================

// Modelo Local de Usuario (Frontend)
export interface UsuarioModel {
  id?: string;
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
  gmailUsuario: string;
  rol: string; // 'administrador' | 'trabajador'
  carnetIdentidad: string;
  complemento: string;
  numeroCelular: string;
  direccion: string;
  fechaNacimiento: string;
  grupoSanguineo: string;
  contrasena?: string;
  estado: boolean; // true = Activo, false = Suspendido
}

// Modelo de Filtros de Búsqueda
export interface BusquedaUsuarioFiltro {
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
}

// Errores de Validación del Formulario
export interface UsuarioErrors {
  nombre1?: string;
  nombre2?: string;
  apellido1?: string;
  apellido2?: string;
  gmailUsuario?: string;
  rol?: string;
  carnetIdentidad?: string;
  complemento?: string;
  numeroCelular?: string;
  direccion?: string;
  fechaNacimiento?: string;
  grupoSanguineo?: string;
  contrasena?: string;
  general?: string;
}

// DTO de Backend
export interface UsuarioBackendDTO {
  id?: string;
  first_name: string;
  second_name: string;
  first_surname: string;
  second_surname: string;
  user_email: string;
  role: string;
  ci_number: string;
  ci_complement: string;
  phone_number: string;
  address: string;
  birth_date: string;
  blood_type: string;
  password?: string;
  is_active: boolean;
}

// ============================================================================
// Funciones Sanitizadoras
// ============================================================================
// Para nombre1, nombre2, apellido1, apellido2 (elimina números y caracteres especiales)
export const sanitizeLettersOnly = (val: string): string => val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '');

// Para Gmail (elimina espacios)
export const sanitizeEmail = (val: string): string => val.replace(/\s+/g, '');

// Para Carnet de Identidad (solo números)
export const sanitizeNumbersOnly = (val: string): string => val.replace(/\D/g, '');

// Para Complemento (solo letras y números)
export const sanitizeAlphanumericNoSpaces = (val: string): string => val.replace(/[^a-zA-Z0-9]/g, '');

// Para Celular (solo números y espacios)
export const sanitizePhone = (val: string): string => val.replace(/[^0-9\s]/g, '');

// Para Grupo Sanguíneo (letras y +/- , sin espacios)
export const sanitizeBloodType = (val: string): string => val.replace(/[^a-zA-Z+\-]/g, '');

// Para Contraseña (elimina espacios)
export const sanitizePassword = (val: string): string => val.replace(/\s+/g, '');

// ============================================================================
// Validadores de Contrato
// ============================================================================
export const validateUsuarioForm = (form: UsuarioModel, isNew: boolean = true): UsuarioErrors => {
  const errors: UsuarioErrors = {};

  // Validaciones de nombres y apellidos
  if (!form.nombre1.trim()) errors.nombre1 = 'El primer nombre es obligatorio.';
  if (!form.apellido1.trim()) errors.apellido1 = 'El primer apellido es obligatorio.';

  // Correo
  const lowerEmail = form.gmailUsuario.toLowerCase();
  if (!lowerEmail.endsWith('@gmail.com') && !lowerEmail.endsWith('@hotmail.com')) {
    errors.gmailUsuario = 'El correo debe terminar en @gmail.com o @hotmail.com.';
  }

  // Carnet
  if (form.carnetIdentidad.length < 7) {
    errors.carnetIdentidad = 'El C.I. debe tener al menos 7 dígitos numéricos.';
  }

  // Celular
  const digitsOnlyPhone = form.numeroCelular.replace(/\s/g, '');
  if (digitsOnlyPhone.length < 8) {
    errors.numeroCelular = 'El celular debe tener al menos 8 dígitos.';
  }

  // Contraseña (Solo requerida si se crea un usuario)
  if (isNew) {
    const pwd = form.contrasena || '';
    const hasMinLen = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);

    if (!hasMinLen || !hasUpper || !hasLower || !hasNumber) {
      errors.contrasena = 'La contraseña requiere mín. 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.';
    }
  }

  return errors;
};

// ============================================================================
// Mapeos Frontend <-> Backend
// ============================================================================
export const mapFrontendToBackendUsuario = (data: UsuarioModel): UsuarioBackendDTO => ({
  id: data.id,
  first_name: data.nombre1.trim(),
  second_name: data.nombre2.trim(),
  first_surname: data.apellido1.trim(),
  second_surname: data.apellido2.trim(),
  user_email: data.gmailUsuario.toLowerCase().trim(),
  role: data.rol,
  ci_number: data.carnetIdentidad.trim(),
  ci_complement: data.complemento.trim().toUpperCase(),
  phone_number: data.numeroCelular.trim(),
  address: data.direccion.trim(),
  birth_date: data.fechaNacimiento,
  blood_type: data.grupoSanguineo.trim().toUpperCase(),
  password: data.contrasena ? data.contrasena : undefined,
  is_active: data.estado
});

export const mapBackendToFrontendUsuario = (dto: UsuarioBackendDTO): UsuarioModel => ({
  id: dto.id || Math.random().toString(36).substring(2, 9),
  nombre1: dto.first_name || '',
  nombre2: dto.second_name || '',
  apellido1: dto.first_surname || '',
  apellido2: dto.second_surname || '',
  gmailUsuario: dto.user_email || '',
  rol: dto.role || 'trabajador',
  carnetIdentidad: dto.ci_number || '',
  complemento: dto.ci_complement || '',
  numeroCelular: dto.phone_number || '',
  direccion: dto.address || '',
  fechaNacimiento: dto.birth_date || '',
  grupoSanguineo: dto.blood_type || '',
  contrasena: '',
  estado: dto.is_active ?? true
});

// ============================================================================
// FIN CREACIÓN
// ============================================================================