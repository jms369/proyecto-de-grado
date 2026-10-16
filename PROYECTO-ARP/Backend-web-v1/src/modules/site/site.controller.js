/**
 * Módulo: site - site.controller.js
 * Descripción: Controladores para gestión del sitio web (logo, redes, whatsapp, info, ofertas, header y footer).
 */
const pool = require('../../config/db');

// --- HEADER & FOOTER & HOME ---
async function obtenerLogo(req, res) {
  const [rows] = await pool.query('SELECT logo_url_sw FROM SITIO_WEB LIMIT 1');
  return res.json(rows[0] || { logo_url_sw: null });
}

async function obtenerFooter(req, res) {
  const [rows] = await pool.query('SELECT url_facebook_sw, url_instagram_sw, url_tiktok_sw FROM SITIO_WEB LIMIT 1');
  return res.json(rows[0] || {});
}

async function obtenerHomeInfo(req, res) {
  const [ofertas] = await pool.query('SELECT id_oferta, url_oferta_sw FROM IMAGENES_OFERTAS');
  const [info] = await pool.query('SELECT mas_infoweb_sw FROM MAS_INFO_SITIO_WEB LIMIT 1');
  const [ubicacion] = await pool.query('SELECT url_ubicacion_sw FROM SITIO_WEB LIMIT 1');
  const [whatsapp] = await pool.query('SELECT num_whatsapp_sw FROM SITIO_WEB LIMIT 1');

  return res.json({
    ofertas,
    masInformacion: info[0]?.mas_infoweb_sw || null,
    ubicacion: ubicacion[0]?.url_ubicacion_sw || null,
    whatsapp: whatsapp[0]?.num_whatsapp_sw || null
  });
}

// --- EDITAR WEB (ADMIN) ---
async function actualizarLogo(req, res) {
  const { url } = req.body;
  await pool.query('UPDATE SITIO_WEB SET logo_url_sw = ?', [url]);
  return res.json({ mensaje: 'Logo actualizado correctamente.' });
}

async function actualizarRedesYContacto(req, res) {
  const { facebook, instagram, whatsapp, tiktok, ubicacion } = req.body;
  const query = `
    UPDATE SITIO_WEB 
    SET url_facebook_sw = ?, url_instagram_sw = ?, num_whatsapp_sw = ?, url_tiktok_sw = ?, url_ubicacion_sw = ?
  `;
  await pool.query(query, [facebook, instagram, whatsapp, tiktok, ubicacion]);
  return res.json({ mensaje: 'Información de redes y contacto actualizada.' });
}

async function actualizarTextoInformativo(req, res) {
  const { textoInformativo } = req.body;
  const [rows] = await pool.query('SELECT * FROM MAS_INFO_SITIO_WEB LIMIT 1');
  if (rows.length === 0) {
    await pool.query('INSERT INTO MAS_INFO_SITIO_WEB (mas_infoweb_sw) VALUES (?)', [textoInformativo]);
  } else {
    await pool.query('UPDATE MAS_INFO_SITIO_WEB SET mas_infoweb_sw = ?', [textoInformativo]);
  }
  return res.json({ mensaje: 'Texto informativo actualizado.' });
}

// Ofertas
async function listarOfertas(req, res) {
  const [rows] = await pool.query('SELECT * FROM IMAGENES_OFERTAS');
  return res.json(rows);
}

async function crearOferta(req, res) {
  const { url } = req.body;
  const [result] = await pool.query('INSERT INTO IMAGENES_OFERTAS (url_oferta_sw) VALUES (?)', [url]);
  return res.status(201).json({ mensaje: 'Oferta creada', id: result.insertId });
}

async function eliminarOferta(req, res) {
  const { id } = req.params;
  await pool.query('DELETE FROM IMAGENES_OFERTAS WHERE id_oferta = ?', [id]);
  return res.json({ mensaje: 'Oferta eliminada.' });
}

module.exports = {
  obtenerLogo,
  obtenerFooter,
  obtenerHomeInfo,
  actualizarLogo,
  actualizarRedesYContacto,
  actualizarTextoInformativo,
  listarOfertas,
  crearOferta,
  eliminarOferta
};
