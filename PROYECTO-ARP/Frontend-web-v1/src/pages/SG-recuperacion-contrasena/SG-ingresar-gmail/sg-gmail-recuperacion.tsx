import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import './sg-gmail-recuperacion.css';
import type { MappedGmailRecoveryData, RecoveryEmailRequest } from '../../../types/sg-ingresar-gmail-i-m';
import { handleRecoverySubmit, handleBackClick } from './sg-gmail-recup-logico';

interface SGGmailRecuperacionProps {
  onRecoverySuccess?: (payload: RecoveryEmailRequest) => void;
}

export const SGGmailRecuperacion: Component<SGGmailRecuperacionProps> = (props) => {
  const fallbackRecoverySuccess = () => {};
  const navigate = useNavigate();

  const [formData, setFormData] = createSignal<MappedGmailRecoveryData>({ email: '' });

  const handleInputChange = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div class="gmail-recup-body">
      {/* Contenedor principal de la tarjeta */}
      <div class="gmail-recup-wrapper">
        <form
          class="gmail-recup-card"
          onSubmit={(e) =>
            handleRecoverySubmit(
              e,
              formData(),
              props.onRecoverySuccess || fallbackRecoverySuccess
            )
          }
        >
          {/* Título */}
          <p class="title">
            INGRESAR<br />GMAIL
          </p>

          {/* Campo de escritura GMAIL */}
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
            <label class="lebal-email">GMAIL</label>
          </div>

          {/* Botón RECUPERAR */}
          <button type="submit" class="button-submit">
            RECUPERAR
          </button>

          {/* Botón ATRAS */}
          <button
            type="button"
            class="back-button"
            onClick={(e) => handleBackClick(e, navigate)}
          >
            ATRAS
          </button>
        </form>
      </div>
    </div>
  );
};

export default SGGmailRecuperacion;