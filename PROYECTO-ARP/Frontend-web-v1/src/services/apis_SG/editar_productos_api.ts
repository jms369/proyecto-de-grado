// src/services/apis_SG/editar_productos_api.ts
import type { SGProductoDTO } from '../../types/sg-editar-productos-i-m';

// Ajusta esta URL si tu backend corre en otro puerto
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper para manejar respuestas y errores de autenticación
const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    alert('Su sesión ha expirado o no es válida. Por favor, inicie sesión nuevamente.');
    window.location.href = '/login'; // Ajusta a tu ruta de login real
    throw new Error('No autorizado');
  }
  if (response.status === 403) {
    alert('No tiene permisos suficientes para realizar esta acción.');
    throw new Error('Prohibido');
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`Error en petición a ${response.url}:`, errorData);
    throw new Error(errorData.error || 'Error en la petición al servidor');
  }
  if (response.status === 204) return null; 
  
  return response.json();
};

// 1. Obtener todos los productos (Ruta Admin)
export const apiObtenerProductos = async (): Promise<SGProductoDTO[]> => {
  const url = `${API_BASE_URL}/products/admin`;
  console.log("Llamando a:", url); // Debug
  
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Envía la cookie de sesión
  });
  return handleResponse(response);
};

// 2. Crear un producto
export const apiCrearProducto = async (producto: SGProductoDTO): Promise<{ id: number }> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(producto),
  });
  return handleResponse(response);
};

// 3. Actualizar un producto
export const apiActualizarProducto = async (id: string | number, producto: SGProductoDTO): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(producto),
  });
  await handleResponse(response);
};

// 4. Eliminar un producto
export const apiEliminarProducto = async (id: string | number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  await handleResponse(response);
};

// 5. Subir Imagen
export const apiSubirImagen = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('imagen', file); // 'imagen' debe coincidir con upload.single('imagen') del backend

  const response = await fetch(`${API_BASE_URL}/products/upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const data = await handleResponse(response);
  return data.url; // Retorna algo como "/uploads/img_productos/producto-123.jpg"
};