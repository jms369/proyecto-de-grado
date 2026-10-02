// Animación al presionar "SIGUIENTE": Desliza la tarjeta hacia la izquierda de la pantalla
export const triggerSlideLeftExitAnimation = (onComplete: () => void): void => {
  const container = document.querySelector('.nue-contrasena-wrapper');
  if (container) {
    container.classList.add('slide-left-exit');
    setTimeout(() => {
      onComplete();
    }, 800);
  } else {
    onComplete();
  }
};

// Animación opcional al regresar si es requerida
export const triggerSlideRightExitAnimation = (onComplete: () => void): void => {
  const container = document.querySelector('.nue-contrasena-wrapper');
  if (container) {
    container.classList.add('slide-right-exit');
    setTimeout(() => {
      onComplete();
    }, 800);
  } else {
    onComplete();
  }
};