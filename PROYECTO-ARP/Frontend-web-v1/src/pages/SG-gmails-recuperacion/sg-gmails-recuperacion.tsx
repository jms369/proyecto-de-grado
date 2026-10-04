import type{ Component } from 'solid-js';
import './sg-gmails-recuperacion.css';
import { useGmailsRecuperacionLogic } from './sg-gmails-recup-logico';

const SGGmailsRecuperacion: Component = () => {
  let containerRef: HTMLDivElement | undefined;

  const {
    emails,
    errors,
    successMsg,
    handleEmailChange,
    handleSave
  } = useGmailsRecuperacionLogic();

  return (
    <div ref={containerRef} class="sg-recup-layout">
      {/* CUERPO CENTRAL */}
      <main class="sg-recup-body">
        <div class="sg-recup-card">
          <h1 class="sg-recup-title">
            AGREGAR GMAILS<br />DE RECUPERACIÓN
          </h1>

          <form class="sg-recup-form" onSubmit={handleSave}>
            {/* CAMPO 1 */}
            <div class="input-box-group">
              <input
                type="text"
                class={`input-box ${errors().email1 ? 'input-error' : ''}`}
                value={emails().email1}
                onInput={(e) => handleEmailChange('email1', e.currentTarget.value)}
                placeholder=" "
                autocomplete="off"
              />
              <label class="floating-label">Escribir aquí el CORREO GMAIL</label>
              {errors().email1 && <span class="field-error-text">{errors().email1}</span>}
            </div>

            {/* CAMPO 2 */}
            <div class="input-box-group">
              <input
                type="text"
                class={`input-box ${errors().email2 ? 'input-error' : ''}`}
                value={emails().email2}
                onInput={(e) => handleEmailChange('email2', e.currentTarget.value)}
                placeholder=" "
                autocomplete="off"
              />
              <label class="floating-label">Escribir aquí el CORREO GMAIL</label>
              {errors().email2 && <span class="field-error-text">{errors().email2}</span>}
            </div>

            {/* CAMPO 3 */}
            <div class="input-box-group">
              <input
                type="text"
                class={`input-box ${errors().email3 ? 'input-error' : ''}`}
                value={emails().email3}
                onInput={(e) => handleEmailChange('email3', e.currentTarget.value)}
                placeholder=" "
                autocomplete="off"
              />
              <label class="floating-label">Escribir aquí el CORREO GMAIL</label>
              {errors().email3 && <span class="field-error-text">{errors().email3}</span>}
            </div>

            {/* MENSAJE DE ÉXITO */}
            {successMsg() && <div class="success-msg-box">{successMsg()}</div>}

            {/* BOTÓN VERDE DE GUARDAR CAMBIOS */}
            <button type="submit" class="btn-save-green">
              Guardar cambios
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SGGmailsRecuperacion;