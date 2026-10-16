/**
 * Módulo: auth - auth.service.js
 * Descripción: Lógica de negocio para autenticación, búsqueda de usuarios activos y manejo de tokens de recuperación.
 */
const pool = require('../../config/db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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

module.exports = {
  buscarUsuarioParaLogin,
  guardarTokenRecuperacion
};
