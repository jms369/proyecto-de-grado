import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import './sg-login.css';
import type { MappedLoginData, LoginRequest } from '../../types/sg-login-i-m';
import { handleLoginSubmit, handleForgotPasswordClick } from './sg-login-logico';
import { togglePasswordVisibility } from './sg-login-estilo';

interface SGLoginProps {
  onLoginSuccess?: (payload: LoginRequest) => void;
}

export const SGLogin: Component<SGLoginProps> = (props) => {
  const fallbackLoginSuccess = () => {};
  const navigate = useNavigate();

  const [formData, setFormData] = createSignal<MappedLoginData>({ email: '', password: '' });
  const [isPasswordVisible, setIsPasswordVisible] = createSignal<boolean>(false);

  const handleInputChange = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div class="login-body">
      {/* Capa de transición diagonal con degradado completo */}
      <div class="login-submit-overlay" />

      {/* Contenedor principal de la tarjeta */}
      <div class="login-wrapper">
        <form
          class="login-card"
          onSubmit={(e) =>
            handleLoginSubmit(
              e,
              formData(),
              props.onLoginSuccess || fallbackLoginSuccess
            )
          }
        >
          <p class="title">LOGIN</p>

          {/* Campo Email */}
          <div class="group">
            <input
              required
              class="main-input"
              type="email"
              name="email"
              value={formData().email}
              onInput={handleInputChange}
            />
            <span class="highlight-span" />
            <label class="lebal-email">Ingrese su correo GMAIL</label>
          </div>

          {/* Campo Password con Toggle */}
          <div class="group">
            <input
              required
              class="main-input"
              type={isPasswordVisible() ? 'text' : 'password'}
              name="password"
              value={formData().password}
              onInput={handleInputChange}
            />
            <span class="highlight-span" />
            <label class="lebal-email">Ingrese su contraseña</label>
            <button
              type="button"
              class="password-toggle-btn"
              onClick={() => togglePasswordVisibility(isPasswordVisible(), setIsPasswordVisible)}
            >
              {isPasswordVisible() ? (
                /* Icono Ojo Cerrado */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                /* Icono Ojo Abierto */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* Botón Iniciar Sesión */}
          <button type="submit" class="button-submit">
            Iniciar Sesión
          </button>

          {/* Botón Olvidaste tu contraseña */}
          <button
            type="button"
            class="forgot-password-button"
            onClick={(e) => handleForgotPasswordClick(e, navigate)}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </form>
      </div>
    </div>
  );
};

export default SGLogin;