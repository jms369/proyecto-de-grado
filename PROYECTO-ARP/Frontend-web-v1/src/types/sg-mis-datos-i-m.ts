// src/types/sg-mis-datos-i-m.ts

// ============================================================================
// 1. INTERFACES
// ============================================================================

// Modelo del Frontend
export interface MisDatosForm {
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
}

export interface MisDatosErrors {
  nombre1?: string;
  nombre2?: string;
  apellido1?: string;
  apellido2?: string;
  carnetIdentidad?: string;
  complemento?: string;
  numeroCelular?: string;
  direccion?: string;
  fechaNacimiento?: string;
  grupoSanguineo?: string;
  general?: string;
}

// ⚠️ CORRECCIÓN: DTO con los nombres exactos que espera el backend
export interface MisDatosBackendDTO {
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
  carnetIdentidad: string;
  complemento: string;
  numeroCelular: string;
  direccion: string;
  fechaNacimiento: string | null;
  grupoSanguineo: string;
}

// ============================================================================
// 2. SANITIZADORES
// ============================================================================
export const sanitizeLettersOnly = (val: string): string => val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
export const sanitizeAlphanumeric = (val: string): string => val.replace(/[^a-zA-Z0-9]/g, '');
export const sanitizeNumbersOnly = (val: string): string => val.replace(/\D/g, '');

// ============================================================================
// 3. MAPEADORES
// ============================================================================

// A. Frontend -> Backend (para enviar al actualizar)
export const mapFrontendToBackendMisDatos = (data: MisDatosForm): MisDatosBackendDTO => ({
  nombre1: data.nombre1.trim(),
  nombre2: data.nombre2.trim(),
  apellido1: data.apellido1.trim(),
  apellido2: data.apellido2.trim(),
  carnetIdentidad: data.carnetIdentidad.trim(),
  complemento: data.complemento.trim().toUpperCase(),
  numeroCelular: data.numeroCelular.trim(),
  direccion: data.direccion.trim(),
  fechaNacimiento: data.fechaNacimiento || null,
  grupoSanguineo: data.grupoSanguineo.trim().toUpperCase(),
});

// B. Backend -> Frontend (para cargar los datos al iniciar)
export const mapBackendToFrontendMisDatos = (dto: any): MisDatosForm => ({
  nombre1: dto.primer_nombre_sg || '',
  nombre2: dto.segundo_nombre_sg || '',
  apellido1: dto.primer_apellido_sg || '',
  apellido2: dto.segundo_apellido_sg || '',
  gmailUsuario: dto.gmail1_sg || '',
  rol: dto.rol_sg || '',
  carnetIdentidad: dto.carneti_sg || '',
  complemento: dto.complementoci_sg || '',
  numeroCelular: dto.numero_celular_sg || '',
  direccion: dto.direccion_sg || '',
  fechaNacimiento: dto.fecha_nac_sg ? String(dto.fecha_nac_sg).split('T')[0] : '',
  grupoSanguineo: dto.grupo_sang_sg || '',
});