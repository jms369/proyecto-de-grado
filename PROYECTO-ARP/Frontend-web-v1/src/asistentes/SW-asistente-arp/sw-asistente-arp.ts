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
  // 1. Filtrar productos donde el precio sea menor o igual a precioARP + 300
  const precioMaximoPermitido = config.precioARP + 300;
  const productosFiltrados = productosJson.filter(
    (prod) => prod.precio <= precioMaximoPermitido
  );

  // Inicializar lista procesada con contador en 0
  let listaProcesada: SwaProductoProcesadoModel[] = productosFiltrados.map(mapBackendToSwaProducto);

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

  // 2. Aplicar reordenamiento y puntuación según las banderas true
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

  // 3. Reordenar una última vez de mayor a menor según la puntuación acumulada (contador)
  listaProcesada.sort((a, b) => b.contador - a.contador);

  // 4. Seleccionar los 10 primeros resultados, manejando empates en la posición 10
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

  // 5. Devolver exclusivamente marca, modelo, almacenamiento, ram y precio
  return resultadosFinales.map(mapToResultadoFinal);
};