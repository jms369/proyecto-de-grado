/**
 * Módulo: products - product.service.js
 * Descripción: Consultas a la base de datos para el catálogo de celulares y administración de productos.
 */
const pool = require('../../config/db');

async function obtenerProductosTodos() {
  const [rows] = await pool.query('SELECT * FROM PRODUCTOS_CELULAR');
  return rows.map(mapearProductoFrontend);
}

async function obtenerProductosActivos() {
  const [rows] = await pool.query('SELECT * FROM PRODUCTOS_CELULAR WHERE estado_celular = 1');
  return rows.map(mapearProductoFrontend);
}

async function obtenerProductosAsistente() {
  const query = `
    SELECT id_producto, marca_celular, modelo_celular, precio_celular,
           almacenamiento_celular, ram_celular, bateria_celular, puntuacion_celular,
           pantalla_celular, cam_principal_cel, certificacionip_celular, cam_frontal_cel, tasa_refresco_cel
    FROM PRODUCTOS_CELULAR
    WHERE estado_celular = 1
  `;
  const [rows] = await pool.query(query);
  return rows;
}

function mapearProductoFrontend(p) {
  return {
    id: p.id_producto,
    marca: p.marca_celular,
    modelo: p.modelo_celular,
    precio: p.precio_celular,
    estado: p.estado_celular,
    procesador: p.procesador_celular,
    almacenamiento: p.almacenamiento_celular,
    ram: p.ram_celular,
    batería: p.bateria_celular,
    puntuacionAntutu: p.puntuacion_celular,
    pantalla: p.pantalla_celular,
    camaraPrincipal: p.cam_principal_cel,
    certificacionIp: p.certificacionip_celular,
    cargaRapida: p.carga_rapida_cel,
    camaraFrontal: p.cam_frontal_cel,
    tasaRefresco: p.tasa_refresco_cel,
    masInformacion: p.mas_info_celular,
    imagenUrl: p.url_imagen
  };
}

module.exports = {
  obtenerProductosTodos,
  obtenerProductosActivos,
  obtenerProductosAsistente,
  mapearProductoFrontend
};
