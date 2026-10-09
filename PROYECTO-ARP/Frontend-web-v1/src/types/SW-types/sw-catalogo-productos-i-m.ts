// ============================================================================
// INICIO MODIFICACIÓN: Creación de tipos y mapeos para el catálogo
// ============================================================================
export interface SGProductoVerDTO {
  id_producto: string;
  marca: string;
  modelo: string;
  precio: number;
  estado: boolean;
  procesador: string;
  almacenamiento: number;
  ram: number;
  bateria: number;
  puntuacion_antutu: number;
  pantalla: string;
  camara_principal: number;
  certificacion_ip: boolean;
  carga_rapida: number;
  camara_frontal: number;
  tasa_refresco: number;
  mas_informacion: string;
  imagen_url: string;
}

export interface SGProductoVerModel {
  id: string;
  marca: string;
  modelo: string;
  precio: number;
  estado: boolean;
  procesador: string;
  almacenamiento: number;
  ram: number;
  bateria: number;
  puntuacionAntutu: number;
  pantalla: string;
  camaraPrincipal: number;
  certificacionIp: boolean;
  cargaRapida: number;
  camaraFrontal: number;
  tasaRefresco: number;
  masInformacion: string;
  imagenUrl: string;
}

export const mapBackendToFrontendProductoVer = (dto: SGProductoVerDTO): SGProductoVerModel => {
  return {
    id: dto.id_producto,
    marca: dto.marca ?? '',
    modelo: dto.modelo ?? '',
    precio: dto.precio ?? 0,
    estado: Boolean(dto.estado),
    procesador: dto.procesador ?? '',
    almacenamiento: dto.almacenamiento ?? 0,
    ram: dto.ram ?? 0,
    bateria: dto.bateria ?? 0,
    puntuacionAntutu: dto.puntuacion_antutu ?? 0,
    pantalla: dto.pantalla ?? '',
    camaraPrincipal: dto.camara_principal ?? 0,
    certificacionIp: Boolean(dto.certificacion_ip),
    cargaRapida: dto.carga_rapida ?? 0,
    camaraFrontal: dto.camara_frontal ?? 0,
    tasaRefresco: dto.tasa_refresco ?? 0,
    masInformacion: dto.mas_informacion ?? '',
    imagenUrl: dto.imagen_url || '',
  };
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================