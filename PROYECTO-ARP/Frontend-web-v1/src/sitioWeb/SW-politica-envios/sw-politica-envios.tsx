// src/sitioWeb/SW-politica-envios/sw-politica-envios.tsx
import type { Component } from 'solid-js';
import SWHeader from '../../componentesR/SW-header/sw-header';
import SWFooter from '../../componentesR/SW-footer/sw-footer';
import './sw-politica-envios.css';

const SWPoliticaEnvios: Component = () => {
  return (
    <div class="sw-politica-envios-container">
      <SWHeader />

      {/* ============================================================================ */}
      {/* INICIO MODIFICACIÓN: Contenido de Política de Envíos                         */}
      {/* ============================================================================ */}
      <main class="legal-content">
        <h1 class="title">Política de Envíos</h1>
        <p class="update-date">Última actualización: Octubre 2026</p>

        <section class="section-block">
          <h2 class="section-title">1. Cobertura y Zonas de Entrega</h2>
          <p>
            Realizamos envíos a todo el territorio nacional mediante empresas de mensajería y transporte terrestre/aéreo autorizadas. También contamos con entrega exprés en el área urbana local.
          </p>
        </section>

        <section class="section-block">
          <h2 class="section-title">2. Tiempos de Entrega</h2>
          <ul>
            <li><strong>Envíos Locales:</strong> Entre 24 a 48 horas hábiles tras la confirmación del pago.</li>
            <li><strong>Envíos Nacionales:</strong> Entre 2 a 4 días hábiles dependiendo del destino final.</li>
          </ul>
        </section>

        <section class="section-block">
          <h2 class="section-title">3. Costos de Envío</h2>
          <p>
            El costo del envío se calcula en función del destino y el volumen del paquete durante el proceso de pago. Ofrecemos **envío gratuito** en compras superiores a montos en promoción activa.
          </p>
        </section>

        <section class="section-block">
          <h2 class="section-title">4. Recepción y Verificación del Producto</h2>
          <p>
            Es responsabilidad del cliente revisar el estado del empaque antes de firmar la recepción. Si el paquete presenta signos de manipulación o rotura, debe rechazarlo e informarnos inmediatamente para coordinar el seguro de envío.
          </p>
        </section>
      </main>
      {/* ============================================================================ */}
      {/* FIN MODIFICACIÓN                                                             */}
      {/* ============================================================================ */}

      <SWFooter />
    </div>
  );
};

export default SWPoliticaEnvios;