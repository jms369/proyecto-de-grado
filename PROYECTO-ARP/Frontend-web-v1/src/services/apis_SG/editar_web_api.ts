// src/services/apis_SG/editar_web_api.ts

const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    window.location.href = '/inicioSG';
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
  return response.json();
};

// 1. Obtener datos del sitio (público)
export const apiObtenerDatosSitio = async () => {
  const response = await fetch(`${API_BASE_URL}/site/home`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

// 2. Actualizar Logo
export const apiActualizarLogo = async (url: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/site/logo`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  await handleResponse(response);
};

// 3. Actualizar Redes
export const apiActualizarRedes = async (links: any): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/site/redes`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(links),
  });
  await handleResponse(response);
};

// 4. Actualizar Info
export const apiActualizarInfo = async (textoInformativo: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/site/info`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ textoInformativo }),
  });
  await handleResponse(response);
};

// 5. Subir Logo
export const apiSubirLogo = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('imagen', file);

  const response = await fetch(`${API_BASE_URL}/site/upload-logo`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const data = await handleResponse(response);
  return data.url;
};

// 6. Subir Oferta
export const apiSubirOferta = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('imagen', file);

  const response = await fetch(`${API_BASE_URL}/site/upload-oferta`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const data = await handleResponse(response);
  return data.url;
};

// 7. Subir Imagen de Producto (Reutiliza endpoint de productos)
export const apiSubirImagenProducto = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('imagen', file);

  const response = await fetch(`${API_BASE_URL}/products/upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const data = await handleResponse(response);
  return data.url;
};

// 8. Listar Ofertas
export const apiListarOfertas = async (): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/site/ofertas`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

// 9. Crear Oferta (guarda la URL en BD)
export const apiCrearOferta = async (url: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/site/ofertas`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  await handleResponse(response);
};

// 10. Eliminar Oferta
export const apiEliminarOferta = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/site/ofertas/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  await handleResponse(response);
};



// 11. Obtener datos del sitio (Logo, Footer, Home)
export const apiObtenerDatosSitioCompletos = async () => {
  const response = await fetch(`${API_BASE_URL}/site/home`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

// 12. Obtener solo el Logo
export const apiObtenerLogo = async () => {
  const response = await fetch(`${API_BASE_URL}/site/logo`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

// 13. Obtener solo el Footer (Redes)
export const apiObtenerFooter = async () => {
  const response = await fetch(`${API_BASE_URL}/site/footer`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

// 14. Obtener archivos físicos de img_productos
export const apiObtenerArchivosProductos = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/site/productos-imagenes-fisicas`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

// 15. Eliminar archivo físico de img_productos
export const apiEliminarArchivoProducto = async (url: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/site/productos-imagenes-fisicas`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  await handleResponse(response);
};


// 16. Listar logos no usados (físicos en la carpeta que no están en la BD)
export const apiObtenerLogosNoUsados = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/site/logos-no-usados`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

// 17. Eliminar un logo físico de la carpeta
export const apiEliminarLogoFisico = async (url: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/site/logos-no-usados`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  await handleResponse(response);
};