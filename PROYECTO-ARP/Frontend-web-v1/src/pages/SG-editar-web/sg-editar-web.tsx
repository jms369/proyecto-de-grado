// ============================================================================
// INICIO MODIFICACIÓN: Ensamblaje de la vista JSX SG-editar-web con Solid.js
// ============================================================================
import type { Component } from 'solid-js';
import { Show, For } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { useEditarWebLogic } from './sg-editar-web-logico';
import { sanitizeUrlInput } from '../../types/sg-editar-web-i-m';
import './sg-editar-web.css';

// Componentes Reutilizables Simulados (Ajustar rutas según tu proyecto)
import Header from '../../componentesR/SG-header/sg-header';
import Footer from '../../componentesR/SG-footer/sg-footer';

const SGEditarWeb: Component = () => {
  const navigate = useNavigate();
  const logic = useEditarWebLogic(navigate);

  return (
    <div class="sg-editar-web-wrapper" id="sg-editar-web-main">
      <Header />
      
      <main class="content-container">
        <h1 class="main-title">Editar Sitio Web</h1>

        {/* 1. SECCIÓN LOGOTIPO */}
        <div class="section-card">
          <h2 class="section-title">Logotipo</h2>
          <div class="logo-preview-box">
            <Show when={logic.logoPreview()} fallback={<span>Sin Logo</span>}>
              <img src={logic.logoPreview()!} alt="Previsualización de Logo" />
            </Show>
          </div>
          
          <div class="button-group">
            {/* Input oculto para subir */}
            <input type="file" id="logo-upload" accept="image/png, image/jpeg" style="display: none;" onChange={logic.handleLogoUpload} />
            
            <button class="btn-action btn-blue" onClick={() => document.getElementById('logo-upload')?.click()}>
              <div class="svg-wrapper-1"><div class="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"></path></svg>
              </div></div>
              <span>Subir Imagen</span>
            </button>

            <button class="btn-delete-prompt noselect" onClick={logic.handleDeleteLogo}>
              <span class="text">Eliminar Logo</span>
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg>
              </span>
            </button>

            <button class="btn-action btn-green" onClick={logic.handleSaveLogo}>
              <div class="svg-wrapper-1"><div class="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"></path></svg>
              </div></div>
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>

        {/* 2. SECCIÓN ENLACES */}
        <div class="section-card">
          <h2 class="section-title">Enlaces</h2>
          
          <div class="input-group">
            <input type="text" id="enlace-fb" class="input-field" placeholder=" " 
              value={logic.links().facebook} onInput={(e) => logic.setLinks({...logic.links(), facebook: sanitizeUrlInput(e.currentTarget.value)})} />
            <label for="enlace-fb" class="floating-label">URL Facebook</label>
          </div>
            
          <div class="input-group">
            <input type="text" id="enlace-ig" class="input-field" placeholder=" " 
              value={logic.links().instagram} onInput={(e) => logic.setLinks({...logic.links(), instagram: sanitizeUrlInput(e.currentTarget.value)})} />
            <label for="enlace-ig" class="floating-label">URL Instagram</label>
          </div>
            
          <div class="input-group">
            <input type="text" id="enlace-wa" class="input-field" placeholder=" " 
              value={logic.links().whatsapp} onInput={(e) => logic.setLinks({...logic.links(), whatsapp: sanitizeUrlInput(e.currentTarget.value)})} />
            <label for="enlace-wa" class="floating-label">Número o URL de WhatsApp</label>
          </div>
            
          <div class="input-group">
            <input type="text" id="enlace-tk" class="input-field" placeholder=" " 
              value={logic.links().tiktok} onInput={(e) => logic.setLinks({...logic.links(), tiktok: sanitizeUrlInput(e.currentTarget.value)})} />
            <label for="enlace-tk" class="floating-label">URL TikTok</label>
          </div>
            
          <div class="input-group">
            <input type="text" id="enlace-ub" class="input-field" placeholder=" " 
              value={logic.links().ubicacion} onInput={(e) => logic.setLinks({...logic.links(), ubicacion: sanitizeUrlInput(e.currentTarget.value)})} />
            <label for="enlace-ub" class="floating-label">URL de Ubicación (Google Maps)</label>
          </div>
            
          <div class="button-group">
            <button class="btn-action btn-green" onClick={logic.handleSaveLinks}>
               <div class="svg-wrapper-1"><div class="svg-wrapper">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"></path></svg>
               </div></div>
               <span>Guardar Cambios</span>
            </button>
          </div>
        </div>

        {/* 3. SECCIÓN MÁS INFORMACIÓN */}
        <div class="section-card">
          <h2 class="section-title">Más Información</h2>
          <Show when={logic.isEditingInfo()} fallback={
            <div class="input-field" onClick={() => logic.setIsEditingInfo(true)} style="cursor: pointer; min-height: 100px;">
              {logic.infoText()}
            </div>
          }>
            <textarea class="textarea-field" rows="5" value={logic.infoText()} onInput={(e) => logic.setInfoText(e.currentTarget.value)} />
          </Show>
          <div class="button-group">
            <button class="btn-action btn-green" onClick={logic.handleSaveInfo}>
               <div class="svg-wrapper-1"><div class="svg-wrapper">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"></path></svg>
               </div></div>
               <span>Guardar Cambios</span>
            </button>
          </div>
        </div>

        {/* 4. SECCIÓN IMÁGENES DE OFERTAS (Independientes) */}
        <div class="section-card">
          <h2 class="section-title">Imágenes de las ofertas</h2>
          <div class="gallery-grid">
            <For each={logic.offerImages()}>
              {(img) => (
                <div class="gallery-item">
                  <input type="checkbox" class="gallery-checkbox" checked={logic.selectedOfferImages().has(img.id)} onChange={() => logic.toggleSelectImage(img.id, false)} />
                  <img src={img.url} alt={img.nombreOriginal} onClick={() => logic.setPreviewModalUrl(img.url)} />
                </div>
              )}
            </For>
          </div>
          <div class="button-group">
            <input type="file" id="offer-upload" accept="image/png, image/jpeg" multiple style="display: none;" />
            <button class="btn-action btn-blue" onClick={() => document.getElementById('offer-upload')?.click()}>
              <div class="svg-wrapper-1"><div class="svg-wrapper"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"></path></svg></div></div>
              <span>Subir Imágenes</span>
            </button>
            <Show when={logic.selectedOfferImages().size > 0}>
              <button class="btn-delete-prompt noselect" onClick={() => logic.handleDeleteSelected(false)}>
                <span class="text">Eliminar Seleccionadas</span>
                <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
              </button>
            </Show>
          </div>
        </div>

        {/* 5. SECCIÓN IMÁGENES (Asociadas a Producto) */}
        <div class="section-card">
          <h2 class="section-title">Imágenes</h2>
          <div class="gallery-grid">
            <For each={logic.productImages()}>
              {(img) => (
                <div class="gallery-item">
                  <input type="checkbox" class="gallery-checkbox" checked={logic.selectedProductImages().has(img.id)} onChange={() => logic.toggleSelectImage(img.id, true)} />
                  <img src={img.url} alt={img.nombreOriginal} onClick={() => logic.setPreviewModalUrl(img.url)} />
                </div>
              )}
            </For>
          </div>
          <div class="button-group">
            <input type="file" id="product-upload" accept="image/png, image/jpeg" multiple style="display: none;" />
            <button class="btn-action btn-blue" onClick={() => document.getElementById('product-upload')?.click()}>
               <div class="svg-wrapper-1"><div class="svg-wrapper"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"></path></svg></div></div>
               <span>Subir Imágenes</span>
            </button>
            <Show when={logic.selectedProductImages().size > 0}>
              <button class="btn-delete-prompt noselect" onClick={() => logic.handleDeleteSelected(true)}>
                <span class="text">Eliminar Seleccionadas</span>
                <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
              </button>
            </Show>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Modal Lightbox */}
      <Show when={logic.previewModalUrl()}>
        <div class="modal-overlay" onClick={() => logic.setPreviewModalUrl(null)}>
          <div class="modal-content" onClick={(e) => e.stopPropagation()}>
            <span class="modal-close" onClick={() => logic.setPreviewModalUrl(null)}>&times;</span>
            <img src={logic.previewModalUrl()!} alt="Vista Previa Ampliada" />
          </div>
        </div>
      </Show>
    </div>
  );
};

export default SGEditarWeb;
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================