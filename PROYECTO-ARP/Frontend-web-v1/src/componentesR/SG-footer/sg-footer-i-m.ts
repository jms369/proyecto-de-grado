// Modelo DTO del Backend (si se reciben datos del sistema a futuro)
export interface FooterInfoResponse {
  companyName: string;
  systemVersion: string;
}

// Modelo procesado en el Frontend
export interface MappedFooterData {
  text: string;
  version: string;
  year: number;
}

// Props configurables para el Footer
export interface SGFooterProps {
  customText?: string;
  version?: string;
}

// Mapeador de datos para el Footer
export const mapBackendToFooterData = (data?: FooterInfoResponse): MappedFooterData => {
  return {
    text: data?.companyName || 'Sistema de Gestión',
    version: data?.systemVersion || 'v1.0.0',
    year: new Date().getFullYear(),
  };
};