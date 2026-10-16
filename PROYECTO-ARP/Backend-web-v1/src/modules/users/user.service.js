/**
 * Módulo: users - user.service.js
 * Descripción: Consultas y lógica de base de datos para gestión de usuarios, perfiles y gmails de recuperación.
 */
const pool = require('../../config/db');

async function obtenerMisDatos(usuarioId) {
  const query = `
    SELECT id_usuario_sg, primer_nombre_sg, segundo_nombre_sg, primer_apellido_sg, segundo_apellido_sg,
           carneti_sg, complementoci_sg, numero_celular_sg, direccion_sg, fecha_nac_sg, grupo_sang_sg, rol_sg, gmail1_sg
    FROM USUARIOS_SG
    WHERE id_usuario_sg = ? AND rol_sg <> 'SUPERADMIN'
  `;
  const [rows] = await pool.query(query, [usuarioId]);
  return rows[0] || null;
}

async function actualizarMisDatos(usuarioId, datos) {
  const query = `
    UPDATE USUARIOS_SG
    SET primer_nombre_sg = ?, segundo_nombre_sg = ?, primer_apellido_sg = ?, segundo_apellido_sg = ?,
        carneti_sg = ?, complementoci_sg = ?, numero_celular_sg = ?, direccion_sg = ?, fecha_nac_sg = ?, grupo_sang_sg = ?
    WHERE id_usuario_sg = ? AND rol_sg <> 'SUPERADMIN'
  `;
  const [result] = await pool.query(query, [
    datos.nombre1, datos.nombre2, datos.apellido1, datos.apellido2,
    datos.carnetIdentidad, datos.complemento, datos.numeroCelular, datos.direccion,
    datos.fechaNacimiento, datos.grupoSanguineo, usuarioId
  ]);
  return result.affectedRows > 0;
}

async function obtenerGmailsRecuperacion(usuarioId) {
  const [rows] = await pool.query(
    'SELECT gmail1_sg, gmail2_sg, gmail3_sg FROM USUARIOS_SG WHERE id_usuario_sg = ? AND rol_sg <> ?',
    [usuarioId, 'SUPERADMIN']
  );
  return rows[0] || null;
}

async function actualizarGmailsRecuperacion(usuarioId, email1, email2, email3) {
  const query = `
    UPDATE USUARIOS_SG
    SET gmail1_sg = ?, gmail2_sg = ?, gmail3_sg = ?
    WHERE id_usuario_sg = ? AND rol_sg <> 'SUPERADMIN'
  `;
  const [result] = await pool.query(query, [email1, email2 || null, email3 || null, usuarioId]);
  return result.affectedRows > 0;
}

module.exports = {
  obtenerMisDatos,
  actualizarMisDatos,
  obtenerGmailsRecuperacion,
  actualizarGmailsRecuperacion
};
