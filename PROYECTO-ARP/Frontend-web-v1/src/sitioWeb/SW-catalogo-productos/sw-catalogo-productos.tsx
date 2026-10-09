// ============================================================================
// INICIO MODIFICACIÓN: Reorganización de elementos para ubicar el precio y WhatsApp al final de la tarjeta desplegada
// ============================================================================
import { type Component, For, onMount } from 'solid-js';
import Header from '../../componentesR/SW-header/sw-header';
import Footer from '../../componentesR/SW-footer/sw-footer';
import { useCatalogoLogico } from './sw-catalogo-produc-logico';
import type { SGProductoVerModel } from '../../types/SW-types/sw-catalogo-productos-i-m';
import './sw-catalogo-productos.css';

//importar el boton de asistente ARP
import SWBotonHaciaArp from '../../componentesR/SW-boton-hacia-arp/sw-boton-hacia-arp';

const SWCatalogoProductos: Component = () => {
  const { productos, setProductos, toggleExpandir, estaExpandida, handleWhatsAppRedirect } = useCatalogoLogico();

  onMount(() => {
    const mockData: SGProductoVerModel[] = [
      {
        id: '1',
        marca: 'Samsung',
        modelo: 'Galaxy S26 Ultra',
        almacenamiento: 512,
        precio: 3500,
        estado: true,
        procesador: 'Snapdragon 8 Gen 4',
        ram: 16,
        bateria: 5500,
        puntuacionAntutu: 2500000,
        pantalla: '6.8" AMOLED',
        camaraPrincipal: 200,
        certificacionIp: true,
        cargaRapida: 65,
        camaraFrontal: 50,
        tasaRefresco: 144,
        masInformacion: 'Pantalla curva con Gorilla Glass Armor. Incluye S-Pen integrado.\nResistencia al agua IP68. Cámaras optimizadas por IA. Pantalla curva con Gorilla Glass Armor. Incluye S-Pen integrado Pantalla curva con Gorilla Glass Armor. Incluye S-Pen integrado Pantalla curva con Gorilla Glass Armor. Incluye S-Pen integrado',
        imagenUrl: 'https://www.tiendaamiga.com.bo/media/catalog/product/cache/deb88dadd509903c96aaa309d3e790dc/c/e/celular_samsung_galaxy_s25_ultra_gristitanio.png'
      },
      {
        id: '2',
        marca: 'Apple',
        modelo: 'iPhone 17 Pro Max',
        almacenamiento: 256,
        precio: 4200,
        estado: true,
        procesador: 'A19 Pro',
        ram: 8,
        bateria: 4800,
        puntuacionAntutu: 2450000,
        pantalla: '6.9" Super Retina XDR',
        camaraPrincipal: 48,
        certificacionIp: true,
        cargaRapida: 45,
        camaraFrontal: 24,
        tasaRefresco: 120,
        masInformacion: 'Acabado en titanio de grado aeroespacial. Botón de acción personalizable.\nGrabación de video espacial para Apple Vision Pro.',
        imagenUrl: 'https://nextlevel.com.bo/cdn/shop/files/IPHONE16PROMAX_256_DUAL_530x@2x.jpg?v=1728942846'
      }
    ];
    setProductos(mockData);
  });

  return (
    <div class="sw-catalogo-container">
      <Header />
      
      <main class="catalogo-content">
        <div class="title-wrapper">
          <h1>Catálogo de Productos</h1>
        </div>

        <div class="cards-grid">
          <For each={productos()}>
            {(producto) => (
              <div class="producto-card">
                {/* Imagen del producto */}
                <div class="image-box">
                  <img 
                    src={producto.imagenUrl || 'https://via.placeholder.com/150'} 
                    alt={`Imagen de ${producto.modelo}`} 
                    loading="lazy"
                  />
                </div>

                {/* Info Básica: Siempre visible */}
                <div class="info-row">
                  <span class="info-label">Marca</span>
                  <span class="info-value">{producto.marca}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Modelo</span>
                  <span class="info-value">{producto.modelo}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Almacenamiento</span>
                  <span class="info-value">{producto.almacenamiento} GB</span>
                </div>

                {/* Vista Expandida (Especificaciones y Descripción) */}
                {estaExpandida(producto.id) && (
                  <div class="vista-expandida">
                    <div class="info-row">
                      <span class="info-label">Procesador</span>
                      <span class="info-value">{producto.procesador}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Memoria RAM</span>
                      <span class="info-value">{producto.ram} GB</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Batería</span>
                      <span class="info-value">{producto.bateria} mAh</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Puntuación AnTuTu</span>
                      <span class="info-value">{producto.puntuacionAntutu.toLocaleString('es-BO')}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Pantalla</span>
                      <span class="info-value">{producto.pantalla}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Cámara Principal</span>
                      <span class="info-value">{producto.camaraPrincipal} MP</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Cámara Frontal</span>
                      <span class="info-value">{producto.camaraFrontal} MP</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Tasa de Refresco</span>
                      <span class="info-value">{producto.tasaRefresco} Hz</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Carga Rápida</span>
                      <span class="info-value">{producto.cargaRapida} W</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Certificación IP</span>
                      <span class="info-value">{producto.certificacionIp ? 'IP68 (Resistente al agua)' : 'No'}</span>
                    </div>

                    <div class="mas-info-box">
                      <span class="info-label">Más información:</span>
                      <div class="mas-info-text">{producto.masInformacion}</div>
                    </div>
                  </div>
                )}

                {/* Precio y Botón de WhatsApp: Se muestran al final de la tarjeta (si está expandida aparecen después de las specs) */}
                {estaExpandida(producto.id) && (
                  <div class="price-box">
                    <div class="price-label">Precio Bs.</div>
                    <div class="price-value">{producto.precio.toLocaleString('es-BO')}</div>
                  </div>
                )}

                {estaExpandida(producto.id) && (
                  <button 
                    class="btn-whatsapp" 
                    onClick={() => handleWhatsAppRedirect(producto.modelo)}
                  >
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Consultar
                  </button>
                )}

                {/* Botón principal de expansión/ocultamiento ubicado siempre al final absoluto de la tarjeta */}
                <button 
                  class="btn-toggle" 
                  onClick={() => toggleExpandir(producto.id)}
                >
                  {estaExpandida(producto.id) ? 'Ocultar detalles' : 'Ver más detalles'}
                </button>
              </div>
            )}
          </For>
        </div>
      </main>

      <Footer />

      {/* Botón del Asistente ARP  */}
      <SWBotonHaciaArp />

    </div>
  );
};

export default SWCatalogoProductos;
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================