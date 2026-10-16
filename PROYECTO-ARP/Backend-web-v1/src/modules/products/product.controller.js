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

// VER PRODUCTOS (ADMIN - Todos)
async function verProductosAdmin(req, res) {
  const productos = await obtenerProductosTodos();
  return res.json(productos);
}

// VER PRODUCTOS (PÚBLICO - Solo activos)
async function verCatalogoPublico(req, res) {
  const productos = await obtenerProductosActivos();
  return res.json(productos);
}

// ASISTENTE DE RECOMENDACIÓN
async function asistenteRecomendacion(req, res) {
  const productos = await obtenerProductosAsistente();
  return res.json(productos);
}

// CREAR PRODUCTO
async function crearProducto(req, res) {
  const {
    marca, modelo, precio, estado, procesador, almacenamiento,
    ram, batería, puntuacionAntutu, pantalla, camaraPrincipal,
    certificacionIp, cargaRapida, camaraFrontal, tasaRefresco,
    masInformacion, imagenUrl
  } = req.body;

  const query = `
    INSERT INTO PRODUCTOS_CELULAR (
      marca_celular, modelo_celular, precio_celular, estado_celular, procesador_celular,
      almacenamiento_celular, ram_celular, bateria_celular, puntuacion_celular, pantalla_celular,
      cam_principal_cel, certificacionip_celular, carga_rapida_cel, cam_frontal_cel,
      tasa_refresco_cel, mas_info_celular, url_imagen
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query(query, [
    marca, modelo, precio, estado ?? 1, procesador, almacenamiento,
    ram, batería, puntuacionAntutu, pantalla, camaraPrincipal,
    certificacionIp ?? 0, cargaRapida, camaraFrontal, tasaRefresco,
    masInformacion, imagenUrl
  ]);

  return res.status(201).json({ mensaje: 'Producto creado exitosamente', id: result.insertId });
}

// ACTUALIZAR PRODUCTO
async function actualizarProducto(req, res) {
  const { id } = req.params;
  const {
    marca, modelo, precio, estado, procesador, almacenamiento,
    ram, batería, puntuacionAntutu, pantalla, camaraPrincipal,
    certificacionIp, cargaRapida, camaraFrontal, tasaRefresco,
    masInformacion, imagenUrl
  } = req.body;

  const query = `
    UPDATE PRODUCTOS_CELULAR
    SET marca_celular = ?, modelo_celular = ?, precio_celular = ?, estado_celular = ?,
        procesador_celular = ?, almacenamiento_celular = ?, ram_celular = ?, bateria_celular = ?,
        puntuacion_celular = ?, pantalla_celular = ?, cam_principal_cel = ?, certificacionip_celular = ?,
        carga_rapida_cel = ?, cam_frontal_cel = ?, tasa_refresco_cel = ?, mas_info_celular = ?, url_imagen = ?
    WHERE id_producto = ?
  `;

  const [result] = await pool.query(query, [
    marca, modelo, precio, estado, procesador, almacenamiento,
    ram, batería, puntuacionAntutu, pantalla, camaraPrincipal,
    certificacionIp, cargaRapida, camaraFrontal, tasaRefresco,
    masInformacion, imagenUrl, id
  ]);

  if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado.' });
  return res.json({ mensaje: 'Producto actualizado correctamente.' });
}

// ELIMINAR PRODUCTO
async function eliminarProducto(req, res) {
  const { id } = req.params;
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
