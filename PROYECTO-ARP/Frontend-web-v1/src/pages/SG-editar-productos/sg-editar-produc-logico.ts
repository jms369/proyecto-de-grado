import { createSignal } from 'solid-js';
import type { SGProductoModel } from '../../types/sg-editar-productos-i-m';

export const createEmptyProducto = (): SGProductoModel => ({
  id: '',
  marca: '',
  modelo: '',
  precio: 0,
  estado: true,
  procesador: '',
  almacenamiento: 0,
  ram: 0,
  bateria: 0,
  puntuacionAntutu: 0,
  pantalla: '',
  camaraPrincipal: 0,
  certificacionIp: false,
  cargaRapida: 0,
  camaraFrontal: 0,
  tasaRefresco: 0,
  masInformacion: '',
  imagenUrl: '',
  isEditing: false,
});

export const useSGEditarProductosLogic = () => {
  const [productos, setProductos] = createSignal<SGProductoModel[]>([
    {
      id: 'prod-1',
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
      masInformacion: 'Incluye S-Pen y bordes de titanio',
      imagenUrl: '',
      isEditing: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false);
  const [nuevoProductoForm, setNuevoProductoForm] = createSignal<SGProductoModel>(createEmptyProducto());
  const [tempEditForms, setTempEditForms] = createSignal<Record<string, SGProductoModel>>({});

  const handleOpenModal = () => {
    setNuevoProductoForm(createEmptyProducto());
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProductoSubmit = (e: Event) => {
    e.preventDefault();
    const nuevo: SGProductoModel = {
      ...nuevoProductoForm(),
      id: `prod-${Date.now()}`,
    };
    setProductos((prev) => [nuevo, ...prev]);
    handleCloseModal();
  };

  const handleStartEdit = (id: string) => {
    const original = productos().find((p) => p.id === id);
    if (original) {
      setTempEditForms((prev) => ({
        ...prev,
        [id]: { ...original, isEditing: true },
      }));
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isEditing: true } : p))
      );
    }
  };

  const handleUpdateTempField = (id: string, field: keyof SGProductoModel, value: any) => {
    setTempEditForms((prev) => {
      const current = prev[id] || { ...productos().find((p) => p.id === id)! };
      return {
        ...prev,
        [id]: { ...current, [field]: value },
      };
    });
  };

  const handleSaveProducto = (id: string) => {
    const updatedData = tempEditForms()[id];
    if (updatedData) {
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? { ...updatedData, isEditing: false } : p))
      );
      setTempEditForms((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const handleToggleEstado = (id: string, nuevoEstado: boolean) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );
    if (tempEditForms()[id]) {
      handleUpdateTempField(id, 'estado', nuevoEstado);
    }
  };

  const handleDeleteProducto = (id: string) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
    setTempEditForms((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleImageUpload = (id: string | null, file: File) => {
    const fakeUrl = URL.createObjectURL(file);
    if (id) {
      handleUpdateTempField(id, 'imagenUrl', fakeUrl);
    } else {
      setNuevoProductoForm((prev) => ({ ...prev, imagenUrl: fakeUrl }));
    }
  };

  return {
    productos,
    isModalOpen,
    nuevoProductoForm,
    setNuevoProductoForm,
    tempEditForms,
    handleOpenModal,
    handleCloseModal,
    handleCreateProductoSubmit,
    handleStartEdit,
    handleUpdateTempField,
    handleSaveProducto,
    handleToggleEstado,
    handleDeleteProducto,
    handleImageUpload,
  };
};