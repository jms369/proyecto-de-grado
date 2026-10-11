// ============================================================================
// INICIO MODIFICACIÓN: Controlador de navegación y transacciones de redirección
// ============================================================================
export const handleNavigation = (
  navigate: (to: string) => void,
  path: string,
  onNavigated?: () => void
): void => {
  if (onNavigated) {
    onNavigated();
  }
  navigate(path);
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================