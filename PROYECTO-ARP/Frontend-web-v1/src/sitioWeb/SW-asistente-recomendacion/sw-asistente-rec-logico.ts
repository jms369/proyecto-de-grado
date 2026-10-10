/* ============================================================================
   INICIO MODIFICACIÓN: Lógica y conversión segura de parámetros vacíos
   ============================================================================ */

import type { SWAstistenteFormModel, SWProductoRecomendadoDTO } from '../../types/SW-types/sw-asistente-recomendacion-i-m';
import { procesarAsistenteArp } from '../../asistentes/SW-asistente-arp/sw-asistente-arp-runner';

const productosBackendMock = [
  { marca: "Xiaomi", modelo: "Redmi Note 13 Pro", precio: 2500, almacenamiento: 256, ram: 8, bateria: 5000, puntuacion_antutu: 450000, pantalla: "AMOLED", camara_principal: 200, certificacion_ip: true, camara_frontal: 16, tasa_refresco: 120 },
  { marca: "Samsung", modelo: "Galaxy A55", precio: 2900, almacenamiento: 128, ram: 8, bateria: 5000, puntuacion_antutu: 520000, pantalla: "Super AMOLED", camara_principal: 50, certificacion_ip: true, camara_frontal: 32, tasa_refresco: 120 },
  { marca: "Motorola", modelo: "Edge 40 Neo", precio: 2800, almacenamiento: 256, ram: 12, bateria: 5000, puntuacion_antutu: 500000, pantalla: "OLED", camara_principal: 50, certificacion_ip: true, camara_frontal: 32, tasa_refresco: 144 },
  { marca: "Poco", modelo: "X6 Pro", precio: 3100, almacenamiento: 512, ram: 12, bateria: 5000, puntuacion_antutu: 1300000, pantalla: "AMOLED", camara_principal: 64, certificacion_ip: false, camara_frontal: 16, tasa_refresco: 120 },
  { marca: "Realme", modelo: "GT Master", precio: 2200, almacenamiento: 128, ram: 8, bateria: 4300, puntuacion_antutu: 480000, pantalla: "AMOLED", camara_principal: 64, certificacion_ip: false, camara_frontal: 32, tasa_refresco: 120 },
  { marca: "Honor", modelo: "Magic 5 Lite", precio: 2400, almacenamiento: 256, ram: 8, bateria: 5100, puntuacion_antutu: 380000, pantalla: "OLED", camara_principal: 64, certificacion_ip: false, camara_frontal: 16, tasa_refresco: 120 },
  { marca: "Infinix", modelo: "Note 30 Pro", precio: 1900, almacenamiento: 256, ram: 8, bateria: 5000, puntuacion_antutu: 420000, pantalla: "AMOLED", camara_principal: 108, certificacion_ip: false, camara_frontal: 32, tasa_refresco: 120 },
  { marca: "Tecno", modelo: "Camon 20 Premier", precio: 2600, almacenamiento: 512, ram: 8, bateria: 5000, puntuacion_antutu: 680000, pantalla: "AMOLED", camara_principal: 50, certificacion_ip: false, camara_frontal: 32, tasa_refresco: 120 },
  { marca: "ZTE", modelo: "Nubia Neo", precio: 1800, almacenamiento: 256, ram: 8, bateria: 4500, puntuacion_antutu: 410000, pantalla: "IPS LCD", camara_principal: 50, certificacion_ip: false, camara_frontal: 8, tasa_refresco: 120 },
  { marca: "Motorola", modelo: "Moto G54", precio: 1700, almacenamiento: 128, ram: 8, bateria: 6000, puntuacion_antutu: 360000, pantalla: "IPS LCD", camara_principal: 50, certificacion_ip: false, camara_frontal: 16, tasa_refresco: 120 },
  { marca: "Xiaomi", modelo: "Redmi 13C", precio: 1200, almacenamiento: 256, ram: 8, bateria: 5000, puntuacion_antutu: 280000, pantalla: "LCD", camara_principal: 50, certificacion_ip: false, camara_frontal: 8, tasa_refresco: 90 },
  { marca: "Apple", modelo: "iPhone 13", precio: 4500, almacenamiento: 128, ram: 4, bateria: 3240, puntuacion_antutu: 800000, pantalla: "OLED", camara_principal: 12, certificacion_ip: true, camara_frontal: 12, tasa_refresco: 60 }
];

export interface ManejadorAsistenteParams {
  form: SWAstistenteFormModel;
  setLoading: (val: boolean) => void;
  setResultados: (res: SWProductoRecomendadoDTO[]) => void;
}

export const handleComenzarAnalisis = (params: ManejadorAsistenteParams) => {
  params.setLoading(true);
  params.setResultados([]);

  setTimeout(() => {
    try {
      const precioValido = typeof params.form.precioARP === 'number' ? params.form.precioARP : 0;

      const configAjustada = {
        precioARP: precioValido,
        PrecioARP: true,
        CamaraPrincipalARP: !!params.form.camaraPrincipalARP,
        CamaraFrontalARP: !!params.form.camaraFrontalARP,
        BateriaARP: !!params.form.bateriaARP,
        CertificacionIPARP: !!params.form.certificacionIPARP,
        PantallaARP: !!params.form.pantallaARP,
        AlmacenamientoARP: !!params.form.almacenamientoARP,
        RamARP: !!params.form.ramARP,
        AntutuARP: !!params.form.antutuARP,
        TazaRefrezcoARP: !!params.form.tazaRefrezcoARP,
      };

      const resultados = procesarAsistenteArp(productosBackendMock as any, configAjustada);
      params.setResultados(resultados);
    } catch (error) {
      console.error('Error al procesar el asistente ARP:', error);
      params.setResultados([]);
    } finally {
      params.setLoading(false);
    }
  }, 2000);
};

export const generarEnlaceWhatsAppIndividual = (producto: SWProductoRecomendadoDTO, telefonoBackend: string = '59178008122'): string => {
  const mensaje = `Hola, me interesa conseguir el celular ${producto.marca} ${producto.modelo} (${producto.almacenamiento}GB / ${producto.ram}GB RAM) a un precio de ${producto.precio} BS. ¿Tienen stock disponible?`;
  return `https://wa.me/${telefonoBackend}?text=${encodeURIComponent(mensaje)}`;
};

export const generarEnlaceWhatsAppGeneral = (productos: SWProductoRecomendadoDTO[], telefonoBackend: string = '59178008122'): string => {
  let mensaje = 'Hola, he revisado las recomendaciones del asistente ARP y me interesan los siguientes modelos:\n';
  productos.forEach((p, idx) => {
    mensaje += `${idx + 1}. ${p.marca} ${p.modelo} - ${p.almacenamiento}GB/${p.ram}GB - ${p.precio} BS\n`;
  });
  mensaje += '¿Siguen disponibles?';
  return `https://wa.me/${telefonoBackend}?text=${encodeURIComponent(mensaje)}`;
};

/* ============================================================================
   FIN MODIFICACIÓN
   ============================================================================ */