// ============================================================================
// LÓGICA DE NEGOCIO Y FILTRADO DEL ASISTENTE ARP
// ============================================================================

import type { 
  SWAstistenteProductoDTO, 
  SWAstistenteConfigDTO, 
  SWAstistenteResultadoDTO,
  SwaProductoProcesadoModel
} from './sw-asistente-arp-i-m';
import { mapBackendToSwaProducto, mapToResultadoFinal } from './sw-asistente-arp-i-m';

export const ejecutarAsistenteArpLogica = (
  productosJson: SWAstistenteProductoDTO[],
  config: SWAstistenteConfigDTO
): SWAstistenteResultadoDTO[] => {

  // 1. MAPEAR PRIMERO: Convertimos los datos crudos de la BD al modelo procesado.
  // Esto convierte 'marca_celular' a 'marca', 'precio_celular' a 'precio', etc.
  let listaProcesada: SwaProductoProcesadoModel[] = productosJson.map(mapBackendToSwaProducto);

  // 2. FILTRAR POR PRECIO: Ahora podemos usar 'prod.precio' sin problemas.
  const precioMaximoPermitido = config.precioARP + 300;
  listaProcesada = listaProcesada.filter(
    (prod) => prod.precio <= precioMaximoPermitido
  );

  // Si no queda ningún producto tras el filtro, devolvemos un array vacío.
  if (listaProcesada.length === 0) {
    return [];
  }

  // Helper para ordenar de mayor a menor y sumar +1 a los primeros 10 lugares
  const puntuarTop10 = (criterio: keyof SwaProductoProcesadoModel) => {
    listaProcesada.sort((a, b) => Number(b[criterio]) - Number(a[criterio]));
    const limite = Math.min(10, listaProcesada.length);
    for (let i = 0; i < limite; i++) {
      listaProcesada[i].contador += 1;
    }
  };

  // 3. APLICAR REORDENAMIENTO Y PUNTUACIÓN SEGÚN LAS BANDERAS
  if (config.PrecioARP) {
    puntuarTop10('precio');
  }
  if (config.AlmacenamientoARP) {
    puntuarTop10('almacenamiento');
  }
  if (config.RamARP) {
    puntuarTop10('ram');
  }
  if (config.BateriaARP) {
    puntuarTop10('bateria');
  }
  if (config.CamaraPrincipalARP) {
    puntuarTop10('camara_principal');
  }
  if (config.CamaraFrontalARP) {
    puntuarTop10('camara_frontal');
  }
  if (config.AntutuARP) {
    puntuarTop10('puntuacion_antutu');
  }
  if (config.TazaRefrezcoARP) {
    puntuarTop10('tasa_refresco');
  }

  // Regla especial: Certificación IP (aplica +1 a todos si es true)
  if (config.CertificacionIPARP) {
    listaProcesada.forEach((prod) => {
      if (prod.certificacion_ip) {
        prod.contador += 1;
      }
    });
  }

  // Regla especial: Pantalla (OLED/AMOLED = +2, IPS LCD/LCD = +1 a todos)
  if (config.PantallaARP) {
    listaProcesada.forEach((prod) => {
      const tipoPantalla = (prod.pantalla || '').toUpperCase().trim();
      if (tipoPantalla === 'OLED' || tipoPantalla === 'AMOLED') {
        prod.contador += 2;
      } else if (tipoPantalla === 'IPS LCD' || tipoPantalla === 'LCD') {
        prod.contador += 1;
      }
    });
  }

  // 4. REORDENAR UNA ÚLTIMA VEZ por la puntuación acumulada (contador)
  listaProcesada.sort((a, b) => b.contador - a.contador);

  // 5. SELECCIONAR LOS 10 PRIMEROS, manejando empates en la posición 10
  const resultadosFinales: SwaProductoProcesadoModel[] = [];
  const limiteBase = 10;

  for (let i = 0; i < listaProcesada.length; i++) {
    if (i < limiteBase) {
      resultadosFinales.push(listaProcesada[i]);
    } else {
      const puntajePuestoDiez = listaProcesada[limiteBase - 1].contador;
      if (listaProcesada[i].contador === puntajePuestoDiez) {
        resultadosFinales.push(listaProcesada[i]);
      } else {
        break;
      }
    }
  }

  // 6. DEVOLVER EXCLUSIVAMENTE LOS CAMPOS DEL RESULTADO FINAL
  return resultadosFinales.map(mapToResultadoFinal);
};