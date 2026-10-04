import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import './sg-mis-datos.css';
import { useMisDatosLogic } from './sg-mis-datos-logico';

interface SGMisDatosProps {
  isOpen: boolean;
  onClose: () => void;
}

const SGMisDatos: Component<SGMisDatosProps> = (props) => {
  let modalRef: HTMLDivElement | undefined;

  const {
    formData,
    errors,
    successMsg,
    handleInputChange,
    handleSave,
    handleCancel
  } = useMisDatosLogic(props.onClose);

  return (
    <Show when={props.isOpen}>
      <div class="sg-misdatos-overlay" onClick={props.onClose}>
        <div 
          ref={modalRef} 
          class="sg-misdatos-modal-container" 
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" class="sg-misdatos-close-btn" onClick={props.onClose}>
            ✕
          </button>

          <h1 class="sg-misdatos-title">MIS DATOS DE USUARIO</h1>

          <form class="sg-misdatos-form" onSubmit={handleSave}>
            <div class="sg-misdatos-scroll-area">
              {/* PRIMER NOMBRE */}
              <div class="input-box-group">
                <input
                  type="text"
                  class={`input-box ${errors().nombre1 ? 'input-error' : ''}`}
                  value={formData().nombre1}
                  onInput={(e) => handleInputChange('nombre1', e.currentTarget.value)}
                  placeholder=" "
                  autocomplete="off"
                />
                <label class="floating-label">Primer Nombre *</label>
                {errors().nombre1 && <span class="field-error-text">{errors().nombre1}</span>}
              </div>

              {/* SEGUNDO NOMBRE */}
              <div class="input-box-group">
                <input
                  type="text"
                  class="input-box"
                  value={formData().nombre2}
                  onInput={(e) => handleInputChange('nombre2', e.currentTarget.value)}
                  placeholder=" "
                  autocomplete="off"
                />
                <label class="floating-label">Segundo Nombre</label>
              </div>

              {/* PRIMER APELLIDO */}
              <div class="input-box-group">
                <input
                  type="text"
                  class={`input-box ${errors().apellido1 ? 'input-error' : ''}`}
                  value={formData().apellido1}
                  onInput={(e) => handleInputChange('apellido1', e.currentTarget.value)}
                  placeholder=" "
                  autocomplete="off"
                />
                <label class="floating-label">Primer Apellido *</label>
                {errors().apellido1 && <span class="field-error-text">{errors().apellido1}</span>}
              </div>

              {/* SEGUNDO APELLIDO */}
              <div class="input-box-group">
                <input
                  type="text"
                  class="input-box"
                  value={formData().apellido2}
                  onInput={(e) => handleInputChange('apellido2', e.currentTarget.value)}
                  placeholder=" "
                  autocomplete="off"
                />
                <label class="floating-label">Segundo Apellido</label>
              </div>

              {/* GMAIL USUARIO (SOLO LECTURA) */}
              <div class="input-box-group">
                <input
                  type="email"
                  class="input-box input-readonly"
                  value={formData().gmailUsuario}
                  readOnly
                  tabIndex={-1}
                  placeholder=" "
                />
                <label class="floating-label label-readonly">Gmail Usuario (Solo lectura)</label>
              </div>

              {/* ROL (SOLO LECTURA) */}
              <div class="input-box-group">
                <input
                  type="text"
                  class="input-box input-readonly"
                  value={formData().rol}
                  readOnly
                  tabIndex={-1}
                  placeholder=" "
                />
                <label class="floating-label label-readonly">Rol de Usuario (Solo lectura)</label>
              </div>

              {/* CARNET DE IDENTIDAD */}
              <div class="input-box-group">
                <input
                  type="text"
                  class={`input-box ${errors().carnetIdentidad ? 'input-error' : ''}`}
                  value={formData().carnetIdentidad}
                  onInput={(e) => handleInputChange('carnetIdentidad', e.currentTarget.value)}
                  placeholder=" "
                  autocomplete="off"
                />
                <label class="floating-label">Carnet de Identidad *</label>
                {errors().carnetIdentidad && <span class="field-error-text">{errors().carnetIdentidad}</span>}
              </div>

              {/* COMPLEMENTO */}
              <div class="input-box-group">
                <input
                  type="text"
                  class="input-box"
                  value={formData().complemento}
                  onInput={(e) => handleInputChange('complemento', e.currentTarget.value)}
                  placeholder=" "
                  autocomplete="off"
                />
                <label class="floating-label">Complemento (Letras y números)</label>
              </div>

              {/* NÚMERO CELULAR */}
              <div class="input-box-group">
                <input
                  type="text"
                  class={`input-box ${errors().numeroCelular ? 'input-error' : ''}`}
                  value={formData().numeroCelular}
                  onInput={(e) => handleInputChange('numeroCelular', e.currentTarget.value)}
                  placeholder=" "
                  autocomplete="off"
                />
                <label class="floating-label">Número Celular *</label>
                {errors().numeroCelular && <span class="field-error-text">{errors().numeroCelular}</span>}
              </div>

              {/* DIRECCIÓN */}
              <div class="input-box-group">
                <input
                  type="text"
                  class="input-box"
                  value={formData().direccion}
                  onInput={(e) => handleInputChange('direccion', e.currentTarget.value)}
                  placeholder=" "
                  autocomplete="off"
                />
                <label class="floating-label">Dirección</label>
              </div>

              {/* FECHA DE NACIMIENTO */}
              <div class="input-box-group">
                <input
                  type="date"
                  class="input-box date-input"
                  value={formData().fechaNacimiento}
                  onInput={(e) => handleInputChange('fechaNacimiento', e.currentTarget.value)}
                />
                <label class="floating-label label-always-top">Fecha de Nacimiento</label>
              </div>

              {/* GRUPO SANGUÍNEO */}
              <div class="input-box-group">
                <input
                  type="text"
                  class="input-box"
                  value={formData().grupoSanguineo}
                  onInput={(e) => handleInputChange('grupoSanguineo', e.currentTarget.value)}
                  placeholder=" "
                  autocomplete="off"
                />
                <label class="floating-label">Grupo Sanguíneo (ej. O+, A-)</label>
              </div>
            </div>

            {/* MENSAJE DE ÉXITO */}
            {successMsg() && <div class="success-msg-box">{successMsg()}</div>}

            {/* BOTONES DUALES DE ACCIÓN */}
            <div class="actions-group-row">
              <button type="submit" class="btn-save-green">
                Guardar cambios
              </button>
              <button type="button" class="btn-cancel-red" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Show>
  );
};

export default SGMisDatos;