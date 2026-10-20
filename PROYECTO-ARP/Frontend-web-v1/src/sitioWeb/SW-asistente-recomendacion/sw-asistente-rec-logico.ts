// src/sitioWeb/SW-asistente-recomendacion/sw-asistente-rec-logico.ts

import type { SWAstistenteFormModel, SWProductoRecomendadoDTO } from '../../types/SW-types/sw-asistente-recomendacion-i-m';
// ⚠️ IMPORTAMOS EL NUEVO SERVICIO
import { ejecutarProcesamientoAsistente } from '../../services/apis_SW/asistente_recomendacion_api';

export interface ManejadorAsistenteParams {
  form: SWAstistenteFormModel;
  setLoading: (val: boolean) => void;
  setResultados: (res: SWProductoRecomendadoDTO[]) => void;
}

export const handleComenzarAnalisis = async (params: ManejadorAsistenteParams) => {
  params.setLoading(true);
  params.setResultados([]);

  try {
    // 1. Preparamos la configuración para el algoritmo
    const configAjustada = {
      precioARP: typeof params.form.precioARP === 'number' ? params.form.precioARP : 0,
      PrecioARP: true,
      CamaraPrincipalARP: params.form.camaraPrincipalARP === true,
      CamaraFrontalARP: params.form.camaraFrontalARP === true,
      BateriaARP: params.form.bateriaARP === true,
      CertificacionIPARP: params.form.certificacionIPARP === true,
      PantallaARP: params.form.pantallaARP === true,
      AlmacenamientoARP: params.form.almacenamientoARP === true,
      RamARP: params.form.ramARP === true,
      AntutuARP: params.form.antutuARP === true,
      TazaRefrezcoARP: params.form.tazaRefrezcoARP === true,
    };

    // 2. Llamamos al servicio que hace TODO el trabajo (fetch + procesar)
    const resultados = await ejecutarProcesamientoAsistente(configAjustada);
    
    // 3. Guardamos los resultados
    params.setResultados(resultados);

  } catch (error) {
    console.error('Error al procesar el asistente ARP:', error);
    params.setResultados([]);
  } finally {
    params.setLoading(false);
  }
};

// ... (funciones de WhatsApp se mantienen igual)
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