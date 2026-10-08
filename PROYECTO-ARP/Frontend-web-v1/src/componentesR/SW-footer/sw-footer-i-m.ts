// ============================================================================
// INICIO MODIFICACIÓN: Definición de tipos para redes sociales y enlaces legales
// ============================================================================
export interface SWSocialLink {
  id: string;
  name: string;
  url: string;
  networkId: 'facebook' | 'instagram' | 'tiktok';
  svgPath: string;
}

export interface SWLegalLink {
  id: string;
  label: string;
  path: string;
}

// Mapeo estático de enlaces legales profesionales
export const legalLinks: SWLegalLink[] = [
  { id: 'legal-privacidad', label: 'Política de Privacidad', path: '/privacidad' },
  { id: 'legal-cookies', label: 'Uso de Cookies', path: '/cookies' },
  { id: 'legal-soporte', label: 'Centro de Soporte', path: '/soporte' }
];
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================