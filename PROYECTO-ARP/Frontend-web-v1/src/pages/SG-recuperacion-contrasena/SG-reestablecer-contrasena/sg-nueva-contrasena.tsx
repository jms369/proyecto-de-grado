import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import './sg-nueva-contrasena.css';
import type { MappedResetPasswordData, ResetPasswordRequest } from '../../../types/sg-reestablecer-contrasena-i-m';
import { handleResetPasswordSubmit } from './sg-nue-contrasena-logico';

interface SGNuevaContrasenaProps {
  onSuccess?: (payload: ResetPasswordRequest) => void;
}

export const SGNuevaContrasena: Component<SGNuevaContrasenaProps> = (props) => {
  const fallbackSuccess = () => {};
  const navigate = useNavigate();

  const [formData, setFormData] = createSignal<MappedResetPasswordData>({
    newPassword: '',
    confirmPassword: '',
  });

  const [showNewPassword, setShowNewPassword] = createSignal(false);
  const [showConfirmPassword, setShowConfirmPassword] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal<string | null>(null);

  // Elimina automáticamente cualquier espacio en blanco al escribir
  const handleInputChange = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    const { name, value } = e.currentTarget;
    const valueWithoutSpaces = value.replace(/\s+/g, '');

    setFormData((prev) => ({ ...prev, [name]: valueWithoutSpaces }));
    if (errorMessage()) setErrorMessage(null);
  };

  return (
    <div class="nue-contrasena-body">
      <div class="nue-contrasena-wrapper">
        <form
          class="nue-contrasena-card"
          onSubmit={(e) =>
            handleResetPasswordSubmit(
              e,
              formData(),
              setErrorMessage,
              props.onSuccess || fallbackSuccess,
              navigate
            )
          }
        >
          {/* Título en 2 líneas según el boceto */}
          <p class="title">
            REESTABLECER<br />CONTRASEÑA
          </p>

          {/* Subtítulo explicativo */}
          <div class="subtitle">
            <span>La nueva contraseña deberá tener como mínimo 8 caracteres y:</span>
            <ul>
              <li>1 letra MAYÚSCULA</li>
              <li>1 letra minúscula</li>
              <li>1 número</li>
              <li>AMBOS CAMPOS DEBEN SER IGUALES</li>
            </ul>
          </div>

          {/* Campo 1: NUEVA CONTRASEÑA */}
          <div class="group">
            <span class="field-label">NUEVA CONTRASEÑA</span>
            <div class="input-container">
              <input
                required
                class="main-input"
                type={showNewPassword() ? 'text' : 'password'}
                name="newPassword"
                value={formData().newPassword}
                onInput={handleInputChange}
              />
              <button
                type="button"
                class="toggle-password-btn"
                onClick={() => setShowNewPassword(!showNewPassword())}
              >
                {showNewPassword() ? (
                  /* Ícono Ojo Abierto */
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  /* Ícono Ojo Cerrado */
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Campo 2: CONFIRMAR CONTRASEÑA */}
          <div class="group">
            <span class="field-label">CONFIRMAR CONTRASEÑA</span>
            <div class="input-container">
              <input
                required
                class="main-input"
                type={showConfirmPassword() ? 'text' : 'password'}
                name="confirmPassword"
                value={formData().confirmPassword}
                onInput={handleInputChange}
              />
              <button
                type="button"
                class="toggle-password-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword())}
              >
                {showConfirmPassword() ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Muestra mensajes de error de validación */}
          {errorMessage() && <div class="error-message">{errorMessage()}</div>}

          {/* Botón SIGUIENTE */}
          <button type="submit" class="button-submit">
            SIGUIENTE
          </button>
        </form>
      </div>
    </div>
  );
};

export default SGNuevaContrasena;