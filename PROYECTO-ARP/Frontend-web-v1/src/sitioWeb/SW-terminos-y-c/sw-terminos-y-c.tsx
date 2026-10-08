// src/sitioWeb/SW-terminos-y-c/sw-terminos-y-c.tsx
import type { Component } from 'solid-js';
import SWHeader from '../../componentesR/SW-header/sw-header';
import SWFooter from '../../componentesR/SW-footer/sw-footer';
import './sw-terminos-y-c.css';

const SWTerminosYC: Component = () => {
  return (
    <div class="sw-terminos-container">
      <SWHeader />

      {/* ============================================================================ */}
      {/* INICIO MODIFICACIÓN: Contenido de Términos y Condiciones                     */}
      {/* ============================================================================ */}
      <main class="legal-content">
        <h1 class="title">Términos y Condiciones</h1>
        <p class="update-date">Última actualización: Octubre 2026</p>

        <section class="section-block">
          <h2 class="section-title">1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar nuestro sitio web, usted acepta cumplir y estar sujeto a los presentes Términos y Condiciones. Si no está de acuerdo con alguno de los puntos descritos, le solicitamos abstenerse de realizar compras o navegar en esta plataforma.
          </p>
        </section>

        <section class="section-block">
          <h2 class="section-title">2. Uso del Sitio y Registro</h2>
          <p>
            El usuario se compromete a proporcionar información veraz, exacta y actualizada durante el proceso de compra. Está prohibido el uso del sitio con fines ilícitos o no autorizados que pongan en riesgo la seguridad de nuestros sistemas.
          </p>
        </section>

        <section class="section-block">
          <h2 class="section-title">3. Disponibilidad de Equipos y Precios</h2>
          <p>
            Todos los smartphones, accesorios y repuestos mostrados están sujetos a disponibilidad de stock. Nos reservamos el derecho de modificar los precios y promociones sin previo aviso. Los precios incluyen los impuestos aplicables según la normativa vigente.
          </p>
        </section>

        <section class="section-block">
          <h2 class="section-title">4. Propiedad Intelectual</h2>
          <p>
            Todo el contenido visual, logotipos, marcas de fabricantes (Apple, Samsung, Xiaomi, etc.) e imágenes presentes en esta web pertenecen a sus respectivos titulares o están bajo licencia de uso exclusivo para nuestra tienda.
          </p>
        </section>

        <section class="section-block">
          <h2 class="section-title">5. Modificaciones</h2>
          <p>
            Nos reservamos la facultad de actualizar o modificar estos términos en cualquier momento. Le recomendamos revisar esta sección periódicamente.
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

export default SWTerminosYC;