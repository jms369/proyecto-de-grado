/**
 * Módulo: auth - auth.service.js
 * Descripción: Lógica de negocio para autenticación, búsqueda de usuarios activos
 *              y manejo de tokens de recuperación.
 */
const pool = require('../../config/db');
const bcrypt = require('bcrypt'); // 👈 bcrypt (compatible Docker)
const crypto = require('crypto');

/**
 * Busca un usuario activo para login (excluye SUPERADMIN).
 */
async function buscarUsuarioParaLogin(email) {
  const query = `
    SELECT * FROM USUARIOS_SG
    WHERE (gmail1_sg = ? OR gmail2_sg = ? OR gmail3_sg = ?)
      AND estado_usuario_sg = 1
      AND rol_sg <> 'SUPERADMIN'
  `;
  const [rows] = await pool.query(query, [email, email, email]);
  return rows[0] || null;
}

/**
 * Genera un código de 6 dígitos, lo hashea y lo guarda como token de recuperación.
 */
async function guardarTokenRecuperacion(usuarioId, gmail) {
  const codigo = Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
  const tokenHash = await bcrypt.hash(codigo, 10);
  const expiraEn = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

  await pool.query(
    'INSERT INTO RECUPERACION_CONTRASENA (id_usuario, gmail_usuario, token_hash, expira_en) VALUES (?, ?, ?, ?)',
    [usuarioId, gmail, tokenHash, expiraEn]
  );

  return codigo;
}

/**
 * ///3.- FUNCIONES PARA MANEJO DE CIERRE DE SESIONES (logout)///
 * Obtiene el usuario_id a partir de una cookie de sesión.
 * Devuelve null si la cookie no existe.
 *
 * 🔒 Seguridad: el usuario_id SIEMPRE sale de la BD, nunca del cliente.
 */
async function obtenerUsuarioIdPorCookie(cookieSesion) {
  const [rows] = await pool.query(
    'SELECT usuario_id FROM SESIONES WHERE cookie_sesion = ?',
    [cookieSesion]
  );
  return rows[0]?.usuario_id || null;
}

/**
 * Elimina TODAS las sesiones activas de un usuario (logout global).
 * Incluye la sesión actual desde la cual se está haciendo logout.
 */
async function eliminarSesionesDeUsuario(usuarioId) {
  const [result] = await pool.query(
    'DELETE FROM SESIONES WHERE usuario_id = ?',
    [usuarioId]
  );
  return result.affectedRows;
}

/**
 * Elimina todas las sesiones expiradas de la tabla (cualquier usuario).
 */
async function limpiarSesionesExpiradas() {
  const [result] = await pool.query(
    'DELETE FROM SESIONES WHERE expires_sesion < NOW()'
  );
  return result.affectedRows;
}

/*
///3.- FIN///
*/

/**
 * Obtiene ÚNICAMENTE el rol de la sesión activa directamente de la tabla SESIONES.
 * @param {string} cookieSesion - El token de la cookie.
 * @returns {object|null} - Objeto con { rol } o null si expiró.
 */
async function obtenerRolDeSesion(cookieSesion) {
  const query = `
    SELECT rol_sesion AS rol
    FROM SESIONES 
    WHERE cookie_sesion = ? 
      AND expires_sesion > NOW()
  `;
  const [rows] = await pool.query(query, [cookieSesion]);
  
  return rows[0] || null;
}

// No olvides exportarla:
module.exports = {
  buscarUsuarioParaLogin,
  guardarTokenRecuperacion,
  obtenerUsuarioIdPorCookie,
  eliminarSesionesDeUsuario,
  limpiarSesionesExpiradas,
  obtenerRolDeSesion // 👈 Nueva función
};