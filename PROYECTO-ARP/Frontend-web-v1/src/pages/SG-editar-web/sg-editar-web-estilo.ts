// ============================================================================
// INICIO MODIFICACIÓN: Creación de helpers de animación DOM para SG-editar-web
// ============================================================================
export const triggerFadeInAnimation = (elementId: string) => {
  const el = document.getElementById(elementId);
  if (el) {
    el.classList.add('fade-in-enter');
    setTimeout(() => el.classList.remove('fade-in-enter'), 500);
  }
};

export const triggerExitAnimationAndNavigate = (elementId: string, navigate: (to: string) => void, path: string) => {
  const el = document.getElementById(elementId);
  if (el) {
    el.classList.add('fade-out-exit');
    setTimeout(() => {
      navigate(path);
    }, 400);
  } else {
    navigate(path);
  }
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================