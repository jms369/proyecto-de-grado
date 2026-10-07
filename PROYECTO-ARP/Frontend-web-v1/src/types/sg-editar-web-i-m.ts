// ============================================================================
// INICIO MODIFICACIÓN: Creación de interfaces, tipos y validaciones para SG-editar-web
// ============================================================================
export type { BaseImage, ProductImage, WebLinks, WebInfo };

interface BaseImage {
  id: number;
  nombreOriginal: string;
  tamano: number;
  tipoMime: string;
  url: string;
}

interface ProductImage extends BaseImage {
  producto_id: number;
}

interface WebLinks {
  facebook: string;
  instagram: string;
  whatsapp: string;
  tiktok: string;
  ubicacion: string;
}

interface WebInfo {
  textoInformativo: string;
}

// Validaciones puras
export const validateImageFile = (file: File): string | null => {
  const validTypes = ['image/jpeg', 'image/png'];
  if (!validTypes.includes(file.type)) {
    return 'Solo se permiten archivos JPG o PNG.';
  }
  if (file.size > 5 * 1024 * 1024) {
    return 'La imagen no debe superar los 5MB.';
  }
  return null;
};

export const sanitizeUrlInput = (url: string): string => {
  return url.replace(/\s+/g, '');
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================