import { type Component, For, Show } from 'solid-js';
import { useSGVerProductosLogic } from './sg-ver-produc-logico';

// Importación de Header y Footer reutilizables
import { SGHeader } from '../../componentesR/SG-header/sg-header';
import { SGFooter } from '../../componentesR/SG-footer/sg-footer';

import './sg-ver-productos.css';

export const SGVerProductos: Component = () => {
  const { productos } = useSGVerProductosLogic();

  return (
    <div class="sg-ver-productos-container">
      {/* Header Reutilizable */}
      <SGHeader />

      {/* Contenido Principal */}
      <main class="sg-main-content">
        
        {/* Título de la Sección */}
        <div class="sg-header-section">
          <h1 class="sg-title">Inventario de Productos</h1>
          <p class="sg-subtitle">Son todos los productos disponibles</p>
        </div>

        {/* Grid de Tarjetas de Productos (Solo Lectura) */}
        <div class="sg-productos-grid">
          <For each={productos()}>
            {(producto) => (
              <div
                id={`sg-card-ver-${producto.id}`}
                class="sg-card-producto"
                classList={{ 'sg-card-disabled': !producto.estado }}
              >
                {/* Imagen del Producto */}
                <div class="sg-card-image-box">
                  <Show
                    when={producto.imagenUrl}
                    fallback={
                      <div class="sg-image-placeholder">
                        <span>Sin Imagen</span>
                      </div>
                    }
                  >
                    <img
                      src={producto.imagenUrl}
                      alt={producto.modelo}
                      class="sg-card-img"
                    />
                  </Show>
                </div>

                {/* Filas de Información (Solo Lectura) */}
                <div class="sg-card-fields">
                  <div class="sg-field-row">
                    <span class="sg-field-label">Marca</span>
                    <span class="sg-field-val">{producto.marca}</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Modelo</span>
                    <span class="sg-field-val">{producto.modelo}</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Precio</span>
                    <span class="sg-field-val">${producto.precio}</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Estado</span>
                    <span
                      class="sg-field-badge"
                      classList={{
                        'sg-badge-active': producto.estado,
                        'sg-badge-inactive': !producto.estado,
                      }}
                    >
                      {producto.estado ? 'Activo' : 'Agotado'}
                    </span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Procesador</span>
                    <span class="sg-field-val">{producto.procesador}</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Almacenamiento</span>
                    <span class="sg-field-val">{producto.almacenamiento} GB</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">RAM</span>
                    <span class="sg-field-val">{producto.ram} GB</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Batería</span>
                    <span class="sg-field-val">{producto.bateria} mAh</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Puntuación AnTuTu</span>
                    <span class="sg-field-val">{producto.puntuacionAntutu} pts</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Pantalla</span>
                    <span class="sg-field-val">{producto.pantalla}</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Cámara Principal</span>
                    <span class="sg-field-val">{producto.camaraPrincipal} MP</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Certificación IP</span>
                    <span class="sg-field-val">{producto.certificacionIp ? 'Sí' : 'No'}</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Carga Rápida</span>
                    <span class="sg-field-val">{producto.cargaRapida} W</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Cámara Frontal</span>
                    <span class="sg-field-val">{producto.camaraFrontal} MP</span>
                  </div>

                  <div class="sg-field-row">
                    <span class="sg-field-label">Tasa Refresco</span>
                    <span class="sg-field-val">{producto.tasaRefresco} Hz</span>
                  </div>

                  <div class="sg-field-row sg-span-2">
                    <span class="sg-field-label">Más Información</span>
                    <span class="sg-field-val sg-text-desc">{producto.masInformacion || '-'}</span>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </main>

      {/* Footer Reutilizable */}
      <SGFooter />
    </div>
  );
};

export default SGVerProductos;