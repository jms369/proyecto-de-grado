/**
 * Módulo: auth - auth.controller.js
 * Descripción: Controladores para LOGIN, RECUPERACIÓN DE CONTRASEÑA, CERRAR SESIÓN y Rate Limiting.
 */
const pool = require('../../config/db');
const bcrypt = require('bcrypt');
const { crearSesion, eliminarSesion } = require('../../config/sessionStore');
const { buscarUsuarioParaLogin, guardarTokenRecuperacion } = require('./auth.service');
const { registrarIntentoFallido, limpiarIntentos } = require('../../middleware/rateLimiters');
const { enviarCorreoRecuperacion } = require('../../services/mailer');

// LOGIN
async function login(req, res) {
  const { email, password } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

  const usuario = await buscarUsuarioParaLogin(email);
  if (!usuario) {
    await registrarIntentoFallido(email, ip);
    return res.status(401).json({ error: 'Credenciales inválidas o usuario inhabilitado.' });
  }

  const match = await bcrypt.compare(password, usuario.contrasena_usuario_sg);
  if (!match) {
    await registrarIntentoFallido(email, ip);
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  // Limpiar intentos fallidos tras login exitoso
  await limpiarIntentos(email, ip);

  // Registrar sesión en SESIONES
  const sesionData = await crearSesion(usuario.id_usuario_sg, email, usuario.rol_sg, {
    nombre: usuario.primer_nombre_sg,
    apellido: usuario.primer_apellido_sg
  });

   // 👇👇👇 AQUÍ VA LA CONFIGURACIÓN DE LA COOKIE 👇👇👇
  res.cookie('cookie_sesion', sesionData.cookieSesion, {
    httpOnly: true,     // JS del navegador no puede leerla (protege contra XSS)
    sameSite: 'lax', // protege contra CSRF manteniendo navegación normal
    //secure: process.env.NODE_ENV === 'development' ? false : true, // ⚠️ true SOLO en producción con HTTPS
    secure: false,      // ⚠️ true SOLO en producción con HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 24h — debe coincidir con expires_sesion del sessionStore
    path: '/',
  });
  // 👆👆👆 FIN DE LA CONFIGURACIÓN 👆👆👆

  return res.json({
    mensaje: 'Login exitoso',
    
    data_sesion: sesionData.dataSesion,
    rol: sesionData.rolSesion
  });
}

// CERRAR SESIÓN (Logout)
async function logout(req, res) {
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, c) => {
      const [k, v] = c.trim().split('=');
      acc[k] = v;
      return acc;
    }, {});
    if (cookies.cookie_sesion) {
      await eliminarSesion(cookies.cookie_sesion);
    }
  }
  return res.json({ mensaje: 'Sesión cerrada exitosamente' });
}

// SOLICITAR RECUPERACIÓN (Paso 1: Ingresar Gmail)
async function solicitarRecuperacion(req, res) {
  const { email } = req.body;
  const [rows] = await pool.query(
    'SELECT * FROM USUARIOS_SG WHERE (gmail1_sg = ? OR gmail2_sg = ? OR gmail3_sg = ?) AND estado_usuario_sg = 1 AND rol_sg <> ?',
    [email, email, email, 'SUPERADMIN']
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Correo no registrado o usuario inhabilitado.' });
  }

  const usuario = rows[0];
  const codigo = await guardarTokenRecuperacion(usuario.id_usuario_sg, email);
  await enviarCorreoRecuperacion(email, codigo);

  return res.json({ mensaje: 'Código de recuperación enviado a su correo electrónico.' });
}

// VERIFICAR CÓDIGO (Paso 2: Comparar token_hash)
async function verificarCodigo(req, res) {
  const { email, verificationCode } = req.body;
  const [rows] = await pool.query(
    'SELECT * FROM RECUPERACION_CONTRASENA WHERE gmail_usuario = ? AND usado_en IS NULL AND expira_en > NOW() ORDER BY creado_en DESC LIMIT 1',
    [email]
  );

  if (rows.length === 0) {
    return res.status(400).json({ error: 'Código expirado o inválido.' });
  }

  const rec = rows[0];
  const match = await bcrypt.compare(verificationCode, rec.token_hash);
  if (!match) {
    return res.status(400).json({ error: 'Código incorrecto.' });
  }

  return res.json({
    mensaje: 'Código verificado correctamente.',
    gmail_usuario: rec.gmail_usuario
  });
}

// RESTABLECER CONTRASEÑA (Paso 3)
async function reestablecerContrasena(req, res) {
  const { gmail_usuario, nuevaContrasena } = req.body;
  const hash = await bcrypt.hash(nuevaContrasena, 10);

  const query = `
    UPDATE USUARIOS_SG 
    SET contrasena_usuario_sg = ? 
    WHERE gmail1_sg = ? OR gmail2_sg = ? OR gmail3_sg = ?
  `;
  const [result] = await pool.query(query, [hash, gmail_usuario, gmail_usuario, gmail_usuario]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Usuario no encontrado para actualización.' });
  }

  // Marcar tokens como usados
  await pool.query('UPDATE RECUPERACION_CONTRASENA SET usado_en = NOW() WHERE gmail_usuario = ?', [gmail_usuario]);

  return res.json({ mensaje: 'Contraseña restablecida exitosamente.' });
}

module.exports = {
  login,
  logout,
  solicitarRecuperacion,
  verificarCodigo,
  reestablecerContrasena
};
