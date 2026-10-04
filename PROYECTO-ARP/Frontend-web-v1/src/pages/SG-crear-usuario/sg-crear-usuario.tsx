import { createSignal, Show, For } from 'solid-js';
import type { Component } from 'solid-js';
import SGHeader from '../../componentesR/SG-header/sg-header';
import SGFooter from '../../componentesR/SG-footer/sg-footer';
import './sg-crear-usuario.css';

import type { UsuarioModel, BusquedaUsuarioFiltro } from '../../types/sg-crear-usuario-i-m';
import {
  sanitizeLettersOnly,
  sanitizeEmail,
  sanitizeNumbersOnly,
  sanitizeAlphanumericNoSpaces,
  sanitizePhone,
  sanitizeBloodType,
  sanitizePassword
} from '../../types/sg-crear-usuario-i-m';

import {
  useUsuarioController,
  initialNewUser,
  initialSearchFilter
} from './sg-crear-usuario-logico';

import { triggerModalFadeIn, triggerModalFadeOut } from './sg-crear-usuario-estilo';

const SGCrearUsuario: Component = () => {
  let modalRef!: HTMLDivElement;

  const {
    usuariosList,
    busquedaResult,
    isModalOpen,
    setIsModalOpen,
    modalErrors,
    setModalErrors,
    handleRegisterUser,
    handleToggleEstado,
    handleSaveChanges,
    handleSearchUsers
  } = useUsuarioController();

  const [newUserForm, setNewUserForm] = createSignal<UsuarioModel>({ ...initialNewUser });
  const [searchForm, setSearchForm] = createSignal<BusquedaUsuarioFiltro>({ ...initialSearchFilter });
  
  // Estado para guardar borradores locales antes de ser confirmados con "Guardar"
  const [localEdits, setLocalEdits] = createSignal<Record<string, UsuarioModel>>({});

  // Estado para visibilidad de contraseña en Pop-up
  const [showPassword, setShowPassword] = createSignal<boolean>(false);

  // Obtiene la copia editable (borrador) o el objeto original si no se ha modificado aún
  const getDraft = (original: UsuarioModel): UsuarioModel => {
    return localEdits()[original.id!] || { ...original };
  };

  // Actualiza únicamente el borrador local sin alterar la fuente original de datos
  const updateDraftField = (id: string, original: UsuarioModel, field: keyof UsuarioModel, value: any) => {
    const currentDraft = getDraft(original);
    setLocalEdits({
      ...localEdits(),
      [id]: {
        ...currentDraft,
        [field]: value
      }
    });
  };

  // Confirma los cambios locales guardando la fila
  const saveRow = (original: UsuarioModel) => {
    const draft = getDraft(original);
    handleSaveChanges(draft);
    
    // Limpia el borrador local tras confirmar el guardado
    const updatedEdits = { ...localEdits() };
    delete updatedEdits[original.id!];
    setLocalEdits(updatedEdits);
  };

  const openModal = () => {
    setNewUserForm({ ...initialNewUser });
    setModalErrors({});
    setShowPassword(false);
    setIsModalOpen(true);

    queueMicrotask(() => {
      if (modalRef) triggerModalFadeIn(modalRef);
    });
  };

  const closeModal = () => {
    if (modalRef) {
      triggerModalFadeOut(modalRef, () => setIsModalOpen(false));
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <div class="sg-crear-usuario-container">
      <SGHeader />

      <main class="sg-crear-usuario-main">
        {/* PRIMER DIV: Crear Nuevo Usuario y Tabla */}
        <div class="sg-cu-section-card">
          <div class="sg-cu-action-header">
            <button class="btn-53" onClick={openModal}>
              <div class="original">Crear Nuevo Usuario</div>
              <div class="letters">
                <span>C</span><span>R</span><span>E</span><span>A</span><span>R</span>
              </div>
            </button>
          </div>

          <div class="sg-cu-table-wrapper">
            <table class="sg-cu-table">
              <thead>
                <tr>
                  <th>Primer Nombre</th>
                  <th>Segundo Nombre</th>
                  <th>Primer Apellido</th>
                  <th>Segundo Apellido</th>
                  <th>Gmail</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <For each={usuariosList()}>
                  {(usr) => {
                    const draft = () => getDraft(usr);
                    return (
                      <tr>
                        <td>
                          <input
                            type="text"
                            class="sg-table-input"
                            value={draft().nombre1}
                            onInput={(e) => updateDraftField(usr.id!, usr, 'nombre1', sanitizeLettersOnly(e.currentTarget.value))}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            class="sg-table-input"
                            value={draft().nombre2}
                            onInput={(e) => updateDraftField(usr.id!, usr, 'nombre2', sanitizeLettersOnly(e.currentTarget.value))}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            class="sg-table-input"
                            value={draft().apellido1}
                            onInput={(e) => updateDraftField(usr.id!, usr, 'apellido1', sanitizeLettersOnly(e.currentTarget.value))}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            class="sg-table-input"
                            value={draft().apellido2}
                            onInput={(e) => updateDraftField(usr.id!, usr, 'apellido2', sanitizeLettersOnly(e.currentTarget.value))}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            class="sg-table-input"
                            value={draft().gmailUsuario}
                            onInput={(e) => updateDraftField(usr.id!, usr, 'gmailUsuario', sanitizeEmail(e.currentTarget.value))}
                          />
                        </td>
                        <td>
                          <select
                            class="sg-table-select"
                            value={draft().rol}
                            onChange={(e) => updateDraftField(usr.id!, usr, 'rol', e.currentTarget.value)}
                          >
                            <option value="administrador">Administrador</option>
                            <option value="trabajador">Trabajador</option>
                          </select>
                        </td>
                        <td>
                          <span class={usr.estado ? 'sg-status-active' : 'sg-status-suspended'}>
                            {usr.estado ? 'Activo' : 'Suspendido'}
                          </span>
                        </td>
                        <td>
                          <div class="sg-actions-cell">
                            <button class="btn btn-enable" onClick={() => handleToggleEstado(usr.id!, true)}>
                              Habilitar
                            </button>
                            <button class="btn btn-suspend" onClick={() => handleToggleEstado(usr.id!, false)}>
                              Suspender
                            </button>
                            <button class="btn btn-save-cloud" onClick={() => saveRow(usr)}>
                              <div class="svg-wrapper-1">
                                <div class="svg-wrapper">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                                    <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z" />
                                  </svg>
                                </div>
                              </div>
                              <span>Guardar</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }}
                </For>
              </tbody>
            </table>
          </div>
        </div>

        {/* SEGUNDO DIV: Búsqueda Horizontal y Tarjetas de Resultado */}
        <div class="sg-cu-section-card">
          <h2 class="sg-section-title">Ver información completa de un usuario</h2>

          <div class="sg-search-container">
            <div class="sg-search-fields-group">
              <div class="sg-field-group">
                <label>Primer Nombre</label>
                <input
                  type="text"
                  class="sg-input"
                  value={searchForm().nombre1}
                  onInput={(e) => setSearchForm({ ...searchForm(), nombre1: sanitizeLettersOnly(e.currentTarget.value) })}
                />
              </div>
              <div class="sg-field-group">
                <label>Segundo Nombre</label>
                <input
                  type="text"
                  class="sg-input"
                  value={searchForm().nombre2}
                  onInput={(e) => setSearchForm({ ...searchForm(), nombre2: sanitizeLettersOnly(e.currentTarget.value) })}
                />
              </div>
              <div class="sg-field-group">
                <label>Primer Apellido</label>
                <input
                  type="text"
                  class="sg-input"
                  value={searchForm().apellido1}
                  onInput={(e) => setSearchForm({ ...searchForm(), apellido1: sanitizeLettersOnly(e.currentTarget.value) })}
                />
              </div>
              <div class="sg-field-group">
                <label>Segundo Apellido</label>
                <input
                  type="text"
                  class="sg-input"
                  value={searchForm().apellido2}
                  onInput={(e) => setSearchForm({ ...searchForm(), apellido2: sanitizeLettersOnly(e.currentTarget.value) })}
                />
              </div>
            </div>

            <button class="btn-save-cloud btn-search" onClick={() => handleSearchUsers(searchForm())}>
              <div class="svg-wrapper-1">
                <div class="svg-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                </div>
              </div>
              <span>Buscar</span>
            </button>
          </div>

          <div class="sg-user-profile-cards-wrapper">
            <For each={busquedaResult()}>
              {(usr) => {
                const draft = () => getDraft(usr);
                return (
                  <div class="sg-user-card">
                    <div class="sg-user-card-header">
                      <h3 class="sg-user-card-title">
                        {usr.nombre1} {usr.nombre2} {usr.apellido1} {usr.apellido2}
                      </h3>
                      <span class={usr.estado ? 'sg-status-active' : 'sg-status-suspended'}>
                        {usr.estado ? 'Activo' : 'Suspendido'}
                      </span>
                    </div>

                    <div class="sg-user-card-grid">
                      <div class="sg-card-field">
                        <label>Primer Nombre</label>
                        <input
                          type="text"
                          class="sg-input"
                          value={draft().nombre1}
                          onInput={(e) => updateDraftField(usr.id!, usr, 'nombre1', sanitizeLettersOnly(e.currentTarget.value))}
                        />
                      </div>
                      <div class="sg-card-field">
                        <label>Segundo Nombre</label>
                        <input
                          type="text"
                          class="sg-input"
                          value={draft().nombre2}
                          onInput={(e) => updateDraftField(usr.id!, usr, 'nombre2', sanitizeLettersOnly(e.currentTarget.value))}
                        />
                      </div>
                      <div class="sg-card-field">
                        <label>Primer Apellido</label>
                        <input
                          type="text"
                          class="sg-input"
                          value={draft().apellido1}
                          onInput={(e) => updateDraftField(usr.id!, usr, 'apellido1', sanitizeLettersOnly(e.currentTarget.value))}
                        />
                      </div>
                      <div class="sg-card-field">
                        <label>Segundo Apellido</label>
                        <input
                          type="text"
                          class="sg-input"
                          value={draft().apellido2}
                          onInput={(e) => updateDraftField(usr.id!, usr, 'apellido2', sanitizeLettersOnly(e.currentTarget.value))}
                        />
                      </div>
                      <div class="sg-card-field">
                        <label>Gmail</label>
                        <input
                          type="text"
                          class="sg-input"
                          value={draft().gmailUsuario}
                          onInput={(e) => updateDraftField(usr.id!, usr, 'gmailUsuario', sanitizeEmail(e.currentTarget.value))}
                        />
                      </div>
                      <div class="sg-card-field">
                        <label>Carnet Identidad</label>
                        <input
                          type="text"
                          class="sg-input"
                          value={draft().carnetIdentidad}
                          onInput={(e) => updateDraftField(usr.id!, usr, 'carnetIdentidad', sanitizeNumbersOnly(e.currentTarget.value))}
                        />
                      </div>
                      <div class="sg-card-field">
                        <label>Complemento</label>
                        <input
                          type="text"
                          class="sg-input"
                          value={draft().complemento}
                          onInput={(e) => updateDraftField(usr.id!, usr, 'complemento', sanitizeAlphanumericNoSpaces(e.currentTarget.value))}
                        />
                      </div>
                      <div class="sg-card-field">
                        <label>Número Celular</label>
                        <input
                          type="text"
                          class="sg-input"
                          value={draft().numeroCelular}
                          onInput={(e) => updateDraftField(usr.id!, usr, 'numeroCelular', sanitizePhone(e.currentTarget.value))}
                        />
                      </div>
                      <div class="sg-card-field">
                        <label>Dirección</label>
                        <input
                          type="text"
                          class="sg-input"
                          value={draft().direccion}
                          onInput={(e) => updateDraftField(usr.id!, usr, 'direccion', e.currentTarget.value)}
                        />
                      </div>
                      <div class="sg-card-field">
                        <label>Fecha Nacimiento</label>
                        <input
                          type="date"
                          class="sg-input"
                          value={draft().fechaNacimiento}
                          onChange={(e) => updateDraftField(usr.id!, usr, 'fechaNacimiento', e.currentTarget.value)}
                        />
                      </div>
                      <div class="sg-card-field">
                        <label>Grupo Sanguíneo</label>
                        <input
                          type="text"
                          class="sg-input"
                          value={draft().grupoSanguineo}
                          onInput={(e) => updateDraftField(usr.id!, usr, 'grupoSanguineo', sanitizeBloodType(e.currentTarget.value))}
                        />
                      </div>
                      <div class="sg-card-field">
                        <label>Rol</label>
                        <select
                          class="sg-input"
                          value={draft().rol}
                          onChange={(e) => updateDraftField(usr.id!, usr, 'rol', e.currentTarget.value)}
                        >
                          <option value="administrador">Administrador</option>
                          <option value="trabajador">Trabajador</option>
                        </select>
                      </div>
                    </div>

                    <div class="sg-user-card-actions">
                      <button class="btn btn-enable" onClick={() => handleToggleEstado(usr.id!, true, true)}>
                        Habilitar
                      </button>
                      <button class="btn btn-suspend" onClick={() => handleToggleEstado(usr.id!, false, true)}>
                        Suspender
                      </button>
                      <button class="btn btn-save-cloud" onClick={() => saveRow(usr)}>
                        <div class="svg-wrapper-1">
                          <div class="svg-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                              <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z" />
                            </svg>
                          </div>
                        </div>
                        <span>Guardar Cambios</span>
                      </button>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </div>
      </main>

      {/* POP-UP / MODAL REGISTRAR USUARIO */}
      <Show when={isModalOpen()}>
        <div class="sg-modal-overlay">
          <div class="sg-modal-card" ref={modalRef}>
            <h3 class="sg-modal-title">Registrar Nuevo Usuario</h3>

            <div class="sg-modal-grid">
              <div class="sg-field-group">
                <label>Primer Nombre *</label>
                <input
                  type="text"
                  class="sg-input"
                  value={newUserForm().nombre1}
                  onInput={(e) => setNewUserForm({ ...newUserForm(), nombre1: sanitizeLettersOnly(e.currentTarget.value) })}
                />
                <Show when={modalErrors().nombre1}>
                  <span class="sg-error-text">{modalErrors().nombre1}</span>
                </Show>
              </div>

              <div class="sg-field-group">
                <label>Segundo Nombre</label>
                <input
                  type="text"
                  class="sg-input"
                  value={newUserForm().nombre2}
                  onInput={(e) => setNewUserForm({ ...newUserForm(), nombre2: sanitizeLettersOnly(e.currentTarget.value) })}
                />
              </div>

              <div class="sg-field-group">
                <label>Primer Apellido *</label>
                <input
                  type="text"
                  class="sg-input"
                  value={newUserForm().apellido1}
                  onInput={(e) => setNewUserForm({ ...newUserForm(), apellido1: sanitizeLettersOnly(e.currentTarget.value) })}
                />
                <Show when={modalErrors().apellido1}>
                  <span class="sg-error-text">{modalErrors().apellido1}</span>
                </Show>
              </div>

              <div class="sg-field-group">
                <label>Segundo Apellido</label>
                <input
                  type="text"
                  class="sg-input"
                  value={newUserForm().apellido2}
                  onInput={(e) => setNewUserForm({ ...newUserForm(), apellido2: sanitizeLettersOnly(e.currentTarget.value) })}
                />
              </div>

              <div class="sg-field-group">
                <label>Gmail Usuario *</label>
                <input
                  type="text"
                  class="sg-input"
                  placeholder="ejemplo@gmail.com"
                  value={newUserForm().gmailUsuario}
                  onInput={(e) => setNewUserForm({ ...newUserForm(), gmailUsuario: sanitizeEmail(e.currentTarget.value) })}
                />
                <Show when={modalErrors().gmailUsuario}>
                  <span class="sg-error-text">{modalErrors().gmailUsuario}</span>
                </Show>
              </div>

              <div class="sg-field-group">
                <label>Rol *</label>
                <select
                  class="sg-input"
                  value={newUserForm().rol}
                  onChange={(e) => setNewUserForm({ ...newUserForm(), rol: e.currentTarget.value })}
                >
                  <option value="trabajador">Trabajador</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>

              <div class="sg-field-group">
                <label>Carnet Identidad *</label>
                <input
                  type="text"
                  class="sg-input"
                  value={newUserForm().carnetIdentidad}
                  onInput={(e) => setNewUserForm({ ...newUserForm(), carnetIdentidad: sanitizeNumbersOnly(e.currentTarget.value) })}
                />
                <Show when={modalErrors().carnetIdentidad}>
                  <span class="sg-error-text">{modalErrors().carnetIdentidad}</span>
                </Show>
              </div>

              <div class="sg-field-group">
                <label>Complemento</label>
                <input
                  type="text"
                  class="sg-input"
                  value={newUserForm().complemento}
                  onInput={(e) => setNewUserForm({ ...newUserForm(), complemento: sanitizeAlphanumericNoSpaces(e.currentTarget.value) })}
                />
              </div>

              <div class="sg-field-group">
                <label>Número Celular *</label>
                <input
                  type="text"
                  class="sg-input"
                  value={newUserForm().numeroCelular}
                  onInput={(e) => setNewUserForm({ ...newUserForm(), numeroCelular: sanitizePhone(e.currentTarget.value) })}
                />
                <Show when={modalErrors().numeroCelular}>
                  <span class="sg-error-text">{modalErrors().numeroCelular}</span>
                </Show>
              </div>

              <div class="sg-field-group">
                <label>Dirección</label>
                <input
                  type="text"
                  class="sg-input"
                  value={newUserForm().direccion}
                  onInput={(e) => setNewUserForm({ ...newUserForm(), direccion: e.currentTarget.value })}
                />
              </div>

              <div class="sg-field-group">
                <label>Fecha Nacimiento</label>
                <input
                  type="date"
                  class="sg-input"
                  value={newUserForm().fechaNacimiento}
                  onChange={(e) => setNewUserForm({ ...newUserForm(), fechaNacimiento: e.currentTarget.value })}
                />
              </div>

              <div class="sg-field-group">
                <label>Grupo Sanguíneo</label>
                <input
                  type="text"
                  class="sg-input"
                  placeholder="ej. O+"
                  value={newUserForm().grupoSanguineo}
                  onInput={(e) => setNewUserForm({ ...newUserForm(), grupoSanguineo: sanitizeBloodType(e.currentTarget.value) })}
                />
              </div>

              <div class="sg-field-group sg-full-width">
                <label>Contraseña *</label>
                <div class="sg-password-wrapper">
                  <input
                    type={showPassword() ? 'text' : 'password'}
                    class="sg-input"
                    value={newUserForm().contrasena}
                    onInput={(e) => setNewUserForm({ ...newUserForm(), contrasena: sanitizePassword(e.currentTarget.value) })}
                  />
                  <button
                    type="button"
                    class="sg-toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword())}
                  >
                    <Show when={showPassword()} fallback={
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    </Show>
                  </button>
                </div>
                <Show when={modalErrors().contrasena}>
                  <span class="sg-error-text">{modalErrors().contrasena}</span>
                </Show>
              </div>
            </div>

            <div class="sg-modal-actions">
              <button class="sg-btn-register-bright" onClick={() => handleRegisterUser(newUserForm(), closeModal)}>
                Registrar
              </button>
              <button class="sg-btn-cancel-red" onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Show>

      <SGFooter />
    </div>
  );
};

export default SGCrearUsuario;