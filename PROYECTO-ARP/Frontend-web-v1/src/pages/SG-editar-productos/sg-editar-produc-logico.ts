// src/pages/SG-editar-productos/sg-editar-produc-logico.ts

import { createSignal, createResource, createMemo } from 'solid-js';
import type { SGProductoModel } from '../../types/sg-editar-productos-i-m';
import { 
  mapBackendToFrontendProducto, 
  mapFrontendToBackendProducto 
} from '../../types/sg-editar-productos-i-m';
import { 
  apiObtenerProductos, 
  apiCrearProducto, 
  apiActualizarProducto, 
  apiEliminarProducto,
  apiSubirImagen 
} from '../../services/apis_SG/editar_productos_api';

const BACKEND_HOST = import.meta.env.BACKEND_URL || 'http://localhost:3000';

export const createEmptyProducto = (): SGProductoModel => ({
  id: '', marca: '', modelo: '', precio: 0, estado: true, procesador: '', almacenamiento: 0, ram: 0, bateria: 0, puntuacionAntutu: 0, pantalla: 'AMOLED', camaraPrincipal: 0, certificacionIp: false, cargaRapida: 0, camaraFrontal: 0, tasaRefresco: 0, masInformacion: '', imagenUrl: '', isEditing: false,
});

export const useSGEditarProductosLogic = () => {
  const [productosData, { refetch, mutate }] = createResource(async () => {
    try {
      const dtos = await apiObtenerProductos();
      return dtos.map(dto => {
        const modelo = mapBackendToFrontendProducto(dto);
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

  // --- ESTADOS PARA FILTROS ---
  const [filtroMarca, setFiltroMarca] = createSignal<string>('');
  const [filtroModelo, setFiltroModelo] = createSignal<string>('');
  const [filtroRam, setFiltroRam] = createSignal<string>('');
  const [filtroAlmacenamiento, setFiltroAlmacenamiento] = createSignal<string>('');
  const [filtroPrecioMax, setFiltroPrecioMax] = createSignal<string>('');

  // --- OPCIONES DINÁMICAS PARA SELECTS ---
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

  // --- LISTA FILTRADA ---
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

  const limpiarFiltros = () => {
    setFiltroMarca('');
    setFiltroModelo('');
    setFiltroRam('');
    setFiltroAlmacenamiento('');
    setFiltroPrecioMax('');
  };

  // --- ESTADOS DEL MODAL Y EDICIÓN ---
  const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false);
  const [nuevoProductoForm, setNuevoProductoForm] = createSignal<SGProductoModel>(createEmptyProducto());
  const [tempEditForms, setTempEditForms] = createSignal<Record<string, SGProductoModel>>({});

  const handleOpenModal = () => { setNuevoProductoForm(createEmptyProducto()); setIsModalOpen(true); };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateProductoSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      const payload = mapFrontendToBackendProducto(nuevoProductoForm());
      await apiCrearProducto(payload);
      await refetch();
      handleCloseModal();
    } catch (error) { console.error("Error al crear producto", error); }
  };

  const handleStartEdit = (id: string) => {
    const original = productos().find((p) => p.id === id);
    if (original) {
      setTempEditForms((prev) => ({ ...prev, [id]: { ...original, isEditing: true } }));
      mutate((prev) => prev?.map(p => p.id === id ? { ...p, isEditing: true } : p));
    }
  };

  const handleUpdateTempField = (id: string, field: keyof SGProductoModel, value: any) => {
    setTempEditForms((prev) => {
      const current = prev[id] || { ...productos().find((p) => p.id === id)! };
      return { ...prev, [id]: { ...current, [field]: value } };
    });
  };

  const handleSaveProducto = async (id: string) => {
    const updatedData = tempEditForms()[id];
    if (!updatedData) return;

    try {
      const payload = mapFrontendToBackendProducto(updatedData);
      if (payload.url_imagen && payload.url_imagen.includes(BACKEND_HOST)) {
        payload.url_imagen = payload.url_imagen.replace(BACKEND_HOST, '');
      }
      if (!id || id === 'undefined') throw new Error("El ID del producto es inválido.");

      await apiActualizarProducto(id, payload);
      mutate((prev) => prev?.map(p => p.id === id ? { ...updatedData, isEditing: false } : p));
      setTempEditForms((prev) => { const copy = { ...prev }; delete copy[id]; return copy; });
    } catch (error) { 
      console.error("Error al guardar producto:", error); 
      alert("No se pudo guardar el producto.");
    }
  };

  const handleToggleEstado = async (id: string, nuevoEstado: boolean) => {
    const producto = productos().find(p => p.id === id);
    if (!producto) return;
    try {
      const payload = mapFrontendToBackendProducto({ ...producto, estado: nuevoEstado });
      if (payload.url_imagen && payload.url_imagen.includes(BACKEND_HOST)) payload.url_imagen = payload.url_imagen.replace(BACKEND_HOST, '');
      await apiActualizarProducto(id, payload);
      mutate((prev) => prev?.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
    } catch (error) { console.error("Error al cambiar estado", error); }
  };

  const handleDeleteProducto = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await apiEliminarProducto(id);
      mutate((prev) => prev?.filter((p) => p.id !== id));
    } catch (error) { console.error("Error al eliminar producto", error); }
  };

  const handleImageUpload = async (id: string | null, file: File) => {
    try {
      const urlRelativa = await apiSubirImagen(file);
      const urlCompleta = `${BACKEND_HOST}${urlRelativa}`;
      if (id) handleUpdateTempField(id, 'imagenUrl', urlCompleta);
      else setNuevoProductoForm((prev) => ({ ...prev, imagenUrl: urlCompleta }));
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("No se pudo subir la imagen.");
    }
  };

  return {
    productos, productosFiltrados,
    marcasDisponibles, ramsDisponibles, almacenamientosDisponibles,
    filtroMarca, setFiltroMarca,
    filtroModelo, setFiltroModelo,
    filtroRam, setFiltroRam,
    filtroAlmacenamiento, setFiltroAlmacenamiento,
    filtroPrecioMax, setFiltroPrecioMax,
    limpiarFiltros,
    isModalOpen, nuevoProductoForm, setNuevoProductoForm, tempEditForms,
    handleOpenModal, handleCloseModal, handleCreateProductoSubmit, handleStartEdit,
    handleUpdateTempField, handleSaveProducto, handleToggleEstado, handleDeleteProducto, handleImageUpload,
  };
};