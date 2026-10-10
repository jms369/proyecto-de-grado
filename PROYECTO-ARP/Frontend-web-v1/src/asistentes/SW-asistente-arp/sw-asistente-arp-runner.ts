// ============================================================================
// ENTRADA Y EJECUCIÓN PURA EN TYPESCRIPT PARA EL ASISTENTE ARP
// ============================================================================

import type { 
  SWAstistenteProductoDTO, 
  SWAstistenteConfigDTO, 
  SWAstistenteResultadoDTO 
} from './sw-asistente-arp-i-m';
import { ejecutarAsistenteArpLogica } from './sw-asistente-arp';

export const procesarAsistenteArp = (
  productosJson: SWAstistenteProductoDTO[],
  config: SWAstistenteConfigDTO
): SWAstistenteResultadoDTO[] => {
  return ejecutarAsistenteArpLogica(productosJson, config);
};