// Animación al presionar "SIGUIENTE": Desliza la tarjeta hacia la izquierda
export const triggerSlideLeftExitAnimation = (onComplete: () => void): void => {
  const container = document.querySelector('.codigo-recup-wrapper');
  if (container) {
    container.classList.add('slide-left-exit');
    setTimeout(() => {
      onComplete();
    }, 800);
  } else {
    onComplete();
  }
};

// Animación al presionar "ATRÁS": Desliza la tarjeta hacia la derecha
export const triggerSlideRightExitAnimation = (onComplete: () => void): void => {
  const container = document.querySelector('.codigo-recup-wrapper');
  if (container) {
    container.classList.add('slide-right-exit');
    setTimeout(() => {
      onComplete();
    }, 800);
  } else {
    onComplete();
  }
};