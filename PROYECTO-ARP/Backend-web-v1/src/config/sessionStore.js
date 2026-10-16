/**
 * Archivo: src/config/sessionStore.js
 * Descripción: Configuración lógica para manejo y persistencia de sesiones en la tabla SESIONES.
 */
const pool = require('./db');
const crypto = require('crypto');

async function crearSesion(usuarioId, gmail, rol, data = null) {
  const cookieSesion = crypto.randomBytes(32).toString('hex');
  const expiresSesion = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

  const query = `
    INSERT INTO SESIONES (cookie_sesion, usuario_id, gmail_sesion, rol_sesion, expires_sesion, data_sesion)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  await pool.query(query, [cookieSesion, usuarioId, gmail, rol, expiresSesion, JSON.stringify(data)]);
  return { cookieSesion, dataSesion: data, rolSesion: rol };
}

async function obtenerSesionPorCookie(cookieSesion) {
  const query = `
    SELECT s.*, u.rol_sg, u.estado_usuario_sg 
    FROM SESIONES s
    JOIN USUARIOS_SG u ON s.usuario_id = u.id_usuario_sg
    WHERE s.cookie_sesion = ? AND s.expires_sesion > NOW()
  `;
  const [rows] = await pool.query(query, [cookieSesion]);
  if (rows.length === 0) return null;
  return rows[0];
}

async function eliminarSesion(cookieSesion) {
  const query = 'DELETE FROM SESIONES WHERE cookie_sesion = ?';
  await pool.query(query, [cookieSesion]);
}

module.exports = {
  crearSesion,
  obtenerSesionPorCookie,
  eliminarSesion
};
