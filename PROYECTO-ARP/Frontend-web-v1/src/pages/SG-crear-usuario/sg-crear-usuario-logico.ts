import { createSignal } from 'solid-js';
import type {
  UsuarioModel,
  BusquedaUsuarioFiltro,
  UsuarioBackendDTO,
  UsuarioErrors
} from '../../types/sg-crear-usuario-i-m';

import {
  mapBackendToFrontendUsuario,
  mapFrontendToBackendUsuario,
  validateUsuarioForm
} from '../../types/sg-crear-usuario-i-m';

// Estado inicial para la creación de usuarios en el modal
export const initialNewUser: UsuarioModel = {
  nombre1: '',
  nombre2: '',
  apellido1: '',
  apellido2: '',
  gmailUsuario: '',
  carnetIdentidad: '',
  complemento: '',
  numeroCelular: '',
  direccion: '',
  fechaNacimiento: '',
  grupoSanguineo: '',
  contrasena: '',
  rol: 'trabajador',
  estado: true
};

// Estado inicial para los filtros de búsqueda
export const initialSearchFilter: BusquedaUsuarioFiltro = {
  nombre1: '',
  nombre2: '',
  apellido1: '',
  apellido2: ''
};

// Datos simulados de prueba provenientes del Backend (DTOs)
const mockBackendUsers: UsuarioBackendDTO[] = [
  {
    id: '1',
    first_name: 'Carlos',
    second_name: 'Alberto',
    first_surname: 'Gomez',
    second_surname: 'Perez',
    user_email: 'carlos.gomez@gmail.com',
    ci_number: '12345678',
    ci_complement: '1A',
    phone_number: '71234567',
    address: 'Av. Heroinas #123',
    birth_date: '1990-05-15',
    blood_type: 'O+',
    role: 'administrador',
    is_active: true
  },
  {
    id: '2',
    first_name: 'Maria',
    second_name: 'Elena',
    first_surname: 'Rojas',
    second_surname: 'Suarez',
    user_email: 'maria.rojas@gmail.com',
    ci_number: '87654321',
    ci_complement: '',
    phone_number: '79876543',
    address: 'Calle Espana #456',
    birth_date: '1995-10-20',
    blood_type: 'A+',
    role: 'trabajador',
    is_active: true
  }
];

export function useUsuarioController() {
  // Lista principal de usuarios cargados
  const [usuariosList, setUsuariosList] = createSignal<UsuarioModel[]>(
    mockBackendUsers.map(mapBackendToFrontendUsuario)
  );

  // Resultado de la búsqueda por filtros horizontales
  const [busquedaResult, setBusquedaResult] = createSignal<UsuarioModel[]>([]);

  // Control de apertura y errores del modal de registro
  const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false);
  const [modalErrors, setModalErrors] = createSignal<UsuarioErrors>({});

  // 1. Registrar Nuevo Usuario desde el Modal
  const handleRegisterUser = (newUserForm: UsuarioModel, onSuccessCloseModal: () => void) => {
    const errors = validateUsuarioForm(newUserForm, true);
    setModalErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const newId = (Date.now() % 100000).toString();
    const createdUser: UsuarioModel = {
      ...newUserForm,
      id: newId
    };

    // Agregar nuevo usuario a la lista local
    setUsuariosList((prev) => [createdUser, ...prev]);

    // Mapear a DTO para consumo o envío simulado
    const dtoToBackend: UsuarioBackendDTO = mapFrontendToBackendUsuario(createdUser);
    console.log('DTO preparado para envío al servidor (Crear):', dtoToBackend);

    alert(`Usuario ${createdUser.nombre1} ${createdUser.apellido1} creado con éxito.`);
    onSuccessCloseModal();
  };

  // 2. Cambiar Estado (Habilitar / Suspender)
  const handleToggleEstado = (id: string, nuevoEstado: boolean, updateSearchResult: boolean = false) => {
    setUsuariosList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, estado: nuevoEstado } : u))
    );

    if (updateSearchResult) {
      setBusquedaResult((prev) =>
        prev.map((u) => (u.id === id ? { ...u, estado: nuevoEstado } : u))
      );
    }
  };

  // 3. Actualizar campos directamente en la tabla o tarjeta
  const handleUpdateRowField = (id: string, field: keyof UsuarioModel, value: any, updateSearchResult: boolean = false) => {
    setUsuariosList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, [field]: value } : u))
    );

    if (updateSearchResult) {
      setBusquedaResult((prev) =>
        prev.map((u) => (u.id === id ? { ...u, [field]: value } : u))
      );
    }
  };

  // 4. Guardar Cambios de un usuario (acepta el borrador enviado desde el .tsx o busca en el estado actual)
  const handleSaveChanges = (updatedUser?: UsuarioModel | string) => {
    let userToSave: UsuarioModel | undefined;

    if (typeof updatedUser === 'object' && updatedUser !== null) {
      userToSave = updatedUser;
    } else if (typeof updatedUser === 'string') {
      userToSave = usuariosList().find((u) => u.id === updatedUser);
    }

    if (!userToSave) {
      alert('No se encontró la información del usuario a guardar.');
      return;
    }

    const errors = validateUsuarioForm(userToSave, false);
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      alert(`Error al guardar cambios de ${userToSave.nombre1 || 'Usuario'}: ${firstError}`);
      return;
    }

    // Actualizar las listas reactivas locales con la fila guardada
    setUsuariosList((prev) => prev.map((u) => (u.id === userToSave!.id ? { ...userToSave! } : u)));
    setBusquedaResult((prev) => prev.map((u) => (u.id === userToSave!.id ? { ...userToSave! } : u)));

    const dto: UsuarioBackendDTO = mapFrontendToBackendUsuario(userToSave);
    console.log('Guardando cambios del usuario en Backend (DTO):', dto);

    alert(`Cambios guardados con éxito para ${userToSave.nombre1} ${userToSave.apellido1}`);
  };

  // 5. Buscar Usuarios con los filtros aplicados
  const handleSearchUsers = (filtros: BusquedaUsuarioFiltro) => {
    const n1 = filtros.nombre1.trim().toLowerCase();
    const n2 = filtros.nombre2.trim().toLowerCase();
    const a1 = filtros.apellido1.trim().toLowerCase();
    const a2 = filtros.apellido2.trim().toLowerCase();

    const filtered = usuariosList().filter((u) => {
      const matchN1 = !n1 || u.nombre1.toLowerCase().includes(n1);
      const matchN2 = !n2 || u.nombre2.toLowerCase().includes(n2);
      const matchA1 = !a1 || u.apellido1.toLowerCase().includes(a1);
      const matchA2 = !a2 || u.apellido2.toLowerCase().includes(a2);

      return matchN1 && matchN2 && matchA1 && matchA2;
    });

    setBusquedaResult(filtered);
  };

  return {
    usuariosList,
    setUsuariosList,
    busquedaResult,
    setBusquedaResult,
    isModalOpen,
    setIsModalOpen,
    modalErrors,
    setModalErrors,
    handleRegisterUser,
    handleToggleEstado,
    handleUpdateRowField,
    handleSaveChanges,
    handleSearchUsers
  };
}