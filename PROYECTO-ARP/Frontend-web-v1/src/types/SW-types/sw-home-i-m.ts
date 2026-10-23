// src/types/SW-types/sw-home-i-m.ts

const BACKEND_HOST = import.meta.env.BACKEND_URL || 'http://localhost:3000';

// ============================================================================
// 1. DTO (Lo que viene del Backend)
// ============================================================================
export interface CarouselImageBackendDTO {
  id_oferta: number;
  url_oferta_sw: string;
}

export interface HomeInfoBackendDTO {
  ofertas: CarouselImageBackendDTO[];
  masInformacion: string | null; // <-- Este es el campo de la BD
  ubicacion: string | null;
}

// ============================================================================
// 2. MODELO (Lo que usa el Frontend)
// ============================================================================
export interface CarouselImage {
  id: number;
  url: string;
  alt: string;
}

export interface HomeInfo {
  ubicacion: string | null;
  masInformacion: string | null; // <-- Lo llamamos igual que en la BD para claridad
}

// ============================================================================
// 3. MAPEADORES
// ============================================================================
export const mapCarouselImagesToFrontend = (data: CarouselImageBackendDTO[]): CarouselImage[] => {
  return data.map((item, index) => ({
    id: item.id_oferta,
    url: `${BACKEND_HOST}${item.url_oferta_sw}`,
    alt: `Oferta ${index + 1}`
  }));
};

export const mapInfoToFrontend = (data: HomeInfoBackendDTO): HomeInfo => {
  return {
    // Si viene dato de la BD, se usa. Si no, se queda en null.
    ubicacion: data.ubicacion || null,
    masInformacion: data.masInformacion || null
  };
};