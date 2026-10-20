// src/types/SW-types/sw-catalogo-productos-i-m.ts

// ============================================================================
// 1. DTO: Representa exactamente lo que viene de la Base de Datos (Snake_case)
// ============================================================================
export interface SGProductoVerDTO {
  id_producto: number;              // int
  url_imagen: string;               // varchar(500) -> CORREGIDO (antes decía url_imagen)
  marca_celular: string;            // varchar(100)
  modelo_celular: string;           // varchar(100)
  precio_celular: number;           // int
  estado_celular: number | boolean; // tinyint(1)
  procesador_celular: string;       // varchar(100)
  almacenamiento_celular: number;   // int
  ram_celular: number;              // int
  bateria_celular: number;          // int
  puntuacion_celular: number;       // int
  pantalla_celular: string;         // varchar(100)
  cam_principal_cel: number;        // int
  certificacionip_celular: number | boolean; // tinyint(1)
  carga_rapida_cel: number;         // int
  cam_frontal_cel: number;          // int
  tasa_refresco_cel: number;        // int
  mas_info_celular: string;         // text
  // Las columnas registro_ac_gmail y creado_en no las necesitamos en el catálogo público
}

// ============================================================================
// 2. MODELO: Representa los datos en el Frontend (CamelCase)
// ============================================================================
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

// ============================================================================
// 3. MAPEADOR (Backend -> Frontend)
// ============================================================================
export const mapBackendToFrontendProductoVer = (dto: SGProductoVerDTO): SGProductoVerModel => {
  return {
    id: String(dto.id_producto),
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
    imagenUrl: dto.url_imagen || '', // CORREGIDO: url_imagen
  };
};