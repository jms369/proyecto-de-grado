// ============================================================================
// INICIO MODIFICACIÓN: Lógica del componente del catálogo y estados
// ============================================================================
import { createSignal } from 'solid-js';
import type { SGProductoVerModel } from '../../types/SW-types/sw-catalogo-productos-i-m';

export const useCatalogoLogico = () => {
  // Estado de los productos (A futuro se llenará mediante un fetch al backend)
  const [productos, setProductos] = createSignal<SGProductoVerModel[]>([]);
  
  // Set para guardar los IDs de las tarjetas que están expandidas
  const [tarjetasExpandidas, setTarjetasExpandidas] = createSignal<Set<string>>(new Set());

  // Función para alternar el estado "Ver Más" / "Ver Menos"
  const toggleExpandir = (id: string) => {
    setTarjetasExpandidas((prev) => {
      const nuevoSet = new Set(prev);
      if (nuevoSet.has(id)) {
        nuevoSet.delete(id);
      } else {
        nuevoSet.add(id);
      }
      return nuevoSet;
    });
  };

  const estaExpandida = (id: string) => tarjetasExpandidas().has(id);

  // Redirección a WhatsApp
  const handleWhatsAppRedirect = (modelo: string) => {
    // Número base (luego vendrá del backend si es necesario)
    const numeroDestino = '59100000000'; 
    const mensaje = encodeURIComponent(`Hola, estoy interesado en el equipo: ${modelo}. ¿Podrían darme más información?`);
    const url = `https://wa.me/${numeroDestino}?text=${mensaje}`;
    
    // Abre WhatsApp en una nueva pestaña (comportamiento de enlace seguro)
    window.open(url, '_blank');
  };

  return {
    productos,
    setProductos,
    toggleExpandir,
    estaExpandida,
    handleWhatsAppRedirect
  };
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================