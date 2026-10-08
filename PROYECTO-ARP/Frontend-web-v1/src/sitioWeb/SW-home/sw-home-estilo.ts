// src/sitioWeb/SW-home/sw-home-estilo.ts

// ============================================================================
// INICIO MODIFICACIÓN: Funciones auxiliares para animaciones de entrada
// ============================================================================
export const triggerFadeInAnimation = (element: HTMLElement | null) => {
  if (element) {
    element.classList.add('fade-in-enter');
    setTimeout(() => {
      element.classList.remove('fade-in-enter');
      element.classList.add('fade-in-active');
    }, 50);
  }
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================