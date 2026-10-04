// ============================================================================
// INICIO CREACIÓN: Helpers de Animación y Manipulación del DOM del Módulo SG-crear-usuario
// ============================================================================

export const triggerSlideLeftExitAnimation = (element: HTMLElement, onComplete: () => void): void => {
  if (!element) {
    onComplete();
    return;
  }
  element.classList.add('sg-slide-left-exit');
  setTimeout(() => {
    onComplete();
  }, 300);
};

export const triggerModalFadeIn = (element: HTMLElement): void => {
  if (!element) return;
  element.classList.remove('sg-modal-fade-out');
  element.classList.add('sg-modal-fade-in');
};

export const triggerModalFadeOut = (element: HTMLElement, onComplete: () => void): void => {
  if (!element) {
    onComplete();
    return;
  }
  element.classList.remove('sg-modal-fade-in');
  element.classList.add('sg-modal-fade-out');
  setTimeout(() => {
    onComplete();
  }, 250);
};

// ============================================================================
// FIN CREACIÓN
// ============================================================================