// src/pages/SG-ver-productos/sg-ver-productos.tsx

import { type Component, For, Show } from 'solid-js';
import { useSGVerProductosLogic } from './sg-ver-produc-logico';

import { SGHeader } from '../../componentesR/SG-header/sg-header';
import { SGFooter } from '../../componentesR/SG-footer/sg-footer';

import './sg-ver-productos.css';

export const SGVerProductos: Component = () => {
  const {
    productosFiltrados,
    marcasDisponibles,
    ramsDisponibles,
    almacenamientosDisponibles,
    filtroMarca, setFiltroMarca,
    filtroModelo, setFiltroModelo,
    filtroRam, setFiltroRam,
    filtroAlmacenamiento, setFiltroAlmacenamiento,
    filtroPrecioMax, setFiltroPrecioMax,
    limpiarFiltros,
    descargarPdfProductos,
    isLoadingPdf
  } = useSGVerProductosLogic();

  return (
    <div class="sg-ver-productos-container">
      <SGHeader />

      <main class="sg-main-content">
        
        {/* Título de la Sección */}
        <div class="sg-header-section">
          <h1 class="sg-title">Inventario de Productos</h1>
          <p class="sg-subtitle">Son todos los productos disponibles</p>
        </div>

        {/* DIV DE ACCIONES (Descargar PDF) */}
        <div class="sg-acciones-container">
          <button 
            class="sg-btn-descargar-pdf" 
            onClick={descargarPdfProductos}
            disabled={isLoadingPdf()}
          >
            {isLoadingPdf() ? 'Generando PDF...' : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Descargar Productos PDF
              </>
            )}
          </button>
        </div>

        {/* BARRA DE FILTROS */}
        <div class="sg-filtros-container">
          <div class="sg-filtro-group">
            <label>Marca</label>
            <select value={filtroMarca()} onChange={(e) => setFiltroMarca(e.currentTarget.value)}>
              <option value="">Todas las marcas</option>
              <For each={marcasDisponibles()}>
                {(marca) => <option value={marca}>{marca}</option>}
              </For>
            </select>
          </div>

          <div class="sg-filtro-group">
            <label>Modelo</label>
            <input 
              type="text" 
              placeholder="Buscar modelo..." 
              value={filtroModelo()} 
              onInput={(e) => setFiltroModelo(e.currentTarget.value)} 
            />
          </div>

          <div class="sg-filtro-group">
            <label>RAM (GB)</label>
            <select value={filtroRam()} onChange={(e) => setFiltroRam(e.currentTarget.value)}>
              <option value="">Cualquier RAM</option>
              <For each={ramsDisponibles()}>
                {(ram) => <option value={ram.toString()}>{ram} GB</option>}
              </For>
            </select>
          </div>

          <div class="sg-filtro-group">
            <label>Almacenamiento (GB)</label>
            <select value={filtroAlmacenamiento()} onChange={(e) => setFiltroAlmacenamiento(e.currentTarget.value)}>
              <option value="">Cualquier almac.</option>
              <For each={almacenamientosDisponibles()}>
                {(alm) => <option value={alm.toString()}>{alm} GB</option>}
              </For>
            </select>
          </div>

          <div class="sg-filtro-group">
            <label>Precio Máx (Bs)</label>
            <input 
              type="number" 
              placeholder="Ej. 3000" 
              value={filtroPrecioMax()} 
              onInput={(e) => setFiltroPrecioMax(e.currentTarget.value)} 
            />
          </div>

          <button class="sg-btn-limpiar-filtros" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>

        {/* Grid de Tarjetas de Productos */}
        <div class="sg-productos-grid">
          <For each={productosFiltrados()}>
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

                {/* Filas de Información */}
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
                    <span class="sg-field-val">Bs{producto.precio}</span>
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

        {/* Mensaje si no hay resultados */}
        <Show when={productosFiltrados().length === 0}>
          <div class="sg-sin-resultados">
            No se encontraron productos con los filtros seleccionados.
          </div>
        </Show>
      </main>

      <SGFooter />
    </div>
  );
};

export default SGVerProductos;