
// src/types/sg-editar-productos-i-m.ts

export interface SGProductoDTO {
  id_producto: number; // La BD lo envía como número
  marca_celular: string;
  modelo_celular: string;
  precio_celular: number;
  estado_celular: boolean | number;
  procesador_celular: string;
  almacenamiento_celular: number;
  ram_celular: number;
  bateria_celular: number;
  puntuacion_celular: number;
  pantalla_celular: string;
  cam_principal_cel: number;
  certificacionip_celular: boolean | number;
  carga_rapida_cel: number;
  cam_frontal_cel: number;
  tasa_refresco_cel: number;
  mas_info_celular: string;
  url_imagen: string;
}

export interface SGProductoModel {
  id: string; // Usamos string en el frontend para el manejo de inputs, pero lo convertimos al vuelo
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
  isEditing?: boolean;
}

export const mapBackendToFrontendProducto = (dto: SGProductoDTO): SGProductoModel => {
  return {
    id: dto.id_producto ? String(dto.id_producto) : '', // Convertimos a String para el frontend
    marca: dto.marca_celular ?? '',
    modelo: dto.modelo_celular ?? '',
    precio: Number(dto.precio_celular) || 0,
    estado: Boolean(dto.estado_celular),
    procesador: dto.procesador_celular ?? '',
    almacenamiento: Number(dto.almacenamiento_celular) || 0,
    ram: Number(dto.ram_celular) || 0,
    bateria: Number(dto.bateria_celular) || 0,
    puntuacionAntutu: Number(dto.puntuacion_celular) || 0,
    pantalla: dto.pantalla_celular ?? '',
    camaraPrincipal: Number(dto.cam_principal_cel) || 0,
    certificacionIp: Boolean(dto.certificacionip_celular),
    cargaRapida: Number(dto.carga_rapida_cel) || 0,
    camaraFrontal: Number(dto.cam_frontal_cel) || 0,
    tasaRefresco: Number(dto.tasa_refresco_cel) || 0,
    masInformacion: dto.mas_info_celular ?? '',
    imagenUrl: dto.url_imagen || '',
    isEditing: false,
  };
};

export const mapFrontendToBackendProducto = (model: SGProductoModel): SGProductoDTO => {
  return {
    id_producto: model.id ? Number(model.id) : 0, 
    marca_celular: model.marca,
    modelo_celular: model.modelo,
    precio_celular: Number(model.precio) || 0,
    estado_celular: model.estado ? 1 : 0,
    procesador_celular: model.procesador,
    almacenamiento_celular: Number(model.almacenamiento) || 0,
    ram_celular: Number(model.ram) || 0,
    bateria_celular: Number(model.bateria) || 0,
    puntuacion_celular: Number(model.puntuacionAntutu) || 0,
    pantalla_celular: model.pantalla,
    cam_principal_cel: Number(model.camaraPrincipal) || 0,
    certificacionip_celular: model.certificacionIp ? 1 : 0,
    carga_rapida_cel: Number(model.cargaRapida) || 0,
    cam_frontal_cel: Number(model.camaraFrontal) || 0,
    tasa_refresco_cel: Number(model.tasaRefresco) || 0,
    mas_info_celular: model.masInformacion,
    url_imagen: model.imagenUrl,
  };
};

// Agrega esta función al final del archivo
export const sanitizeNumericInput = (value: string): number => {
  const clean = value.replace(/\D/g, '');
  return clean ? parseInt(clean, 10) : 0;
};