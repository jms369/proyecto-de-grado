// src/pages/SG-ver-productos/sg-ver-produc-logico.ts
import { createResource, createMemo, createSignal } from 'solid-js';
import { mapBackendToFrontendProductoVer } from '../../types/sg-ver-productos-i-m';
import { 
  apiObtenerProductosAdmin, 
  apiDescargarReporteProductos 
} from '../../services/apis_SG/ver_productos_api';

const BACKEND_HOST = import.meta.env.BACKEND_URL || 'http://localhost:3000';

export const useSGVerProductosLogic = () => {
  // 1. Cargamos los productos desde el backend
  const [productosData] = createResource(async () => {
    try {
      const dtos = await apiObtenerProductosAdmin();
      
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

  // 2. Estados para los Filtros
  const [filtroMarca, setFiltroMarca] = createSignal<string>('');
  const [filtroModelo, setFiltroModelo] = createSignal<string>('');
  const [filtroRam, setFiltroRam] = createSignal<string>('');
  const [filtroAlmacenamiento, setFiltroAlmacenamiento] = createSignal<string>('');
  const [filtroPrecioMax, setFiltroPrecioMax] = createSignal<string>('');
  
  // Estado para el botón de descarga del PDF
  const [isLoadingPdf, setIsLoadingPdf] = createSignal<boolean>(false);

  // 3. Opciones dinámicas para los selects (extraídas de los productos cargados)
  const marcasDisponibles = createMemo(() => {
    const marcas = productos().map(p => p.marca);
    return [...new Set(marcas)].sort();
  });

  const ramsDisponibles = createMemo(() => {
    const rams = productos().map(p => p.ram);
    return [...new Set(rams)].sort((a, b) => a - b);
  });

  const almacenamientosDisponibles = createMemo(() => {
    const alms = productos().map(p => p.almacenamiento);
    return [...new Set(alms)].sort((a, b) => a - b);
  });

  // 4. Lista filtrada (se recalcula automáticamente)
  const productosFiltrados = createMemo(() => {
    let lista = productos();

    if (filtroMarca()) {
      lista = lista.filter(p => p.marca === filtroMarca());
    }
    if (filtroModelo()) {
      const texto = filtroModelo().toLowerCase();
      lista = lista.filter(p => p.modelo.toLowerCase().includes(texto));
    }
    if (filtroRam()) {
      lista = lista.filter(p => p.ram === Number(filtroRam()));
    }
    if (filtroAlmacenamiento()) {
      lista = lista.filter(p => p.almacenamiento === Number(filtroAlmacenamiento()));
    }
    if (filtroPrecioMax()) {
      const precioMax = Number(filtroPrecioMax());
      lista = lista.filter(p => p.precio <= precioMax);
    }

    return lista;
  });

  // 5. Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltroMarca('');
    setFiltroModelo('');
    setFiltroRam('');
    setFiltroAlmacenamiento('');
    setFiltroPrecioMax('');
  };

  // 6. Función para descargar el PDF
  const descargarPdfProductos = async () => {
    setIsLoadingPdf(true);
    try {
      const blob = await apiDescargarReporteProductos();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte_productos.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error al descargar PDF:', error);
    } finally {
      setIsLoadingPdf(false);
    }
  };

  return {
    productosFiltrados,
    marcasDisponibles,
    ramsDisponibles,
    almacenamientosDisponibles,
    filtroMarca, setFiltroMarca,
    filtroModelo, setFiltroModelo,
    filtroRam, setFiltroRam,
    filtroAlmacenamiento, setFiltroAlmacenamiento,
    filtroPrecioMax, setFiltroPrecioMax,
    limpiarFiltros,
    descargarPdfProductos,
    isLoadingPdf
  };
};