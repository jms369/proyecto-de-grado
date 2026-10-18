


/**
 * Módulo: products - product.controller.js
 * Descripción: Controladores para CRUD de productos, catálogo público y asistente de recomendación.
 */
const pool = require('../../config/db');
const {
  obtenerProductosTodos,
  obtenerProductosActivos,
  obtenerProductosAsistente
} = require('./product.service');

// ============================================================================
// 1. VER PRODUCTOS (ADMIN - Todos)
// ============================================================================
// ¿QUÉ HACE? Recibe la petición del frontend para listar todos los productos.
// ¿QUÉ RECIBE? Nada en el body (solo la cookie de sesión validada por el middleware).
// ¿QUÉ ENVÍA? Un JSON con el array de productos crudos de la BD.
async function verProductosAdmin(req, res) {
  // Llama al service para que consulte la BD.
  const productos = await obtenerProductosTodos();
  
  // ENVÍA AL FRONTEND: Status 200 (OK) y el array JSON.
  return res.json(productos);
}

// ============================================================================
// 2. VER CATÁLOGO PÚBLICO (Solo activos)
// ============================================================================
// ¿QUÉ HACE? Recibe la petición del frontend (web pública) para listar productos visibles.
// ¿QUÉ ENVÍA? Un JSON con los productos que tienen estado = 1.
async function verCatalogoPublico(req, res) {
  const productos = await obtenerProductosActivos();
  return res.json(productos);
}

// ============================================================================
// 3. ASISTENTE DE RECOMENDACIÓN
// ============================================================================
// ¿QUÉ HACE? Devuelve los datos específicos para que el algoritmo del asistente funcione.
async function asistenteRecomendacion(req, res) {
  const productos = await obtenerProductosAsistente();
  return res.json(productos);
}

// ============================================================================
// 4. CREAR PRODUCTO
// ============================================================================
// ¿QUÉ HACE? Recibe los datos del formulario, los inserta en la BD y devuelve el ID generado.
async function crearProducto(req, res) {
  // RECIBE DEL FRONTEND: req.body contiene el JSON enviado por el fetch (POST).
  // ⚠️ CORRECCIÓN CRÍTICA: Los nombres deben coincidir EXACTAMENTE con lo que envía el frontend.
  // Si el frontend envía "marca_celular", aquí debemos recibir "marca_celular".
  const {
    marca_celular, modelo_celular, precio_celular, estado_celular, procesador_celular,
    almacenamiento_celular, ram_celular, bateria_celular, puntuacion_celular, pantalla_celular,
    cam_principal_cel, certificacionip_celular, carga_rapida_cel, cam_frontal_cel,
    tasa_refresco_cel, mas_info_celular, url_imagen
  } = req.body;

  // ENVÍA A LA BD: La consulta SQL de inserción.
  const query = `
    INSERT INTO PRODUCTOS_CELULAR (
      marca_celular, modelo_celular, precio_celular, estado_celular, procesador_celular,
      almacenamiento_celular, ram_celular, bateria_celular, puntuacion_celular, pantalla_celular,
      cam_principal_cel, certificacionip_celular, carga_rapida_cel, cam_frontal_cel,
      tasa_refresco_cel, mas_info_celular, url_imagen
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // RECIBE DE LA BD: `result` (contiene insertId y affectedRows).
  // ENVÍA A LA BD: El array de valores en el orden exacto de los "?" de la consulta.
  const [result] = await pool.query(query, [
    marca_celular, 
    modelo_celular, 
    precio_celular, 
    estado_celular ?? 1, // Si estado es undefined/null, asigna 1 por defecto.
    procesador_celular, 
    almacenamiento_celular,
    ram_celular, 
    bateria_celular, 
    puntuacion_celular, 
    pantalla_celular, 
    cam_principal_cel,
    certificacionip_celular ?? 0, // Si es null, asigna 0.
    carga_rapida_cel, 
    cam_frontal_cel, 
    tasa_refresco_cel,
    mas_info_celular, 
    url_imagen
  ]);

  // ENVÍA AL FRONTEND: Status 201 (Creado) y el ID del nuevo producto.
  return res.status(201).json({ mensaje: 'Producto creado exitosamente', id: result.insertId });
}

// ============================================================================
// 5. ACTUALIZAR PRODUCTO
// ============================================================================
// ¿QUÉ HACE? Recibe el ID y los nuevos datos, actualiza la BD y responde.
async function actualizarProducto(req, res) {
  // RECIBE DEL FRONTEND: El ID desde la URL (ej. /api/products/5).
  const { id } = req.params; 

  // RECIBE DEL FRONTEND: Los nuevos datos desde el body (PUT).
  // ⚠️ CORRECCIÓN: Igual que arriba, recibimos los nombres exactos de la BD.
  const {
    marca_celular, modelo_celular, precio_celular, estado_celular, procesador_celular,
    almacenamiento_celular, ram_celular, bateria_celular, puntuacion_celular, pantalla_celular,
    cam_principal_cel, certificacionip_celular, carga_rapida_cel, cam_frontal_cel,
    tasa_refresco_cel, mas_info_celular, url_imagen
  } = req.body;

  // ENVÍA A LA BD: Consulta de actualización.
  const query = `
    UPDATE PRODUCTOS_CELULAR
    SET marca_celular = ?, modelo_celular = ?, precio_celular = ?, estado_celular = ?,
        procesador_celular = ?, almacenamiento_celular = ?, ram_celular = ?, bateria_celular = ?,
        puntuacion_celular = ?, pantalla_celular = ?, cam_principal_cel = ?, certificacionip_celular = ?,
        carga_rapida_cel = ?, cam_frontal_cel = ?, tasa_refresco_cel = ?, mas_info_celular = ?, 
        url_imagen = ?
    WHERE id_producto = ?
  `;

  // RECIBE DE LA BD: `result`.
  const [result] = await pool.query(query, [
    marca_celular, 
    modelo_celular, 
    precio_celular, 
    estado_celular, 
    procesador_celular, 
    almacenamiento_celular,
    ram_celular, 
    bateria_celular, 
    puntuacion_celular, 
    pantalla_celular, 
    cam_principal_cel,
    certificacionip_celular, 
    carga_rapida_cel, 
    cam_frontal_cel, 
    tasa_refresco_cel,
    mas_info_celular, 
    url_imagen,
    id // El ID para el WHERE.
  ]);

  // SI NO SE ENCONTRÓ EL PRODUCTO:
  if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }
  
  // SI SE ACTUALIZÓ CORRECTAMENTE:
  return res.json({ mensaje: 'Producto actualizado correctamente.' });
}

// ============================================================================
// 6. ELIMINAR PRODUCTO
// ============================================================================
// ¿QUÉ HACE? Borra un producto de la BD usando su ID.
async function eliminarProducto(req, res) {
  const { id } = req.params; // RECIBE: El ID de la URL.

  // ENVÍA A LA BD: Consulta DELETE.
  const [result] = await pool.query('DELETE FROM PRODUCTOS_CELULAR WHERE id_producto = ?', [id]);
  
  if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado.' });
  return res.json({ mensaje: 'Producto eliminado exitosamente.' });
}

module.exports = {
  verProductosAdmin,
  verCatalogoPublico,
  asistenteRecomendacion,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};