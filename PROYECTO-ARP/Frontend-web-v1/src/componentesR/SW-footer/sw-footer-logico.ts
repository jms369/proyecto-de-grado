// ============================================================================
// INICIO MODIFICACIÓN: Lógica de navegación del footer
// ============================================================================
export const handleInternalNavigation = (
  navigate: (to: string) => void,
  path: string
): void => {
  navigate(path);
};

export const handleExternalSocialClick = (url: string): void => {
  // Validación o analítica antes de salir del sitio podría ir aquí
  window.open(url, '_blank', 'noopener,noreferrer');
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================