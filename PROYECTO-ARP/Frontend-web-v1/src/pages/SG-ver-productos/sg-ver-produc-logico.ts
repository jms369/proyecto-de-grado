// src/lógico.ts
import { createResource } from 'solid-js';
//import type { SGProductoVerModel } from '../../types/sg-ver-productos-i-m';
import { mapBackendToFrontendProductoVer } from '../../types/sg-ver-productos-i-m';
import { apiObtenerProductosAdmin } from '../../services/apis_SG/ver_productos_api';

const BACKEND_HOST = 'http://localhost:3000';

export const useSGVerProductosLogic = () => {
  // 1. Cargamos los productos desde el backend
  const [productosData] = createResource(async () => {
    try {
      const dtos = await apiObtenerProductosAdmin();
      
      // Mapeamos y arreglamos la URL de la imagen
      return dtos.map(dto => {
        const modelo = mapBackendToFrontendProductoVer(dto);
        if (modelo.imagenUrl && modelo.imagenUrl.startsWith('/')) {
          modelo.imagenUrl = `${BACKEND_HOST}${modelo.imagenUrl}`;
        }
        return modelo;
      });
    } catch (error) {
      console.error("Error cargando productos:", error);
      return [];
    }
  });

  const productos = () => productosData() || [];

  return {
    productos
  };
};