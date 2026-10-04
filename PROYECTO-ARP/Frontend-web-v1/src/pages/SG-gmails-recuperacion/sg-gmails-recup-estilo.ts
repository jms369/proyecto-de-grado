/**
 * Helper de animación de salida para la navegación fluida
 */
export const triggerPageExitAnimation = (
  containerRef: HTMLElement | undefined,
  onComplete: () => void
): void => {
  if (!containerRef) {
    onComplete();
    return;
  }

  containerRef.style.willChange = 'opacity, transform';
  containerRef.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
  containerRef.style.opacity = '0';
  containerRef.style.transform = 'scale(0.98)';

  setTimeout(() => {
    onComplete();
  }, 300);
};