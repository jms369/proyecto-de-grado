// Modelo para la respuesta de la API o BD del Logo
export interface HeaderLogoResponse {
  logoUrl: string;
  altText: string;
}

// Modelo de datos procesado en el Frontend
export interface MappedHeaderData {
  imageUrl: string;
  imageAlt: string;
}

// Props que recibe el componente Header
export interface SGHeaderProps {
  title?: string;
  logoUrl?: string;
  onLogout?: () => void;
}

// Mapeador de datos para la URL del logo
export const mapBackendToHeaderLogo = (data?: HeaderLogoResponse): MappedHeaderData => {
  return {
    imageUrl: data?.logoUrl || '',
    imageAlt: data?.altText || 'Logotipo de la empresa',
  };
};