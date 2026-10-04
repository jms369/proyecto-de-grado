// ============================================================================
// DEFINICIÓN DE INTERFACES, DTOS Y MAPEOS DE PRODUCTOS
// ============================================================================

export interface SGProductoDTO {
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
  tasa_refresco: number; // Corrección: tasa_refresco
  mas_informacion: string;
  imagen_url: string;
}

export interface SGProductoModel {
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
  tasaRefresco: number; // Corrección: tasaRefresco
  masInformacion: string;
  imagenUrl: string;
  isEditing?: boolean;
}

export const mapBackendToFrontendProducto = (dto: SGProductoDTO): SGProductoModel => {
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
    isEditing: false,
  };
};

export const mapFrontendToBackendProducto = (model: SGProductoModel): SGProductoDTO => {
  return {
    id_producto: model.id,
    marca: model.marca,
    modelo: model.modelo,
    precio: Number(model.precio) || 0,
    estado: Boolean(model.estado),
    procesador: model.procesador,
    almacenamiento: Number(model.almacenamiento) || 0,
    ram: Number(model.ram) || 0,
    bateria: Number(model.bateria) || 0,
    puntuacion_antutu: Number(model.puntuacionAntutu) || 0,
    pantalla: model.pantalla,
    camara_principal: Number(model.camaraPrincipal) || 0,
    certificacion_ip: Boolean(model.certificacionIp),
    carga_rapida: Number(model.cargaRapida) || 0,
    camara_frontal: Number(model.camaraFrontal) || 0,
    tasa_refresco: Number(model.tasaRefresco) || 0,
    mas_informacion: model.masInformacion,
    imagen_url: model.imagenUrl,
  };
};

export const sanitizeNumericInput = (value: string): number => {
  const clean = value.replace(/\D/g, '');
  return clean ? parseInt(clean, 10) : 0;
};