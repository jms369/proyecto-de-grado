// src/types/sg-crear-usuario-i-m.ts

// ============================================================================
// 1. INTERFACES Y MODELOS
// ============================================================================

export interface UsuarioModel {
  id?: string;
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
  gmailUsuario: string;
  rol: string;
  carnetIdentidad: string;
  complemento: string;
  numeroCelular: string;
  direccion: string;
  fechaNacimiento: string;
  grupoSanguineo: string;
  contrasena?: string;
  estado: boolean;
}

export interface BusquedaUsuarioFiltro {
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
}

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

// ============================================================================
// 2. FUNCIONES SANITIZADORAS
// ============================================================================

export const sanitizeLettersOnly = (val: string): string => val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '');
export const sanitizeEmail = (val: string): string => val.replace(/\s+/g, '');
export const sanitizeNumbersOnly = (val: string): string => val.replace(/\D/g, '');
export const sanitizeAlphanumericNoSpaces = (val: string): string => val.replace(/[^a-zA-Z0-9]/g, '');
export const sanitizePhone = (val: string): string => val.replace(/[^0-9\s]/g, '');
export const sanitizeBloodType = (val: string): string => val.replace(/[^a-zA-Z+\-]/g, '');
export const sanitizePassword = (val: string): string => val.replace(/\s+/g, '');

// ============================================================================
// 3. VALIDADOR DE FORMULARIO
// ============================================================================

export const validateUsuarioForm = (form: UsuarioModel, isNew: boolean = true): UsuarioErrors => {
  const errors: UsuarioErrors = {};

  if (!form.nombre1.trim()) errors.nombre1 = 'El primer nombre es obligatorio.';
  if (!form.apellido1.trim()) errors.apellido1 = 'El primer apellido es obligatorio.';

  const lowerEmail = form.gmailUsuario.toLowerCase();
  if (!lowerEmail.endsWith('@gmail.com') && !lowerEmail.endsWith('@hotmail.com')) {
    errors.gmailUsuario = 'El correo debe terminar en @gmail.com o @hotmail.com.';
  }

  if (form.carnetIdentidad.length < 7) {
    errors.carnetIdentidad = 'El C.I. debe tener al menos 7 dígitos numéricos.';
  }

  const digitsOnlyPhone = form.numeroCelular.replace(/\s/g, '');
  if (digitsOnlyPhone.length < 8) {
    errors.numeroCelular = 'El celular debe tener al menos 8 dígitos.';
  }

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
// 4. MAPEADORES (FRONTEND <-> BACKEND)
// ============================================================================

// A. Mapeador de Llegada (Backend -> Frontend)
// Recibe los datos crudos de MySQL (snake_case) y los convierte al modelo del frontend.
export const mapBackendToFrontendUsuario = (dto: any): UsuarioModel => ({
  id: dto.id_usuario_sg ? String(dto.id_usuario_sg) : Math.random().toString(36).substring(2, 9),
  nombre1: dto.primer_nombre_sg || '',
  nombre2: dto.segundo_nombre_sg || '',
  apellido1: dto.primer_apellido_sg || '',
  apellido2: dto.segundo_apellido_sg || '',
  gmailUsuario: dto.gmail1_sg || '',
  rol: dto.rol_sg ? dto.rol_sg.toUpperCase() : 'TRABAJADOR',
  carnetIdentidad: dto.carneti_sg || '',
  complemento: dto.complementoci_sg || '',
  numeroCelular: dto.numero_celular_sg || '',
  direccion: dto.direccion_sg || '',
  fechaNacimiento: dto.fecha_nac_sg ? String(dto.fecha_nac_sg).split('T')[0] : '',
  grupoSanguineo: dto.grupo_sang_sg || '',
  contrasena: '',
  estado: dto.estado_usuario_sg === 1 || dto.estado_usuario_sg === true
});

// B. Mapeador Ligero (Frontend -> Backend) para la TABLA
// Solo envía los campos que la tabla muestra.
export const mapTablaToBackend = (data: UsuarioModel) => ({
  nombre1: data.nombre1.trim(),
  nombre2: data.nombre2.trim(),
  apellido1: data.apellido1.trim(),
  apellido2: data.apellido2.trim(),
  gmailUsuario: data.gmailUsuario.toLowerCase().trim(),
  rol: data.rol,
  estado: data.estado,
  // Enviamos los campos no editables en la tabla como null para no sobreescribir datos en la BD
  carnetIdentidad: null,
  complemento: null,
  numeroCelular: null,
  direccion: null,
  fechaNacimiento: null,
  grupoSanguineo: null,
});

// C. Mapeador Completo (Frontend -> Backend) para las TARJETAS
// Envía todos los campos del formulario robusto.
export const mapTarjetaToBackend = (data: UsuarioModel) => ({
  nombre1: data.nombre1.trim(),
  nombre2: data.nombre2.trim(),
  apellido1: data.apellido1.trim(),
  apellido2: data.apellido2.trim(),
  gmailUsuario: data.gmailUsuario.toLowerCase().trim(),
  rol: data.rol,
  carnetIdentidad: data.carnetIdentidad.trim(),
  complemento: data.complemento.trim().toUpperCase(),
  numeroCelular: data.numeroCelular.trim(),
  direccion: data.direccion.trim(),
  fechaNacimiento: data.fechaNacimiento || null,
  grupoSanguineo: data.grupoSanguineo.trim().toUpperCase(),
  estado: data.estado,
  contrasena: data.contrasena // <--- ⚠️ ESTA ES LA LÍNEA QUE FALTA
});