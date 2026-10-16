import type { LoginRequest, MappedLoginData } from '../../types/sg-login-i-m';
import { mapFrontendToBackendLogin } from '../../types/sg-login-i-m';
import { loginApi } from '../../services/apis_SG/login_api';
import { triggerSubmitAnimation, triggerForgotPasswordAnimation } from './sg-login-estilo';

export const handleLoginSubmit = async (
  e: SubmitEvent,
  formData: MappedLoginData,
  onLoginSuccess: (payload: LoginRequest, rol: string) => void,
  navigate: (to: string) => void
): Promise<void> => {
  e.preventDefault();

  const payload = mapFrontendToBackendLogin(formData);
  const result = await loginApi(payload);

  if (!result.ok) {
    alert(result.error ?? 'Credenciales inválidas.');
    return;
  }

  // Login OK → animación y navegación
  triggerSubmitAnimation(() => {
    onLoginSuccess(payload, result.data!.rol);
    navigate('/dashboard');
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