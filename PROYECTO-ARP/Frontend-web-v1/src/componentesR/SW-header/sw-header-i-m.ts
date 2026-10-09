// ============================================================================
// INICIO MODIFICACIÓN: Definición de tipos de navegación
// ============================================================================
export interface SWHeaderLink {
  id: string;
  label: string;
  path: string;
}

// Mapeo local estático para los enlaces de la cabecera
export const headerLinks: SWHeaderLink[] = [
  { id: 'link-productos', label: 'Productos', path: '/catalogo-productos' },
  { id: 'link-terminos', label: 'Terminos y Condiciones', path: '/terminos-y-condiciones' },
  { id: 'link-ventas', label: 'Políticas de Ventas', path: '/politicas-ventas' },
  { id: 'link-envios', label: 'Políticas de Envíos', path: '/politicas-envios' }
];
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================