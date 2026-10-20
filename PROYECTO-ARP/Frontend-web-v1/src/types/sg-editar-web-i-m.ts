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
  //  CAMBIO: Agregamos webp
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return 'Solo se permiten archivos JPG, PNG o WEBP.';
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
// INICIO MODIFICACIÓN: Adición de función de saneamiento para permitir solo números en WhatsApp
// ============================================================================
export const sanitizeWhatsappInput = (value: string): string => {
  return value.replace(/\D/g, '');
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================
