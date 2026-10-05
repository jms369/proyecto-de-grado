import { createSignal } from 'solid-js';
import type { SGProductoVerModel } from '../../types/sg-ver-productos-i-m';

export const useSGVerProductosLogic = () => {
  // Estado con información estática de muestra para ver cómo queda la tarjeta
  const [productos, setProductos] = createSignal<SGProductoVerModel[]>([
    {
      id: 'prod-estatico-1',
      marca: 'Samsung',
      modelo: 'Galaxy S25 Ultra',
      precio: 1200,
      estado: true,
      procesador: 'Snapdragon 8 Elite',
      almacenamiento: 512,
      ram: 12,
      bateria: 5000,
      puntuacionAntutu: 2800000,
      pantalla: 'Dynamic AMOLED 2X 6.8"',
      camaraPrincipal: 200,
      certificacionIp: true,
      cargaRapida: 45,
      camaraFrontal: 12,
      tasaRefresco: 120,
      masInformacion: 'Incluye S-Pen y bordes de titanio, color gris espacial.',
      imagenUrl: 'https://www.tiendaamiga.com.bo/media/catalog/product/cache/deb88dadd509903c96aaa309d3e790dc/c/e/celular_samsung_galaxy_s25_ultra_gristitanio.png',
    },
    {
      id: 'prod-estatico-2',
      marca: 'Apple',
      modelo: 'iPhone 16 Pro Max',
      precio: 1350,
      estado: true,
      procesador: 'A18 Pro',
      almacenamiento: 1024,
      ram: 8,
      bateria: 4422,
      puntuacionAntutu: 1750000,
      pantalla: 'Super Retina XDR 6.9"',
      camaraPrincipal: 48,
      certificacionIp: true,
      cargaRapida: 27,
      camaraFrontal: 12,
      tasaRefresco: 120,
      masInformacion: 'Marco de titanio grado 5, botón de acción personalizado.',
      imagenUrl: 'https://nextlevel.com.bo/cdn/shop/files/IPHONE16PROMAX_256_DUAL_530x@2x.jpg?v=1728942846',
    }
  ]);

  return {
    productos
  };
};