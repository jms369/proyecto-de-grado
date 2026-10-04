// ============================================================================
// Helpers de Interacción y Animaciones de Productos
// ============================================================================

export const triggerOpenModalAnimation = (modalId: string): void => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('sg-modal-active');
  }
};

export const triggerCloseModalAnimation = (modalId: string): void => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('sg-modal-active');
  }
};

export const triggerCardSaveHighlight = (cardId: string): void => {
  const card = document.getElementById(cardId);
  if (card) {
    card.classList.add('sg-card-saved-glow');
    setTimeout(() => {
      card.classList.remove('sg-card-saved-glow');
    }, 1500);
  }
};