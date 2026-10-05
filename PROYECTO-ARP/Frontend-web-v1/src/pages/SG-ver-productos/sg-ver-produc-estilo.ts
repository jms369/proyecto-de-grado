// ============================================================================
// Helpers de Interacción y Animaciones Visuales
// ============================================================================

export const triggerFadeInAnimation = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add('sg-fade-in-active');
  }
};