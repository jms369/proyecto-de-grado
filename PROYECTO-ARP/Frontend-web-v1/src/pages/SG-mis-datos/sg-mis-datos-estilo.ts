export const triggerSlideLeftExitAnimation = (
  container: HTMLElement,
  onComplete: () => void
): void => {
  container.classList.add('slide-left-exit');
  setTimeout(() => {
    onComplete();
  }, 400);
};

export const triggerSlideRightExitAnimation = (
  container: HTMLElement,
  onComplete: () => void
): void => {
  container.classList.add('slide-right-exit');
  setTimeout(() => {
    onComplete();
  }, 400);
};