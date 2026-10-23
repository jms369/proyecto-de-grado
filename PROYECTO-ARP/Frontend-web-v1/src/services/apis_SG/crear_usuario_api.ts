// src/services/apis_SG/crear_usuario_api.ts

// Ajusta esta URL si tu backend corre en otro puerto (según docker-compose es el 3000)
const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

// Helper para manejar respuestas y errores de autenticación
const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    window.location.href = '/inicioSG'; // Redirige al login del sistema de gestión
    alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
    throw new Error('No autorizado');
  }
  if (response.status === 403) {
    window.location.href = '/dashboard'; // Redirige al dashboard si no tiene permisos
    alert('No tiene permisos para realizar esta acción.');
    throw new Error('Prohibido');
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error en la petición');
  }
  if (response.status === 204) return null; // Sin contenido (ej. un DELETE)
  return response.json();
};

// 1. GET Ligero (Para la Tabla de la Imagen 1)
export const apiListarUsuariosTabla = async (): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    credentials: 'include', // CRUCIAL: Envía la cookie_sesion
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

// 2. GET Completo (Para las Tarjetas de la Imagen 2)
// Usa la misma ruta, pero el mapeador del frontend extraerá todos los campos disponibles
export const apiListarUsuariosTarjetas = async (): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

// 3. PUT Ligero (Para guardar desde la Tabla)
export const apiActualizarUsuarioTabla = async (id: string, usuario: any): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  });
  await handleResponse(response);
};

// 4. PUT Completo (Para guardar desde las Tarjetas)
export const apiActualizarUsuarioTarjeta = async (id: string, usuario: any): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  });
  await handleResponse(response);
};

// 5. Crear Usuario (Se mantiene igual)
export const apiCrearUsuario = async (usuario: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  });
  return handleResponse(response);
};

// 6. Buscar Usuario (Para el botón de buscar de la Imagen 2)
export const apiBuscarUsuario = async (filtros: any): Promise<any[]> => {
  const query = new URLSearchParams({
    n1: filtros.nombre1 || '',
    n2: filtros.nombre2 || '',
    a1: filtros.apellido1 || '',
    a2: filtros.apellido2 || ''
  }).toString();

  const response = await fetch(`${API_BASE_URL}/users/buscar?${query}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};