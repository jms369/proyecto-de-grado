import { type Component, For, Show } from 'solid-js';
import { useSGEditarProductosLogic } from './sg-editar-produc-logico';
import { sanitizeNumericInput } from '../../types/sg-editar-productos-i-m';
import type { SGProductoModel } from '../../types/sg-editar-productos-i-m';

// Reutilización de Header y Footer generales
import { SGHeader } from '../../componentesR/SG-header/sg-header';
import { SGFooter } from '../../componentesR/SG-footer/sg-footer';

import './sg-editar-productos.css';

export const SGEditarProductos: Component = () => {
  const {
    productos,
    isModalOpen,
    nuevoProductoForm,
    setNuevoProductoForm,
    tempEditForms,
    handleOpenModal,
    handleCloseModal,
    handleCreateProductoSubmit,
    handleStartEdit,
    handleUpdateTempField,
    handleSaveProducto,
    handleToggleEstado,
    handleDeleteProducto,
    handleImageUpload,
  } = useSGEditarProductosLogic();

  return (
    <div class="sg-app-container">
      {/* Header Reutilizable */}
      <SGHeader />

      {/* Contenido Principal */}
      <main class="sg-main-content">
        {/* ===================================================================
            PRIMER DIV: Botón de Crear Producto Nuevo (Estilo btn-53 Ancho)
           =================================================================== */}
        <div class="sg-actions-bar">
          <button class="btn-53" onClick={handleOpenModal}>
            <div class="original">Crear Producto Nuevo</div>
            <div class="letters">
              <span>C</span>
              <span>R</span>
              <span>E</span>
              <span>A</span>
              <span>R</span>
              <span>&nbsp;</span>
              <span>N</span>
              <span>U</span>
              <span>E</span>
              <span>V</span>
              <span>O</span>
            </div>
          </button>
        </div>

        {/* ===================================================================
            SEGUNDO DIV: Grid de Tarjetas de Productos
           =================================================================== */}
        <div class="sg-productos-grid">
          <For each={productos()}>
            {(producto) => {
              const isEditing = () => producto.isEditing ?? false;
              const currentData = (): SGProductoModel =>
                tempEditForms()[producto.id] || producto;

              return (
                <div
                  id={`sg-card-${producto.id}`}
                  class="sg-card-producto"
                  classList={{ 'sg-card-disabled': !producto.estado }}
                >
                  {/* Espacio Fijo para Imagen */}
                  <div class="sg-card-image-box">
                    <Show
                      when={currentData().imagenUrl}
                      fallback={
                        <div class="sg-image-placeholder">
                          <span>Subir Imagen</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                        </div>
                      }
                    >
                      <img
                        src={currentData().imagenUrl}
                        alt={currentData().modelo}
                        class="sg-card-img"
                      />
                    </Show>

                    {/* Subir imagen editable */}
                    <Show when={isEditing()}>
                      <label class="sg-upload-overlay">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0];
                            if (file) handleImageUpload(producto.id, file);
                          }}
                        />
                        <span>Cambiar Imagen</span>
                      </label>
                    </Show>
                  </div>

                  {/* Filas de Información (2 Columnas) */}
                  <div class="sg-card-fields">
                    {/* Marca (Editable) */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Marca</span>
                      <Show
                        when={isEditing()}
                        fallback={<span class="sg-field-val">{producto.marca}</span>}
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().marca}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'marca',
                              e.currentTarget.value
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* Modelo (Editable) */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Modelo</span>
                      <Show
                        when={isEditing()}
                        fallback={<span class="sg-field-val">{producto.modelo}</span>}
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().modelo}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'modelo',
                              e.currentTarget.value
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* Precio */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Precio ($)</span>
                      <Show
                        when={isEditing()}
                        fallback={<span class="sg-field-val">${producto.precio}</span>}
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().precio}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'precio',
                              sanitizeNumericInput(e.currentTarget.value)
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* Estado */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Estado</span>
                      <span
                        class="sg-field-badge"
                        classList={{
                          'sg-badge-active': producto.estado,
                          'sg-badge-inactive': !producto.estado,
                        }}
                      >
                        {producto.estado ? 'Activo' : 'Oculto'}
                      </span>
                    </div>

                    {/* Procesador */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Procesador</span>
                      <Show
                        when={isEditing()}
                        fallback={<span class="sg-field-val">{producto.procesador}</span>}
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().procesador}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'procesador',
                              e.currentTarget.value
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* Almacenamiento */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Almacenamiento</span>
                      <Show
                        when={isEditing()}
                        fallback={
                          <span class="sg-field-val">{producto.almacenamiento} GB</span>
                        }
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().almacenamiento}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'almacenamiento',
                              sanitizeNumericInput(e.currentTarget.value)
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* RAM */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">RAM</span>
                      <Show
                        when={isEditing()}
                        fallback={<span class="sg-field-val">{producto.ram} GB</span>}
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().ram}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'ram',
                              sanitizeNumericInput(e.currentTarget.value)
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* Batería */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Batería</span>
                      <Show
                        when={isEditing()}
                        fallback={
                          <span class="sg-field-val">{producto.bateria} mAh</span>
                        }
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().bateria}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'bateria',
                              sanitizeNumericInput(e.currentTarget.value)
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* Puntuación AnTuTu */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Puntuación AnTuTu</span>
                      <Show
                        when={isEditing()}
                        fallback={
                          <span class="sg-field-val">
                            {producto.puntuacionAntutu} pts
                          </span>
                        }
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().puntuacionAntutu}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'puntuacionAntutu',
                              sanitizeNumericInput(e.currentTarget.value)
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* Pantalla */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Pantalla</span>
                      <Show
                        when={isEditing()}
                        fallback={<span class="sg-field-val">{producto.pantalla}</span>}
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().pantalla}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'pantalla',
                              e.currentTarget.value
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* Cámara Principal */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Cámara Principal</span>
                      <Show
                        when={isEditing()}
                        fallback={
                          <span class="sg-field-val">{producto.camaraPrincipal} MP</span>
                        }
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().camaraPrincipal}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'camaraPrincipal',
                              sanitizeNumericInput(e.currentTarget.value)
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* Certificación IP */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Certificación IP</span>
                      <Show
                        when={isEditing()}
                        fallback={
                          <span class="sg-field-val">
                            {producto.certificacionIp ? 'Sí' : 'No'}
                          </span>
                        }
                      >
                        <select
                          class="sg-input-edit"
                          value={currentData().certificacionIp ? 'true' : 'false'}
                          onChange={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'certificacionIp',
                              e.currentTarget.value === 'true'
                            )
                          }
                        >
                          <option value="true">Sí</option>
                          <option value="false">No</option>
                        </select>
                      </Show>
                    </div>

                    {/* Carga Rápida */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Carga Rápida</span>
                      <Show
                        when={isEditing()}
                        fallback={
                          <span class="sg-field-val">{producto.cargaRapida} W</span>
                        }
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().cargaRapida}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'cargaRapida',
                              sanitizeNumericInput(e.currentTarget.value)
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* Cámara Frontal */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Cámara Frontal</span>
                      <Show
                        when={isEditing()}
                        fallback={
                          <span class="sg-field-val">{producto.camaraFrontal} MP</span>
                        }
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().camaraFrontal}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'camaraFrontal',
                              sanitizeNumericInput(e.currentTarget.value)
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* Tasa Refresco */}
                    <div class="sg-field-row">
                      <span class="sg-field-label">Tasa Refresco</span>
                      <Show
                        when={isEditing()}
                        fallback={
                          <span class="sg-field-val">{producto.tasaRefresco} Hz</span>
                        }
                      >
                        <input
                          type="text"
                          class="sg-input-edit"
                          value={currentData().tasaRefresco}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'tasaRefresco',
                              sanitizeNumericInput(e.currentTarget.value)
                            )
                          }
                        />
                      </Show>
                    </div>

                    {/* Más Información */}
                    <div class="sg-field-row sg-span-2">
                      <span class="sg-field-label">Más Información</span>
                      <Show
                        when={isEditing()}
                        fallback={
                          <span class="sg-field-val">
                            {producto.masInformacion || '-'}
                          </span>
                        }
                      >
                        <textarea
                          class="sg-input-edit sg-textarea"
                          value={currentData().masInformacion}
                          onInput={(e) =>
                            handleUpdateTempField(
                              producto.id,
                              'masInformacion',
                              e.currentTarget.value
                            )
                          }
                        />
                      </Show>
                    </div>
                  </div>

                  {/* 5 Botones de Acción de la Tarjeta */}
                  <div class="sg-card-actions">
                    <button
                      class="btn sg-btn-editar"
                      onClick={() => handleStartEdit(producto.id)}
                    >
                      Editar
                    </button>
                    <button
                      class="btn sg-btn-ocultar"
                      onClick={() => handleToggleEstado(producto.id, false)}
                    >
                      Ocultar
                    </button>
                    <button
                      class="btn sg-btn-guardar"
                      onClick={() => handleSaveProducto(producto.id)}
                    >
                      Guardar
                    </button>
                    <button
                      class="btn sg-btn-eliminar"
                      onClick={() => handleDeleteProducto(producto.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      class="btn sg-btn-visible"
                      onClick={() => handleToggleEstado(producto.id, true)}
                    >
                      Visible
                    </button>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </main>

      {/* POP-UP / MODAL DE NUEVO PRODUCTO */}
      <Show when={isModalOpen()}>
        <div class="sg-modal-overlay">
          <div class="sg-modal-container">
            <h2 class="sg-modal-title">Registrar Nuevo Producto</h2>

            <form onSubmit={handleCreateProductoSubmit}>
              {/* Carga de Imagen */}
              <div class="sg-card-image-box" style={{ "margin-bottom": "1rem" }}>
                <Show
                  when={nuevoProductoForm().imagenUrl}
                  fallback={
                    <div class="sg-image-placeholder">
                      <span>Seleccionar Imagen</span>
                    </div>
                  }
                >
                  <img
                    src={nuevoProductoForm().imagenUrl}
                    alt="Preview"
                    class="sg-card-img"
                  />
                </Show>
                <label class="sg-upload-overlay" style={{ opacity: 1, background: "transparent" }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      if (file) handleImageUpload(null, file);
                    }}
                  />
                </label>
              </div>

              {/* Formulario */}
              <div class="sg-form-grid">
                <div class="sg-form-group">
                  <label>Marca</label>
                  <input
                    type="text"
                    required
                    value={nuevoProductoForm().marca}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({ ...p, marca: e.currentTarget.value }))
                    }
                  />
                </div>

                <div class="sg-form-group">
                  <label>Modelo</label>
                  <input
                    type="text"
                    required
                    value={nuevoProductoForm().modelo}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({ ...p, modelo: e.currentTarget.value }))
                    }
                  />
                </div>

                <div class="sg-form-group">
                  <label>Precio ($)</label>
                  <input
                    type="text"
                    required
                    value={nuevoProductoForm().precio || ''}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        precio: sanitizeNumericInput(e.currentTarget.value),
                      }))
                    }
                  />
                </div>

                <div class="sg-form-group">
                  <label>Procesador</label>
                  <input
                    type="text"
                    value={nuevoProductoForm().procesador}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        procesador: e.currentTarget.value,
                      }))
                    }
                  />
                </div>

                <div class="sg-form-group">
                  <label>Almacenamiento (GB)</label>
                  <input
                    type="text"
                    value={nuevoProductoForm().almacenamiento || ''}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        almacenamiento: sanitizeNumericInput(e.currentTarget.value),
                      }))
                    }
                  />
                </div>

                <div class="sg-form-group">
                  <label>RAM (GB)</label>
                  <input
                    type="text"
                    value={nuevoProductoForm().ram || ''}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        ram: sanitizeNumericInput(e.currentTarget.value),
                      }))
                    }
                  />
                </div>

                <div class="sg-form-group">
                  <label>Batería (mAh)</label>
                  <input
                    type="text"
                    value={nuevoProductoForm().bateria || ''}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        bateria: sanitizeNumericInput(e.currentTarget.value),
                      }))
                    }
                  />
                </div>

                <div class="sg-form-group">
                  <label>Puntuación AnTuTu</label>
                  <input
                    type="text"
                    value={nuevoProductoForm().puntuacionAntutu || ''}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        puntuacionAntutu: sanitizeNumericInput(e.currentTarget.value),
                      }))
                    }
                  />
                </div>

                <div class="sg-form-group">
                  <label>Pantalla</label>
                  <input
                    type="text"
                    value={nuevoProductoForm().pantalla}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        pantalla: e.currentTarget.value,
                      }))
                    }
                  />
                </div>

                <div class="sg-form-group">
                  <label>Cámara Principal (MP)</label>
                  <input
                    type="text"
                    value={nuevoProductoForm().camaraPrincipal || ''}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        camaraPrincipal: sanitizeNumericInput(e.currentTarget.value),
                      }))
                    }
                  />
                </div>

                <div class="sg-form-group">
                  <label>Certificación IP</label>
                  <select
                    value={nuevoProductoForm().certificacionIp ? 'true' : 'false'}
                    onChange={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        certificacionIp: e.currentTarget.value === 'true',
                      }))
                    }
                  >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div class="sg-form-group">
                  <label>Carga Rápida (W)</label>
                  <input
                    type="text"
                    value={nuevoProductoForm().cargaRapida || ''}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        cargaRapida: sanitizeNumericInput(e.currentTarget.value),
                      }))
                    }
                  />
                </div>

                <div class="sg-form-group">
                  <label>Cámara Frontal (MP)</label>
                  <input
                    type="text"
                    value={nuevoProductoForm().camaraFrontal || ''}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        camaraFrontal: sanitizeNumericInput(e.currentTarget.value),
                      }))
                    }
                  />
                </div>

                <div class="sg-form-group">
                  <label>Tasa Refresco (Hz)</label>
                  <input
                    type="text"
                    value={nuevoProductoForm().tasaRefresco || ''}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        tasaRefresco: sanitizeNumericInput(e.currentTarget.value),
                      }))
                    }
                  />
                </div>

                <div class="sg-form-group sg-span-2">
                  <label>Más Información</label>
                  <textarea
                    rows="3"
                    value={nuevoProductoForm().masInformacion}
                    onInput={(e) =>
                      setNuevoProductoForm((p) => ({
                        ...p,
                        masInformacion: e.currentTarget.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Botones del Modal */}
              <div class="sg-modal-footer">
                <button type="submit" class="sg-btn-modal-crear">
                  Crear
                </button>
                <button
                  type="button"
                  class="sg-btn-modal-cancelar"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Show>

      {/* Footer Reutilizable */}
      <SGFooter />
    </div>
  );
};

export default SGEditarProductos;