/**
 * Animaciones visuales y helpers de manipulación del DOM para SG-Dashboard
 */

export const triggerCardHoverEffect = (element: HTMLElement | null): void => {
  if (!element) return;
  element.classList.add('card-active-glow');
};

export const triggerPageExitAnimation = (
  containerRef: HTMLElement | undefined,
  onComplete: () => void
): void => {
  if (!containerRef) {
    onComplete();
    return;
  }
  containerRef.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  containerRef.style.opacity = '0';
  containerRef.style.transform = 'scale(0.98)';

  setTimeout(() => {
    onComplete();
  }, 300);
};