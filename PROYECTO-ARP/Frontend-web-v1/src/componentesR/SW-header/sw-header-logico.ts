// ============================================================================
// INICIO MODIFICACIÓN: Controlador de navegación aislando la vista
// ============================================================================
export const handleNavigation = (
  navigate: (to: string) => void,
  path: string
): void => {
  // Aquí se pueden agregar validaciones, analytics o limpieza de estado global
  // antes de realizar la redirección.
  navigate(path);
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================