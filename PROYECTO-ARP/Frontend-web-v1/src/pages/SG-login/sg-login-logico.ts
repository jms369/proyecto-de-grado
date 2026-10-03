import type { LoginRequest, MappedLoginData } from '../../types/sg-login-i-m';
import { mapFrontendToBackendLogin } from '../../types/sg-login-i-m';
import { triggerSubmitAnimation, triggerForgotPasswordAnimation } from './sg-login-estilo';

export const handleLoginSubmit = (
  e: SubmitEvent,
  formData: MappedLoginData,
  onLoginSuccess: (payload: LoginRequest) => void,
  navigate: (to: string) => void // <-- 1. Agregar parámetro navigate
): void => {
  e.preventDefault();
  const payload = mapFrontendToBackendLogin(formData);

  triggerSubmitAnimation(() => {
    onLoginSuccess(payload);
    navigate('/dashboard'); // <-- 2. Ejecutar la navegación hacia el dashboard
  });
};

export const handleForgotPasswordClick = (
  e: MouseEvent,
  navigate: (to: string) => void
): void => {
  e.preventDefault();

  triggerForgotPasswordAnimation(() => {
    navigate('/gmail-recuperacion');
  });
};