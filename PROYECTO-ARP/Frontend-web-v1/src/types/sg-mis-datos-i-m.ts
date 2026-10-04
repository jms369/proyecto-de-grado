// Estado Local del Formulario (Frontend)
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

// DTO de Backend
export interface MisDatosBackendDTO {
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
}

// Funciones Sanitizadoras
export const sanitizeLettersOnly = (val: string): string => val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
export const sanitizeAlphanumeric = (val: string): string => val.replace(/[^a-zA-Z0-9]/g, '');
export const sanitizeNumbersOnly = (val: string): string => val.replace(/\D/g, '');

// Mapeos Frontend <-> Backend
export const mapFrontendToBackendMisDatos = (data: MisDatosForm): MisDatosBackendDTO => ({
  first_name: data.nombre1.trim(),
  second_name: data.nombre2.trim(),
  first_surname: data.apellido1.trim(),
  second_surname: data.apellido2.trim(),
  user_email: data.gmailUsuario,
  role: data.rol,
  ci_number: data.carnetIdentidad.trim(),
  ci_complement: data.complemento.trim().toUpperCase(),
  phone_number: data.numeroCelular.trim(),
  address: data.direccion.trim(),
  birth_date: data.fechaNacimiento,
  blood_type: data.grupoSanguineo.trim().toUpperCase(),
});

export const mapBackendToFrontendMisDatos = (dto: MisDatosBackendDTO): MisDatosForm => ({
  nombre1: dto.first_name || '',
  nombre2: dto.second_name || '',
  apellido1: dto.first_surname || '',
  apellido2: dto.second_surname || '',
  gmailUsuario: dto.user_email || '',
  rol: dto.role || '',
  carnetIdentidad: dto.ci_number || '',
  complemento: dto.ci_complement || '',
  numeroCelular: dto.phone_number || '',
  direccion: dto.address || '',
  fechaNacimiento: dto.birth_date || '',
  grupoSanguineo: dto.blood_type || '',
});