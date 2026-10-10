// ============================================================================
// INICIO MODIFICACIÓN: Lógica de redirección interna hacia el Asistente ARP
// ============================================================================
export interface SWBotonHaciaArpProps {
  /** Ruta interna a la que navegará el botón. Por defecto: '/asistente-arp' */
  rutaDestino?: string;
}

export const handleArpNavigation = (
  navigate: (to: string) => void,
  rutaDestino: string = '/asistente'
): void => {
  // Al ser una ruta interna, utilizamos el enrutador de Solid.js
  navigate(rutaDestino);
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================