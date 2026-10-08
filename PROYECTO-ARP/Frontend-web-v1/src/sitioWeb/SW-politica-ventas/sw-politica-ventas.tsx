// src/sitioWeb/SW-politica-ventas/sw-politica-ventas.tsx
import type { Component } from 'solid-js';
import SWHeader from '../../componentesR/SW-header/sw-header';
import SWFooter from '../../componentesR/SW-footer/sw-footer';
import './sw-politica-ventas.css';

const SWPoliticaVentas: Component = () => {
  return (
    <div class="sw-politica-ventas-container">
      <SWHeader />

      {/* ============================================================================ */}
      {/* INICIO MODIFICACIÓN: Contenido de Política de Ventas y Garantías            */}
      {/* ============================================================================ */}
      <main class="legal-content">
        <h1 class="title">Política de Ventas</h1>
        <p class="update-date">Última actualización: Octubre 2026</p>

        <section class="section-block">
          <h2 class="section-title">1. Proceso de Compra y Facturación</h2>
          <p>
            Toda orden de compra realizada mediante el sitio web requiere la confirmación del pago para ser procesada. Emitimos factura oficial por la compra de cada equipo o accesorio.
          </p>
        </section>

        <section class="section-block">
          <h2 class="section-title">2. Métodos de Pago Aceptados</h2>
          <p>Aceptamos las siguientes formas de pago:</p>
          <ul>
            <li>Transferencias bancarias directas y pagos mediante QR.</li>
            <li>Tarjetas de débito y crédito (Visa / Mastercard).</li>
            <li>Pago en efectivo únicamente para retiro presencial en nuestra tienda física.</li>
          </ul>
        </section>

        <section class="section-block">
          <h2 class="section-title">3. Políticas de Garantía de Equipos</h2>
          <p>
            Todos nuestros teléfonos móviles nuevos cuentan con garantía de fábrica por falla técnica:
          </p>
          <ul>
            <li><strong>Equipos Nuevos:</strong> 1 año de garantía por defectos de fabricación.</li>
            <li><strong>Equipos Seminuevos / Reacondicionados:</strong> 3 meses de garantía directa.</li>
            <li><strong>Exclusiones de Garantía:</strong> Golpes, pantalla rota, humedad/contacto con agua, humedad interna o manipulación del software/root.</li>
          </ul>
        </section>

        <section class="section-block">
          <h2 class="section-title">4. Cambios y Devoluciones</h2>
          <p>
            No se aceptan devoluciones de dinero por error de selección del cliente. Los cambios de equipo por fallas técnicas directas aplican dentro de los primeros 7 días posteriores a la entrega, previa revisión del servicio técnico.
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

export default SWPoliticaVentas;