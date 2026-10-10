// ============================================================================
// INTERFACES, DTOS Y MAPEOS AUTÓNOMOS PARA EL ASISTENTE ARP
// ============================================================================

export interface SWAstistenteProductoDTO {
  marca: string;
  modelo: string;
  precio: number;
  almacenamiento: number;
  ram: number;
  bateria: number;
  puntuacion_antutu: number;
  pantalla: string;
  camara_principal: number;
  certificacion_ip: boolean;
  camara_frontal: number;
  tasa_refresco: number;
}

export interface SWAstistenteConfigDTO {
  precioARP: number;
  PrecioARP: boolean;
  CamaraPrincipalARP: boolean;
  CamaraFrontalARP: boolean;
  BateriaARP: boolean;
  CertificacionIPARP: boolean;
  PantallaARP: boolean;
  AlmacenamientoARP: boolean;
  RamARP: boolean;
  AntutuARP: boolean;
  TazaRefrezcoARP: boolean;
}

export interface SWAstistenteResultadoDTO {
  marca: string;
  modelo: string;
  almacenamiento: number;
  ram: number;
  precio: number;
}

export interface SwaProductoProcesadoModel extends SWAstistenteProductoDTO {
  contador: number;
}

export const mapBackendToSwaProducto = (dto: SWAstistenteProductoDTO): SwaProductoProcesadoModel => {
  return {
    marca: dto.marca ?? '',
    modelo: dto.modelo ?? '',
    precio: dto.precio ?? 0,
    almacenamiento: dto.almacenamiento ?? 0,
    ram: dto.ram ?? 0,
    bateria: dto.bateria ?? 0,
    puntuacion_antutu: dto.puntuacion_antutu ?? 0,
    pantalla: dto.pantalla ?? '',
    camara_principal: dto.camara_principal ?? 0,
    certificacion_ip: Boolean(dto.certificacion_ip),
    camara_frontal: dto.camara_frontal ?? 0,
    tasa_refresco: dto.tasa_refresco ?? 0,
    contador: 0,
  };
};

export const mapToResultadoFinal = (model: SwaProductoProcesadoModel): SWAstistenteResultadoDTO => {
  return {
    marca: model.marca,
    modelo: model.modelo,
    almacenamiento: model.almacenamiento,
    ram: model.ram,
    precio: model.precio,
  };
};