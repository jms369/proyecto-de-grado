// ./sw-asistente-arp-i-m.ts

// ============================================================================
// 1. DTO: Lo que viene del Backend (nombres exactos de la BD)
// ============================================================================
export interface SWAstistenteProductoDTO {
  id_producto: number;
  marca_celular: string;          // Antes: marca
  modelo_celular: string;         // Antes: modelo
  precio_celular: number;         // Antes: precio
  almacenamiento_celular: number; // Antes: almacenamiento
  ram_celular: number;            // Antes: ram
  bateria_celular: number;        // Antes: bateria
  puntuacion_celular: number;     // Antes: puntuacion_antutu
  pantalla_celular: string;       // Antes: pantalla
  cam_principal_cel: number;      // Antes: camara_principal
  certificacionip_celular: number | boolean; // Antes: certificacion_ip
  cam_frontal_cel: number;        // Antes: camara_frontal
  tasa_refresco_cel: number;      // Antes: tasa_refresco
}

// ============================================================================
// 2. CONFIGURACIÓN (Lo que el usuario selecciona en la interfaz)
// ============================================================================
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

// ============================================================================
// 3. RESULTADO FINAL (Lo que se devuelve para renderizar)
// ============================================================================
export interface SWAstistenteResultadoDTO {
  marca: string;
  modelo: string;
  almacenamiento: number;
  ram: number;
  precio: number;
}

// ============================================================================
// 4. MODELO PROCESADO (Interno del algoritmo, con contador)
// ============================================================================
export interface SwaProductoProcesadoModel {
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
  contador: number;
}

// ============================================================================
// 5. MAPEADOR: Backend (BD) -> Modelo Procesado (Algoritmo)
// ============================================================================
export const mapBackendToSwaProducto = (dto: SWAstistenteProductoDTO): SwaProductoProcesadoModel => {
  return {
    marca: dto.marca_celular ?? '',
    modelo: dto.modelo_celular ?? '',
    precio: Number(dto.precio_celular) || 0,
    almacenamiento: Number(dto.almacenamiento_celular) || 0,
    ram: Number(dto.ram_celular) || 0,
    bateria: Number(dto.bateria_celular) || 0,
    puntuacion_antutu: Number(dto.puntuacion_celular) || 0,
    pantalla: dto.pantalla_celular ?? '',
    camara_principal: Number(dto.cam_principal_cel) || 0,
    certificacion_ip: Boolean(dto.certificacionip_celular),
    camara_frontal: Number(dto.cam_frontal_cel) || 0,
    tasa_refresco: Number(dto.tasa_refresco_cel) || 0,
    contador: 0,
  };
};

// ============================================================================
// 6. MAPEADOR: Modelo Procesado -> Resultado Final
// ============================================================================
export const mapToResultadoFinal = (model: SwaProductoProcesadoModel): SWAstistenteResultadoDTO => {
  return {
    marca: model.marca,
    modelo: model.modelo,
    almacenamiento: model.almacenamiento,
    ram: model.ram,
    precio: model.precio,
  };
};