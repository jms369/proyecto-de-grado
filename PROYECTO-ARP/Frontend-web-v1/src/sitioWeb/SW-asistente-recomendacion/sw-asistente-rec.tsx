// ============================================================================
// INICIO MODIFICACIÓN: Desacoplamiento total de preguntas para evitar el bug de cruce
// ============================================================================

import type { Component } from 'solid-js';
import { For, Show, createSignal } from 'solid-js';
import SWHeader from '../../componentesR/SW-header/sw-header';
import SWFooter from '../../componentesR/SW-footer/sw-footer';
import { useAsistenteRecEstilo } from './sw-asistente-rec-estilo';
import { handleComenzarAnalisis, generarEnlaceWhatsAppIndividual, generarEnlaceWhatsAppGeneral } from './sw-asistente-rec-logico';
import type { SWProductoRecomendadoDTO } from '../../types/SW-types/sw-asistente-recomendacion-i-m';

import './sw-asistente-rec.css';

const SWAstistenteRecomendacion: Component = () => {
  const { 
    isAvanzadoOpen, 
    toggleAvanzado, 
    isLoading, 
    setIsLoading, 
    formBasico, 
    actualizarBasico, 
    formAvanzado, 
    actualizarAvanzado 
  } = useAsistenteRecEstilo();

  const [resultados, setResultados] = createSignal<SWProductoRecomendadoDTO[]>([]);

  const ejecutarBasico = (e: Event) => {
    e.preventDefault();
    setResultados([]);
    handleComenzarAnalisis({
      form: formBasico(),
      setLoading: setIsLoading,
      setResultados: setResultados,
    });
  };

  const ejecutarAvanzado = (e: Event) => {
    e.preventDefault();
    setResultados([]);
    handleComenzarAnalisis({
      form: formAvanzado(),
      setLoading: setIsLoading,
      setResultados: setResultados,
    });
  };

  return (
    <div class="sw-asistente-rec-container">
      <SWHeader />

      <main class="sw-asistente-rec-main">
        <h1 class="sw-asistente-rec-title">ASISTENTE DE RECOMENDACION</h1>
        <p class="sw-asistente-rec-subtitle">NOTA: responda las pregunta de una sola lista, ya sea el: Básico o Avanzado</p>

        {/* ================= FORMULARIO BÁSICO ================= */}
        <section class="sw-form-section">
          <h2 class="sw-section-heading">Básico</h2>
          <form class="sw-form-card" onSubmit={ejecutarBasico}>
            
            <div class="sw-question-group">
              <label>1.- Ingrese el monto de dinero que esta dispuesto a invertir en un teléfono celular:</label>
              <input
                type="number"
                class="sw-input-number"
                placeholder="Escriba aqui el monto en Bs."
                value={formBasico().precioARP === '' ? '' : formBasico().precioARP}
                onInput={(e) => {
                  const val = e.currentTarget.value;
                  actualizarBasico('precioARP', val === '' ? '' : parseInt(val) || 0);
                }}
                required
              />
            </div>

            <QuestionItem
              question="2.- ¿Te gustaría que el celular tome fotos buenas o muy buenas?"
              value={formBasico().camaraPrincipalARP}
              onChange={(val) => {
                actualizarBasico('camaraPrincipalARP', val);
                actualizarBasico('camaraFrontalARP', val);
              }}
            />

            <QuestionItem
              question="3.- ¿Te gustaría que al celular le dure más tiempo la batería?"
              value={formBasico().bateriaARP}
              onChange={(val) => actualizarBasico('bateriaARP', val)}
            />

            <QuestionItem
              question="4.- ¿Te gustaría que el celular tenga protección contra el agua?"
              value={formBasico().certificacionIPARP}
              onChange={(val) => actualizarBasico('certificacionIPARP', val)}
            />

            <QuestionItem
              question="5.- ¿Te gustaría utilizar el celular para ver películas o videos?"
              value={formBasico().pantallaARP}
              onChange={(val) => actualizarBasico('pantallaARP', val)}
            />

            <QuestionItem
              question="6.- ¿Te gustaría que el celular tenga mucho espacio para guardar fotos, videos, y más cosas?"
              value={formBasico().almacenamientoARP}
              onChange={(val) => actualizarBasico('almacenamientoARP', val)}
            />

            <QuestionItem
              question="7.- ¿Te gustaría que el celular sea más rápido?"
              value={formBasico().antutuARP}
              onChange={(val) => actualizarBasico('antutuARP', val)}
            />

            <QuestionItem
              question="8.- ¿Te gustaría utilizar el celular para abrir y utilizar muchas aplicaciones al mismo tiempo?"
              value={formBasico().ramARP}
              onChange={(val) => actualizarBasico('ramARP', val)}
            />

            <QuestionItem
              question="9.- ¿Te gustaría utilizar el celular para jugar videojuegos?"
              value={formBasico().tazaRefrezcoARP}
              onChange={(val) => actualizarBasico('tazaRefrezcoARP', val)}
            />

            {/* BOTÓN COMENZAR */}
            <div class="sw-btn-wrapper-container">
              <div class="btn-wrapper" onClick={ejecutarBasico}>
                <div class="light"></div>
                <div class="gradient-layer" style="animation-delay: 0s; animation-duration: 25s;"></div>
                <div class="gradient-layer" style="animation-delay: 0.15s; animation-duration: 15.9s;"></div>
                <div class="gradient-layer" style="animation-delay: 0.53s; animation-duration: 26.4s;"></div>
                <div class="gradient-layer" style="animation-delay: 0.45s; animation-duration: 17.8s;"></div>
                <div class="gradient-layer" style="animation-delay: 1.6s; animation-duration: 19.2s;"></div>
                <div class="gradient-layer" style="animation-delay: 1.6s; animation-duration: 29.2s;"></div>
                <div class="gradient-layer" style="animation-delay: 1.6s; animation-duration: 20.2s;"></div>
                <button type="button" class="gradient-btn">COMENZAR</button>
                <div class="text-overlay">COMENZAR</div>
              </div>
            </div>

          </form>
        </section>

        {/* ================= SECCIÓN AVANZADO ================= */}
        <section class="sw-form-section">
          <div class="sw-avanzado-toggle-bar" onClick={toggleAvanzado}>
            <h2 class="sw-section-heading">Avanzado</h2>
            <span class="sw-ver-mas-text">VER MÁS {isAvanzadoOpen() ? '▲' : '▼'}</span>
          </div>

          <Show when={isAvanzadoOpen()}>
            <form class="sw-form-card sw-avanzado-content" onSubmit={ejecutarAvanzado}>
              <p class="sw-avanzado-nota">Nota: Elige las opciones que más te interesen del celular según tus necesidades o preferencias.</p>

              <div class="sw-question-group">
                <label>1.- Ingrese el monto de dinero que esta dispuesto a invertir en un teléfono celular:</label>
                <input
                  type="number"
                  class="sw-input-number"
                  placeholder="Escriba aqui el monto en Bs."
                  value={formAvanzado().precioARP === '' ? '' : formAvanzado().precioARP}
                  onInput={(e) => {
                    const val = e.currentTarget.value;
                    actualizarAvanzado('precioARP', val === '' ? '' : parseInt(val) || 0);
                  }}
                  required
                />
              </div>

              <QuestionItem
                question="2.- ¿Cámaras?"
                value={formAvanzado().camaraPrincipalARP}
                onChange={(val) => {
                  actualizarAvanzado('camaraPrincipalARP', val);
                  actualizarAvanzado('camaraFrontalARP', val);
                }}
              />

              <QuestionItem
                question="3.- ¿Batería?"
                value={formAvanzado().bateriaARP}
                onChange={(val) => actualizarAvanzado('bateriaARP', val)}
              />

              <QuestionItem
                question="4.- ¿Protección contra el agua?"
                value={formAvanzado().certificacionIPARP}
                onChange={(val) => actualizarAvanzado('certificacionIPARP', val)}
              />

              <QuestionItem
                question="5.- ¿Pantalla?"
                value={formAvanzado().pantallaARP}
                onChange={(val) => actualizarAvanzado('pantallaARP', val)}
              />

              <QuestionItem
                question="6.- ¿Almacenamiento interno?"
                value={formAvanzado().almacenamientoARP}
                onChange={(val) => actualizarAvanzado('almacenamientoARP', val)}
              />

              <QuestionItem
                question="7.- ¿Procesador?"
                value={formAvanzado().antutuARP}
                onChange={(val) => actualizarAvanzado('antutuARP', val)}
              />

              <QuestionItem
                question="8.- ¿Memoria RAM?"
                value={formAvanzado().ramARP}
                onChange={(val) => actualizarAvanzado('ramARP', val)}
              />

              <QuestionItem
                question="9.- ¿Taza de Refresco de la Pantalla?"
                value={formAvanzado().tazaRefrezcoARP}
                onChange={(val) => actualizarAvanzado('tazaRefrezcoARP', val)}
              />

              {/* BOTÓN COMENZAR AVANZADO */}
              <div class="sw-btn-wrapper-container">
                <div class="btn-wrapper" onClick={ejecutarAvanzado}>
                  <div class="light"></div>
                  <div class="gradient-layer" style="animation-delay: 0s; animation-duration: 25s;"></div>
                  <div class="gradient-layer" style="animation-delay: 0.15s; animation-duration: 15.9s;"></div>
                  <div class="gradient-layer" style="animation-delay: 0.53s; animation-duration: 26.4s;"></div>
                  <div class="gradient-layer" style="animation-delay: 0.45s; animation-duration: 17.8s;"></div>
                  <div class="gradient-layer" style="animation-delay: 1.6s; animation-duration: 19.2s;"></div>
                  <div class="gradient-layer" style="animation-delay: 1.6s; animation-duration: 29.2s;"></div>
                  <div class="gradient-layer" style="animation-delay: 1.6s; animation-duration: 20.2s;"></div>
                  <button type="button" class="gradient-btn">COMENZAR</button>
                  <div class="text-overlay">COMENZAR</div>
                </div>
              </div>

            </form>
          </Show>
        </section>

        {/* ================= ANIMACIÓN DE ESPERA (LOADER 3D) CON TEXTO "ANALIZANDO" ================= */}
        <Show when={isLoading()}>
          <section class="container-loader">
            <aside class="loader">
              <div style="--s: 0" class="aro"></div>
              <div style="--s: 1" class="aro"></div>
              <div style="--s: 2" class="aro"></div>
              <div style="--s: 3" class="aro"></div>
              <div style="--s: 4" class="aro"></div>
              <div style="--s: 5" class="aro"></div>
              <div style="--s: 6" class="aro"></div>
              <div style="--s: 7" class="aro"></div>
              <div style="--s: 8" class="aro"></div>
              <div style="--s: 9" class="aro"></div>
              <div style="--s: 10" class="aro"></div>
              <div style="--s: 11" class="aro"></div>
              <div style="--s: 12" class="aro"></div>
              <div style="--s: 13" class="aro"></div>
              <div style="--s: 14" class="aro"></div>
            </aside>
            <p class="sw-analizando-text">ANALIZANDO</p>
          </section>
        </Show>

        {/* ================= RESULTADOS Y TARJETAS DINÁMICAS ================= */}
        <Show when={resultados().length > 0}>
          <section class="sw-resultados-section">
            <h3 class="sw-resultados-heading">LAS MEJORES RECOMENDACIONES SON:</h3>
            
            <div class="sw-cards-vertical-list">
              <For each={resultados()}>
                {(prod, index) => (
                  <div class="sw-producto-card-item">
                    <span class="sw-card-index">{index() + 1}:</span>
                    <div class="sw-card-info-content">
                      <span class="sw-card-marca-modelo">{prod.marca} {prod.modelo}</span>
                      <span class="sw-card-specs">{prod.almacenamiento} GB / {prod.ram} GB RAM</span>
                      <span class="sw-card-precio">{prod.precio} BS.</span>
                    </div>
                    <a
                      href={generarEnlaceWhatsAppIndividual(prod)}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="sw-btn-whatsapp-card"
                    >
                      Consíguelo AHORA
                    </a>
                  </div>
                )}
              </For>
            </div>

            <div class="sw-whatsapp-general-container">
              <a
                href={generarEnlaceWhatsAppGeneral(resultados())}
                target="_blank"
                rel="noopener noreferrer"
                class="sw-btn-whatsapp-general"
              >
                Escríbenos AHORA
              </a>
            </div>
          </section>
        </Show>

      </main>

      <SWFooter />
    </div>
  );
};

// Componente auxiliar para selección exclusiva (Sí / No o me da igual) respetando la regla estética
const QuestionItem: Component<{ question: string; value: boolean | null; onChange: (val: boolean) => void }> = (props) => {
  return (
    <div class="sw-question-group">
      <label>{props.question}</label>
      <div class="sw-checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={props.value === true}
            onChange={(e) => {
              props.onChange(e.currentTarget.checked);
            }}
          /> Sí
        </label>
        <label>
          <input
            type="checkbox"
            checked={props.value === false}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                props.onChange(false);
              }
            }}
          /> No o me da igual
        </label>
      </div>
    </div>
  );
};

export default SWAstistenteRecomendacion;

// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================