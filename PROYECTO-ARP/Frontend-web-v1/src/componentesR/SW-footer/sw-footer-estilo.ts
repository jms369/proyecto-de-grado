// ============================================================================
// INICIO MODIFICACIÓN: Helper visual para animación de entrada del footer
// ============================================================================
export const triggerFooterFadeIn = (elementRef: HTMLElement | undefined): void => {
  if (!elementRef) return;
  
  // Agrega una clase para una transición suave al cargar la vista
  elementRef.classList.add('footer-fade-in');
  setTimeout(() => {
    elementRef.classList.add('footer-visible');
  }, 100);
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================