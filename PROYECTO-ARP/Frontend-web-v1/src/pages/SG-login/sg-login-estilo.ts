import type { Setter } from 'solid-js';

export const togglePasswordVisibility = (
  isPasswordVisible: boolean,
  setIsPasswordVisible: Setter<boolean>
): void => {
  setIsPasswordVisible(!isPasswordVisible);
};

export const triggerSubmitAnimation = (onComplete: () => void): void => {
  const overlay = document.querySelector('.login-submit-overlay');
  if (overlay) {
    overlay.classList.add('active');
    setTimeout(() => {
      onComplete();
    }, 600);
  } else {
    onComplete();
  }
};

export const triggerForgotPasswordAnimation = (onNavigate: () => void): void => {
  const container = document.querySelector('.login-wrapper');
  if (container) {
    container.classList.add('slide-up-exit');
    setTimeout(() => {
      onNavigate();
    }, 800);
  } else {
    onNavigate();
  }
};