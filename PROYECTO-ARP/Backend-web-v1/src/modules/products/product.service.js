/**
 * Módulo: products - product.service.js
 * Descripción: Consultas a la base de datos para el catálogo de celulares y administración de productos.
 */
const pool = require('../../config/db'); // Conexión a MySQL (usando mysql2/promise)

// ============================================================================
// 1. OBTENER TODOS LOS PRODUCTOS (Para el panel de Administrador)
// ============================================================================
// ¿QUÉ HACE? Consulta la tabla PRODUCTOS_CELULAR sin filtros.
// ¿QUÉ DEVUELVE? Un array de objetos con los nombres exactos de las columnas de la BD.
async function obtenerProductosTodos() {
  // RECIBE: Nada.
  // ENVÍA A LA BD: La consulta SQL 'SELECT *'.
  // RECIBE DE LA BD: `rows` (un array de objetos con los nombres de columnas en snake_case).
  const [rows] = await pool.query('SELECT * FROM PRODUCTOS_CELULAR');
  
  //  CORRECCIÓN CRÍTICA: Eliminamos el .map(mapearProductoFrontend).
  // El backend debe devolver los datos tal cual vienen de la BD (snake_case).
  // El Frontend se encarga de traducirlos usando su archivo types.ts.
  return rows; 
}

// ============================================================================
// 2. OBTENER PRODUCTOS ACTIVOS (Para el catálogo público de la web)
// ============================================================================
// ¿QUÉ HACE? Consulta la tabla pero solo trae los productos con estado = 1 (Visibles).
// ¿QUÉ DEVUELVE? Un array de objetos con los datos crudos de la BD.
async function obtenerProductosActivos() {
  // ENVÍA A LA BD: Consulta con filtro WHERE estado_celular = 1.
  const [rows] = await pool.query('SELECT * FROM PRODUCTOS_CELULAR WHERE estado_celular = 1');
  
  //  CORRECCIÓN: Igual que arriba, devolvemos los datos crudos.
  return rows;
}

// ============================================================================
// 3. OBTENER PRODUCTOS PARA EL ASISTENTE (Para el algoritmo de recomendación)
// ============================================================================
// ¿QUÉ HACE? Trae solo las columnas necesarias para que el asistente haga sus cálculos.
// ¿QUÉ DEVUELVE? Un array de objetos con los datos crudos de esas columnas específicas.
async function obtenerProductosAsistente() {
  // ENVÍA A LA BD: Una consulta específica pidiendo solo ciertas columnas.
  const query = `
    SELECT id_producto, marca_celular, modelo_celular, precio_celular,
           almacenamiento_celular, ram_celular, bateria_celular, puntuacion_celular,
           pantalla_celular, cam_principal_cel, certificacionip_celular, cam_frontal_cel, tasa_refresco_cel
    FROM PRODUCTOS_CELULAR
    WHERE estado_celular = 1
  `;
  
  // RECIBE DE LA BD: `rows` con los datos solicitados.
  const [rows] = await pool.query(query);
  
  // ENVÍA AL CONTROLADOR: Los datos crudos.
  return rows;
}



// ============================================================================
// 5. EXPORTACIÓN DE FUNCIONES
// ============================================================================
// ¿QUÉ HACE? Hace que estas funciones estén disponibles para el controlador.
module.exports = {
  obtenerProductosTodos,
  obtenerProductosActivos,
  obtenerProductosAsistente,
  // mapearProductoFrontend // Ya no se exporta porque no se usa
};