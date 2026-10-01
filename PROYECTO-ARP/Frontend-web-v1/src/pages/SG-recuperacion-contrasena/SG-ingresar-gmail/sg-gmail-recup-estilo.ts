// Animación al presionar "RECUPERAR": Desliza la tarjeta hacia la izquierda de la pantalla
export const triggerSlideLeftExitAnimation = (onComplete: () => void): void => {
  const container = document.querySelector('.gmail-recup-wrapper');
  if (container) {
    container.classList.add('slide-left-exit');
    setTimeout(() => {
      onComplete();
    }, 800);
  } else {
    onComplete();
  }
};

// Animación al presionar "ATRAS": Vuelve a deslizar verticalmente o regresa limpiamente
export const triggerBackAnimation = (onComplete: () => void): void => {
  const container = document.querySelector('.gmail-recup-wrapper');
  if (container) {
    container.classList.add('slide-down-exit');
    setTimeout(() => {
      onComplete();
    }, 600);
  } else {
    onComplete();
  }
};