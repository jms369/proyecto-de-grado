



// src/lógico.ts
import { createSignal, createResource } from 'solid-js';
import type {
  UsuarioModel,
  BusquedaUsuarioFiltro,
  UsuarioErrors
} from '../../types/sg-crear-usuario-i-m';

import {
  mapBackendToFrontendUsuario,
  mapTablaToBackend,
  mapTarjetaToBackend,
  validateUsuarioForm
} from '../../types/sg-crear-usuario-i-m';

import { 
  apiListarUsuariosTabla, 
  apiCrearUsuario, 
  apiActualizarUsuarioTabla, 
  apiActualizarUsuarioTarjeta,
  apiBuscarUsuario
} from '../../services/apis_SG/crear_usuario_api';

export const initialNewUser: UsuarioModel = {
  nombre1: '', nombre2: '', apellido1: '', apellido2: '',
  gmailUsuario: '', carnetIdentidad: '', complemento: '',
  numeroCelular: '', direccion: '', fechaNacimiento: '',
  grupoSanguineo: '', contrasena: '', rol: 'trabajador', estado: true
};

export const initialSearchFilter: BusquedaUsuarioFiltro = {
  nombre1: '', nombre2: '', apellido1: '', apellido2: ''
};

export function useUsuarioController() {
  // 1. Carga Inicial (Tabla)
  const [usuariosData, { refetch, mutate }] = createResource(async () => {
    try {
      const dtos = await apiListarUsuariosTabla();
      return dtos.map(mapBackendToFrontendUsuario);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      return [];
    }
  });

  const usuariosList = () => usuariosData() || [];
  
  // 2. Estados de Búsqueda y Modales
  const [busquedaResult, setBusquedaResult] = createSignal<UsuarioModel[]>([]);
  const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false);
  const [modalErrors, setModalErrors] = createSignal<UsuarioErrors>({});

  // 3. Registrar Nuevo Usuario (Modal) - SÍ usa validación completa
  const handleRegisterUser = async (newUserForm: UsuarioModel, onSuccessCloseModal: () => void) => {
    const errors = validateUsuarioForm(newUserForm, true);
    setModalErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const payload = mapTarjetaToBackend(newUserForm);
      await apiCrearUsuario(payload);
      await refetch();
      onSuccessCloseModal();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("No se pudo crear el usuario.");
    }
  };

  // 4. Cambiar Estado (Habilitar/Suspender)
  const handleToggleEstado = async (id: string, nuevoEstado: boolean, isFromCard: boolean = false) => {
    const usuario = usuariosList().find(u => u.id === id) || busquedaResult().find(u => u.id === id);
    if (!usuario) return;

    try {
      const payload = mapTablaToBackend({ ...usuario, estado: nuevoEstado });
      await apiActualizarUsuarioTabla(id, payload);
      
      mutate((prev) => prev?.map(u => u.id === id ? { ...u, estado: nuevoEstado } : u));
      setBusquedaResult((prev) => prev.map(u => u.id === id ? { ...u, estado: nuevoEstado } : u));

    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("No se pudo cambiar el estado.");
    }
  };

  // 5. Guardar Cambios desde la TABLA (Ligero)
  const handleSaveTabla = async (usuario: UsuarioModel) => {
    // ⚠️ CORRECCIÓN: Eliminamos la validación completa aquí.
    // Solo validamos que el nombre y apellido no estén vacíos, ya que son los únicos obligatorios en la tabla.
    if (!usuario.nombre1.trim()) return alert('El primer nombre es obligatorio.');
    if (!usuario.apellido1.trim()) return alert('El primer apellido es obligatorio.');

    try {
      const payload = mapTablaToBackend(usuario);
      await apiActualizarUsuarioTabla(usuario.id!, payload);
      
      mutate((prev) => prev?.map(u => u.id === usuario.id ? { ...usuario } : u));
      alert(`Tabla: Cambios guardados para ${usuario.nombre1}`);
    } catch (error) {
      console.error("Error al guardar desde tabla:", error);
      alert("No se pudo guardar. Revisa la consola.");
    }
  };

  // 6. Guardar Cambios desde la TARJETA (Completo) - SÍ usa validación completa
  const handleSaveTarjeta = async (usuario: UsuarioModel) => {
    const errors = validateUsuarioForm(usuario, false);
    if (Object.keys(errors).length > 0) return alert(Object.values(errors)[0]);

    try {
      const payload = mapTarjetaToBackend(usuario);
      await apiActualizarUsuarioTarjeta(usuario.id!, payload);
      
      setBusquedaResult((prev) => prev.map(u => u.id === usuario.id ? { ...usuario } : u));
      alert(`Tarjeta: Cambios guardados para ${usuario.nombre1}`);
    } catch (error) {
      console.error("Error al guardar desde tarjeta:", error);
      alert("No se pudo guardar. Revisa la consola.");
    }
  };

  // 7. Buscar Usuarios (Hacia el backend)
  const handleSearchUsers = async (filtros: BusquedaUsuarioFiltro) => {
    try {
      const dtos = await apiBuscarUsuario(filtros);
      const resultados = dtos.map(mapBackendToFrontendUsuario);
      setBusquedaResult(resultados);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  return {
    usuariosList,
    setUsuariosList: mutate,
    busquedaResult,
    setBusquedaResult,
    isModalOpen,
    setIsModalOpen,
    modalErrors,
    setModalErrors,
    handleRegisterUser,
    handleToggleEstado,
    handleSaveTabla,
    handleSaveTarjeta,
    handleSearchUsers
  };
}