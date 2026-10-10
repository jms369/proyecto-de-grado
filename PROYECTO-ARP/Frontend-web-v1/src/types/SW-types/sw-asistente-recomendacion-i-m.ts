// ============================================================================
// INICIO MODIFICACIÓN: DTOs con soporte para campos vacíos e inicialización nula
// ============================================================================

export interface SWAstistenteFormModel {
  precioARP: number | '';
  camaraPrincipalARP: boolean | null;
  camaraFrontalARP: boolean | null;
  bateriaARP: boolean | null;
  certificacionIPARP: boolean | null;
  pantallaARP: boolean | null;
  almacenamientoARP: boolean | null;
  ramARP: boolean | null;
  antutuARP: boolean | null;
  tazaRefrezcoARP: boolean | null;
}

export interface SWProductoRecomendadoDTO {
  marca: string;
  modelo: string;
  almacenamiento: number;
  ram: number;
  precio: number;
}

// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================