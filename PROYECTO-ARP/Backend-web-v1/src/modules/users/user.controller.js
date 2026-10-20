/**
 * Módulo: users - user.controller.js
 * Descripción: Controladores para gestión de usuarios, perfil propio (MIS DATOS), y GMAIL DE RECUPERACIÓN.
 */
const pool = require('../../config/db');
const bcrypt = require('bcrypt');
const {
  obtenerMisDatos,
  actualizarMisDatos,
  obtenerGmailsRecuperacion,
  actualizarGmailsRecuperacion
} = require('./user.service');
const {
  sanitizeLettersOnly,
  sanitizeNumbersOnly,
  sanitizeAlphanumericNoSpaces,
  sanitizePhone,
  sanitizeBloodType
} = require('../../utils/normalize');

// VER MIS DATOS
async function verMisDatos(req, res) {
  const usuarioId = req.usuario.id;
  const datos = await obtenerMisDatos(usuarioId);
  if (!datos) return res.status(404).json({ error: 'Usuario no encontrado.' });
  return res.json(datos);
}

// ACTUALIZAR MIS DATOS
async function editarMisDatos(req, res) {
  const usuarioId = req.usuario.id;
  const {
    nombre1, nombre2, apellido1, apellido2,
    carnetIdentidad, complemento, numeroCelular,
    direccion, fechaNacimiento, grupoSanguineo
  } = req.body;

  // Sanitización de datos
  const datosSanitizados = {
    nombre1: sanitizeLettersOnly(nombre1),
    nombre2: sanitizeLettersOnly(nombre2),
    apellido1: sanitizeLettersOnly(apellido1),
    apellido2: sanitizeLettersOnly(apellido2),
    carnetIdentidad: sanitizeNumbersOnly(carnetIdentidad),
    complemento: sanitizeAlphanumericNoSpaces(complemento),
    numeroCelular: sanitizePhone(numeroCelular),
    direccion: direccion ? direccion.trim() : '',
    fechaNacimiento: fechaNacimiento || null,
    grupoSanguineo: sanitizeBloodType(grupoSanguineo)
  };

  if (!datosSanitizados.nombre1 || !datosSanitizados.apellido1 || !datosSanitizados.carnetIdentidad || !datosSanitizados.numeroCelular) {
    return res.status(400).json({ error: 'Campos obligatorios incompletos tras la sanitización.' });
  }

  const actualizado = await actualizarMisDatos(usuarioId, datosSanitizados);
  if (!actualizado) return res.status(404).json({ error: 'No se pudo actualizar los datos.' });

  return res.json({ mensaje: 'Datos actualizados correctamente.' });
}

// VER GMAILS DE RECUPERACIÓN
async function verGmails(req, res) {
  const usuarioId = req.usuario.id;
  const gmails = await obtenerGmailsRecuperacion(usuarioId);
  if (!gmails) return res.status(404).json({ error: 'No encontrado.' });
  return res.json(gmails);
}

// ACTUALIZAR GMAILS DE RECUPERACIÓN
async function editarGmails(req, res) {
  const usuarioId = req.usuario.id;
  const { email1, email2, email3 } = req.body;

  const actualizado = await actualizarGmailsRecuperacion(usuarioId, email1, email2, email3);
  if (!actualizado) return res.status(404).json({ error: 'No se pudieron actualizar los gmails.' });

  return res.json({ mensaje: 'Gmails de recuperación actualizados.' });
}

// CREAR USUARIO (Admin / Superadmin)
async function crearUsuario(req, res) {
  const {
    nombre1, nombre2, apellido1, apellido2,
    gmailUsuario, rol, carnetIdentidad, complemento,
    numeroCelular, direccion, fechaNacimiento, grupoSanguineo, contrasena
  } = req.body;

  const hash = await bcrypt.hash(contrasena, 10);
  const estado = req.body.estado !== undefined ? req.body.estado : true;

  const query = `
    INSERT INTO USUARIOS_SG (
      primer_nombre_sg, segundo_nombre_sg, primer_apellido_sg, segundo_apellido_sg,
      rol_sg, carneti_sg, complementoci_sg, numero_celular_sg, direccion_sg,
      fecha_nac_sg, grupo_sang_sg, contrasena_usuario_sg, gmail1_sg, estado_usuario_sg
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // ⚠️ CORRECCIÓN: Usamos ?? '' para que al crear se guarden vacíos si no hay datos,
  // ya que en el INSERT sí queremos que todos los campos tengan un valor inicial.
  const [result] = await pool.query(query, [
    sanitizeLettersOnly(nombre1) ?? '', 
    sanitizeLettersOnly(nombre2) ?? '',
    sanitizeLettersOnly(apellido1) ?? '', 
    sanitizeLettersOnly(apellido2) ?? '',
    rol, 
    sanitizeNumbersOnly(carnetIdentidad) ?? '', 
    sanitizeAlphanumericNoSpaces(complemento) ?? '',
    sanitizePhone(numeroCelular) ?? '', 
    direccion ?? '', 
    fechaNacimiento || null,
    sanitizeBloodType(grupoSanguineo) ?? '', 
    hash, 
    gmailUsuario.toLowerCase(), 
    estado
  ]);

  return res.status(201).json({ mensaje: 'Usuario creado exitosamente', id: result.insertId });
}

// LISTAR USUARIOS (excluyendo SUPERADMIN según directriz)
async function listarUsuarios(req, res) {
  const query = `
    SELECT id_usuario_sg, primer_nombre_sg, segundo_nombre_sg, primer_apellido_sg, segundo_apellido_sg,
           gmail1_sg, rol_sg, estado_usuario_sg
    FROM USUARIOS_SG
    WHERE rol_sg <> 'SUPERADMIN'
  `;
  const [rows] = await pool.query(query);
  return res.json(rows);
}


// BUSCAR USUARIO POR NOMBRE (Dinámico y exacto)
async function buscarUsuarioPorNombre(req, res) {
  const { n1, n2, a1, a2 } = req.query;

  // 1. Empezamos con la condición base (excluir SUPERADMIN)
  let query = `
    SELECT id_usuario_sg, primer_nombre_sg, segundo_nombre_sg, primer_apellido_sg, segundo_apellido_sg,
           gmail1_sg, rol_sg, estado_usuario_sg, carneti_sg, complementoci_sg, numero_celular_sg,
           direccion_sg, fecha_nac_sg, grupo_sang_sg
    FROM USUARIOS_SG
    WHERE rol_sg <> 'SUPERADMIN'
  `;

  // 2. Array para guardar los valores que reemplazarán a los "?"
  const params = [];

  // 3. Agregamos condiciones SOLO si el campo no está vacío
  if (n1 && n1.trim() !== '') {
    query += ` AND primer_nombre_sg = ?`; // Coincidencia exacta
    params.push(n1.trim());
  }
  if (n2 && n2.trim() !== '') {
    query += ` AND segundo_nombre_sg = ?`;
    params.push(n2.trim());
  }
  if (a1 && a1.trim() !== '') {
    query += ` AND primer_apellido_sg = ?`;
    params.push(a1.trim());
  }
  if (a2 && a2.trim() !== '') {
    query += ` AND segundo_apellido_sg = ?`;
    params.push(a2.trim());
  }

  // 4. Ejecutamos la consulta (si no se llenó ningún campo, traerá a todos los no-SUPERADMIN)
  const [rows] = await pool.query(query, params);
  
  return res.json(rows);
}

// ACTUALIZAR USUARIO POR ID (ADMIN)
async function actualizarUsuarioPorAdmin(req, res) {
  const { id } = req.params;
  const {
    nombre1, nombre2, apellido1, apellido2,
    gmailUsuario, rol, carnetIdentidad, complemento,
    numeroCelular, direccion, fechaNacimiento, grupoSanguineo, estado
  } = req.body;

  // ⚠️ CORRECCIÓN CRÍTICA: Usamos COALESCE para mantener el valor anterior si llega null.
  // Si llega un string vacío "" (borrado intencional), COALESCE lo reemplaza porque "" no es null.
  const query = `
    UPDATE USUARIOS_SG
    SET primer_nombre_sg = COALESCE(?, primer_nombre_sg), 
        segundo_nombre_sg = COALESCE(?, segundo_nombre_sg), 
        primer_apellido_sg = COALESCE(?, primer_apellido_sg), 
        segundo_apellido_sg = COALESCE(?, segundo_apellido_sg),
        gmail1_sg = COALESCE(?, gmail1_sg), 
        rol_sg = COALESCE(?, rol_sg), 
        carneti_sg = COALESCE(?, carneti_sg), 
        complementoci_sg = COALESCE(?, complementoci_sg), 
        numero_celular_sg = COALESCE(?, numero_celular_sg),
        direccion_sg = COALESCE(?, direccion_sg), 
        fecha_nac_sg = COALESCE(?, fecha_nac_sg), 
        grupo_sang_sg = COALESCE(?, grupo_sang_sg), 
        estado_usuario_sg = COALESCE(?, estado_usuario_sg)
    WHERE id_usuario_sg = ? AND rol_sg <> 'SUPERADMIN'
  `;

  const [result] = await pool.query(query, [
    sanitizeLettersOnly(nombre1), 
    sanitizeLettersOnly(nombre2),
    sanitizeLettersOnly(apellido1), 
    sanitizeLettersOnly(apellido2),
    gmailUsuario ? gmailUsuario.toLowerCase() : null, 
    rol, 
    sanitizeNumbersOnly(carnetIdentidad), 
    sanitizeAlphanumericNoSpaces(complemento),
    sanitizePhone(numeroCelular), 
    direccion, 
    fechaNacimiento || null,
    sanitizeBloodType(grupoSanguineo), 
    estado, 
    id
  ]);

  if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado o protegido.' });
  return res.json({ mensaje: 'Usuario actualizado correctamente.' });
}

module.exports = {
  verMisDatos,
  editarMisDatos,
  verGmails,
  editarGmails,
  crearUsuario,
  listarUsuarios,
  buscarUsuarioPorNombre,
  actualizarUsuarioPorAdmin
};