import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import './sg-codigo-recuperacion.css';
import type { MappedCodeVerificationData, CodeVerificationRequest } from '../../../types/sg-ingresar-codigo-i-m';
import { handleCodeSubmit, handleBackClick } from './sg-codigo-recup-logico';

interface SGCodigoRecuperacionProps {
  onCodeSuccess?: (payload: CodeVerificationRequest) => void;
}

export const SGCodigoRecuperacion: Component<SGCodigoRecuperacionProps> = (props) => {
  const fallbackCodeSuccess = () => {};
  const navigate = useNavigate();

  const [formData, setFormData] = createSignal<MappedCodeVerificationData>({ verificationCode: '' });

  const handleInputChange = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div class="codigo-recup-body">
      {/* Contenedor principal de la tarjeta */}
      <div class="codigo-recup-wrapper">
        <form
          class="codigo-recup-card"
          onSubmit={(e) =>
            handleCodeSubmit(
              e,
              formData(),
              navigate, // <-- Pasamos la función de navegación de Solid Router
              props.onCodeSuccess || fallbackCodeSuccess
            )
          }
        >
          {/* Título de la tarjeta */}
          <p class="title">
            Ingrese el Código<br />de Verificación
          </p>

          {/* Subtítulo informativo */}
          <p class="subtitle">
            Se envió un mensaje a su correo Gmail, ingrese el código que se le envió en ese mensaje.
          </p>

          {/* Campo de escritura del Código */}
          <div class="group">
            <input
              required
              class="main-input"
              type="text"
              name="verificationCode"
              value={formData().verificationCode}
              onInput={handleInputChange}
            />
            <span class="highlight-span" />
            <label class="lebal-code">Escribir aquí el código</label>
          </div>

          {/* Botón SIGUIENTE */}
          <button type="submit" class="button-submit">
            SIGUIENTE
          </button>

          {/* Botón ATRÁS */}
          <button
            type="button"
            class="back-button"
            onClick={(e) => handleBackClick(e, navigate)}
          >
            ATRÁS
          </button>
        </form>
      </div>
    </div>
  );
};

export default SGCodigoRecuperacion;