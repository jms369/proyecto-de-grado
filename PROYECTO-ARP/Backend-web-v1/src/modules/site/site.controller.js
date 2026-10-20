/**
 * Módulo: site - site.controller.js
 * Descripción: Controladores para gestión del sitio web (logo, redes, whatsapp, info, ofertas, header y footer).
 */
const pool = require('../../config/db');
const fs = require('fs');       //  NUEVO: Para borrar archivos físicos
const path = require('path');   //  NUEVO: Para construir la ruta del archivo

// --- HEADER & FOOTER & HOME ---
async function obtenerLogo(req, res) {
  const [rows] = await pool.query('SELECT logo_url_sw FROM SITIO_WEB LIMIT 1');
  return res.json(rows[0] || { logo_url_sw: null });
}

async function obtenerFooter(req, res) {
  //  CORRECCIÓN: Agregamos num_whatsapp_sw y url_ubicacion_sw a la consulta
  const [rows] = await pool.query(`
    SELECT url_facebook_sw, url_instagram_sw, url_tiktok_sw, url_ubicacion_sw, num_whatsapp_sw 
    FROM SITIO_WEB 
    LIMIT 1
  `);
  return res.json(rows[0] || {});
}

async function obtenerHomeInfo(req, res) {
  const [ofertas] = await pool.query('SELECT id_oferta, url_oferta_sw FROM IMAGENES_OFERTAS');
  const [info] = await pool.query('SELECT mas_infoweb_sw FROM MAS_INFO_SITIO_WEB LIMIT 1');
  const [ubicacion] = await pool.query('SELECT url_ubicacion_sw FROM SITIO_WEB LIMIT 1');
  

  return res.json({
    ofertas,
    masInformacion: info[0]?.mas_infoweb_sw || null,
    ubicacion: ubicacion[0]?.url_ubicacion_sw || null,
    
  });
}

// --- EDITAR WEB (ADMIN) ---
async function actualizarLogo(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'La URL del logo es requerida.' });
  
  await pool.query('UPDATE SITIO_WEB SET logo_url_sw = ?', [url]);
  return res.json({ mensaje: 'Logo actualizado correctamente.' });
}

async function actualizarRedesYContacto(req, res) {
  const { facebook, instagram, whatsapp, tiktok, ubicacion } = req.body;
  
  // Función auxiliar para manejar los valores:
  // - Si es undefined (no se envió), devolvemos null para que COALESCE lo ignore.
  // - Si es "" (el usuario borró el campo intencionalmente), también devolvemos null para borrarlo en BD.
  // - Si es un valor real, lo devolvemos tal cual.
  const val = (v) => {
    if (v === undefined || v === '') return null;
    return v;
  };

  const query = `
    UPDATE SITIO_WEB 
    SET url_facebook_sw = COALESCE(?, url_facebook_sw), 
        url_instagram_sw = COALESCE(?, url_instagram_sw), 
        num_whatsapp_sw = COALESCE(?, num_whatsapp_sw), 
        url_tiktok_sw = COALESCE(?, url_tiktok_sw), 
        url_ubicacion_sw = COALESCE(?, url_ubicacion_sw)
  `;
  
  await pool.query(query, [
    val(facebook),
    val(instagram),
    val(whatsapp),
    val(tiktok),
    val(ubicacion)
  ]);
  
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
  if (!url) return res.status(400).json({ error: 'La URL de la oferta es requerida.' });
  
  const [result] = await pool.query('INSERT INTO IMAGENES_OFERTAS (url_oferta_sw) VALUES (?)', [url]);
  return res.status(201).json({ mensaje: 'Oferta creada', id: result.insertId, url });
}

async function eliminarOferta(req, res) {
  const { id } = req.params;

  try {
    // 1. Buscamos la URL de la oferta en la BD antes de borrarla
    const [rows] = await pool.query('SELECT url_oferta_sw FROM IMAGENES_OFERTAS WHERE id_oferta = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Oferta no encontrada.' });
    }

    const urlOferta = rows[0].url_oferta_sw;

    // 2. Borramos el registro de la BD
    await pool.query('DELETE FROM IMAGENES_OFERTAS WHERE id_oferta = ?', [id]);

    // 3. Borramos el archivo físico de la carpeta
    if (urlOferta) {
      const filename = path.basename(urlOferta);
      // Construimos la ruta absoluta: subimos 3 niveles desde src/modules/site para llegar a la raíz
      const filePath = path.join(__dirname, '../../../Uploads/img_ofertas', filename);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Borra el archivo del disco duro
      }
    }

    return res.json({ mensaje: 'Oferta y archivo físico eliminados correctamente.' });

  } catch (error) {
    console.error('Error al eliminar oferta:', error);
    return res.status(500).json({ error: 'Error interno al eliminar la oferta.' });
  }
}


// NUEVA FUNCIÓN: Obtener solo el número de WhatsApp
async function obtenerSoloWhatsapp(req, res) {
  try {
    const [rows] = await pool.query('SELECT num_whatsapp_sw FROM SITIO_WEB LIMIT 1');
    const whatsapp = rows[0]?.num_whatsapp_sw || null;
    return res.json({ whatsapp });
  } catch (error) {
    console.error('Error al obtener WhatsApp:', error);
    return res.status(500).json({ error: 'Error interno al obtener el WhatsApp.' });
  }
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
  eliminarOferta,
  obtenerSoloWhatsapp
};