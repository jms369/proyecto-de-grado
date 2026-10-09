// ============================================================================
// INICIO MODIFICACIÓN: Helpers visuales para el catálogo
// ============================================================================
export const triggerFadeInCards = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (container) {
    container.classList.add('fade-in-active');
  }
};

export const scrollToTopSmooth = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================