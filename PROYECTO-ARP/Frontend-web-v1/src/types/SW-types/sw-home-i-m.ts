// src/types/SW-types/sw-home-i-m.ts

export interface CarouselImageBackendDTO {
  id_imagen: number;
  url_ruta: string;
  texto_alternativo: string;
}

export interface CarouselImage {
  id: number;
  url: string;
  alt: string;
}

export interface InfoBackendDTO {
  direccion_calle: string;
  ciudad_pais: string;
  horarios_dias: string;
}

export interface HomeInfo {
  calle: string;
  ubicacion: string;
  horarios: string;
}

// ============================================================================
// INICIO MODIFICACIÓN: Mapeo de datos para Carrusel e Información
// ============================================================================
export const mapCarouselImagesToFrontend = (data: CarouselImageBackendDTO[]): CarouselImage[] => {
  return data.map(item => ({
    id: item.id_imagen,
    url: item.url_ruta,
    alt: item.texto_alternativo
  }));
};

export const mapInfoToFrontend = (data: InfoBackendDTO): HomeInfo => {
  return {
    calle: data.direccion_calle,
    ubicacion: data.ciudad_pais,
    horarios: data.horarios_dias
  };
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================