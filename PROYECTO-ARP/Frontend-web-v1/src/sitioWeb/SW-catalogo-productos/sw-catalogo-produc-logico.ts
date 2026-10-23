// src/lógico.ts
import { createSignal, createResource } from 'solid-js';
//import type { SGProductoVerModel } from '../../types/SW-types/sw-catalogo-productos-i-m';
import { mapBackendToFrontendProductoVer } from '../../types/SW-types/sw-catalogo-productos-i-m';
import { apiObtenerCatalogoPublico,  apiObtenerWhatsapp  } from '../../services/apis_SW/catalogo_productos_api';

const BACKEND_HOST = import.meta.env.BACKEND_URL || 'http://localhost:3000';

export const useCatalogoLogico = () => {
  // 1. Cargar productos desde el backend
  const [productosData] = createResource(async () => {
    try {
      const dtos = await apiObtenerCatalogoPublico();
      
      // Mapeamos y arreglamos la URL de la imagen
      return dtos.map(dto => {
        const modelo = mapBackendToFrontendProductoVer(dto);
        // Si la imagen es una ruta relativa (/uploads/...), le agregamos el host
        if (modelo.imagenUrl && modelo.imagenUrl.startsWith('/')) {
          modelo.imagenUrl = `${BACKEND_HOST}${modelo.imagenUrl}`;
        }
        return modelo;
      });
    } catch (error) {
      console.error("Error cargando catálogo:", error);
      return [];
    }
  });

  const productos = () => productosData() || [];

  // 2. Estado de las tarjetas expandidas
  const [tarjetasExpandidas, setTarjetasExpandidas] = createSignal<Set<string>>(new Set());

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


  // 3. Redirección a WhatsApp 
  const handleWhatsAppRedirect = async (marca:string,  modelo: string, almacenamiento: number, ram: number, precio: number) => {
    try {
      // Hacemos la petición al backend para obtener el número real
      const data = await apiObtenerWhatsapp();
      
      // Si no hay número configurado, usamos uno por defecto o mostramos error
      const numeroDestino = data.whatsapp || '#'; 

      const mensaje = encodeURIComponent(
        `Hola, estoy interesado en el equipo: ${marca} ${modelo} de ${almacenamiento}GB/${ram}GB de RAM, con el precio de: ${precio} Bs. ¿Podrían darme más información?`
      );
      
      const url = `https://wa.me/${numeroDestino}?text=${mensaje}`;
      window.open(url, '_blank');

    } catch (error) {
      console.error('Error al obtener el número de WhatsApp:', error);
      alert('No se pudo obtener el número de WhatsApp. Intente nuevamente.');
    }
  };

  return {
    productos,
    toggleExpandir,
    estaExpandida,
    handleWhatsAppRedirect
  };
};