/**
 * Módulo: auth - auth.controller.js
 * Descripción: Controladores para LOGIN, RECUPERACIÓN DE CONTRASEÑA, CERRAR SESIÓN y Rate Limiting.
 */
const pool = require('../../config/db');
const bcrypt = require('bcrypt'); //  bcrypt
const { crearSesion } = require('../../config/sessionStore');
const {
  buscarUsuarioParaLogin,
  guardarTokenRecuperacion,
  obtenerUsuarioIdPorCookie,   //  AHORA SÍ ESTÁ IMPORTADO
  eliminarSesionesDeUsuario,   //  AHORA SÍ ESTÁ IMPORTADO
  limpiarSesionesExpiradas, 
  obtenerRolDeSesion ,   //  AHORA SÍ ESTÁ IMPORTADO
} = require('./auth.service');
const { registrarIntentoFallido, limpiarIntentos } = require('../../middleware/rateLimiters');
const { enviarCorreoRecuperacion } = require('../../services/mailer');

const { validarContrasena, sanitizeEmailOrPassword } = require('../../utils/normalize');

// ============================================================
// LOGIN
// ============================================================
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

  await limpiarIntentos(email, ip);

  const sesionData = await crearSesion(usuario.id_usuario_sg, email, usuario.rol_sg, {
    nombre: usuario.primer_nombre_sg,
    apellido: usuario.primer_apellido_sg,
  });

  // Configuración de la cookie de sesión
  res.cookie('cookie_sesion', sesionData.cookieSesion, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // ⚠️ true SOLO en producción con HTTPS
    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
  });

  return res.json({
    mensaje: 'Login exitoso',
    data_sesion: sesionData.dataSesion,
    rol: sesionData.rolSesion,
  });
}

// ============================================================
// CERRAR SESIÓN (logout global — cierra TODAS las sesiones del usuario)
// ============================================================
async function logout(req, res) {
  try {
    // 1. Leer la cookie del header (nunca del body)
    const cookieSesion =
      req.cookies?.cookie_sesion ||
      parseCookieHeader(req.headers.cookie)?.cookie_sesion;

    let sesionesCerradas = 0;

    if (cookieSesion) {
      // 2. 🔒 Obtener usuario_id A PARTIR DE LA COOKIE (no del cliente)
      const usuarioId = await obtenerUsuarioIdPorCookie(cookieSesion);

      if (usuarioId) {
        // 3. Borrar TODAS las sesiones de ese usuario (incluye la actual)
        sesionesCerradas = await eliminarSesionesDeUsuario(usuarioId);
      }
    }

    // 4. Limpieza global de expiradas (mantenimiento)
    await limpiarSesionesExpiradas();

    // 5. Borrar la cookie del navegador
    res.clearCookie('cookie_sesion', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });

    return res.json({
      mensaje: 'Sesión cerrada en todos los dispositivos',
      sesiones_cerradas: sesionesCerradas,
    });
  } catch (error) {
    console.error('Error en logout:', error);

    res.clearCookie('cookie_sesion', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });

    return res.status(500).json({ error: 'Error al cerrar sesión.' });
  }
}

// Helper: parseo manual de cookies si no se usa cookie-parser
function parseCookieHeader(header) {
  if (!header) return {};
  return header.split(';').reduce((acc, c) => {
    const [k, v] = c.trim().split('=');
    if (k) acc[k] = v;
    return acc;
  }, {});
}

// ============================================================
// SOLICITAR RECUPERACIÓN (Paso 1)
// ============================================================
// En auth.controller.js
async function solicitarRecuperacion(req, res) {
  const { email } = req.body;
  const [rows] = await pool.query(
    'SELECT * FROM USUARIOS_SG WHERE (gmail1_sg = ? OR gmail2_sg = ? OR gmail3_sg = ?) AND estado_usuario_sg = 1',
    [email, email, email]
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Correo no registrado o usuario inhabilitado.' });
  }

  const usuario = rows[0];
  const codigo = await guardarTokenRecuperacion(usuario.id_usuario_sg, email);
  const enviado = await enviarCorreoRecuperacion(email, codigo);

  if (!enviado) {
    return res.status(500).json({ error: 'Error al enviar el correo. Intente más tarde.' });
  }

  return res.json({ mensaje: 'Código de recuperación enviado a su correo electrónico.' });
}

// ============================================================
// VERIFICAR CÓDIGO (Paso 2)
// ============================================================
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

  // 🚀 SOLUCIÓN: Ya no usamos fechas raras. Simplemente devolvemos el ID del registro al frontend.
  return res.json({
    mensaje: 'Código verificado correctamente.',
    id_recuperacion: rec.id_recuperacion, // 👈 Enviamos el ID
    gmail_usuario: rec.gmail_usuario,
  });
}

// ============================================================
// RESTABLECER CONTRASEÑA (Paso 3)
// ============================================================
async function reestablecerContrasena(req, res) {
  try {
    // 1. Recibimos el id_recuperacion y la nueva contraseña
    const { id_recuperacion, nuevaContrasena } = req.body;

    if (!id_recuperacion || !nuevaContrasena) {
      return res.status(400).json({ error: 'El ID de recuperación y la nueva contraseña son obligatorios.' });
    }

    const nuevaPassSanitizada = sanitizeEmailOrPassword(nuevaContrasena);

    // 2. Validar los requisitos de la contraseña
    if (!validarContrasena(nuevaPassSanitizada)) {
      return res.status(400).json({ 
        error: 'La contraseña requiere mín. 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.' 
      });
    }

    // 3. 🔒 Buscar el registro por su ID primario (que no ha expirado)
    const [rows] = await pool.query(
      "SELECT gmail_usuario FROM RECUPERACION_CONTRASENA WHERE id_recuperacion = ? AND expira_en > NOW()",
      [id_recuperacion]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: 'El token de recuperación es inválido o ya expiró.' });
    }

    const gmail_usuario = rows[0].gmail_usuario; // Extraemos el correo real de la BD

    // 4. Encriptar la nueva contraseña
    const hash = await bcrypt.hash(nuevaPassSanitizada, 10);

    // 5. Actualizar la contraseña en la tabla USUARIOS_SG
    const query = `
      UPDATE USUARIOS_SG
      SET contrasena_usuario_sg = ?
      WHERE gmail1_sg = ? OR gmail2_sg = ? OR gmail3_sg = ?
    `;
    const [result] = await pool.query(query, [
      hash,
      gmail_usuario,
      gmail_usuario,
      gmail_usuario,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado para actualización.' });
    }

    // 6. Borrar el registro de recuperación para que no se pueda volver a usar
    await pool.query(
      'DELETE FROM RECUPERACION_CONTRASENA WHERE id_recuperacion = ?',
      [id_recuperacion]
    );

    return res.json({ mensaje: 'Contraseña restablecida exitosamente.' });
    
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// ============================================================
// OBTENER DATOS DE LA SESIÓN ACTUAL (Para el Dashboard)
// ============================================================
async function obtenerMiSesion(req, res) {
  try {
    // 1. Obtener la cookie (usando cookie-parser o el fallback manual)
    const cookieSesion = 
      req.cookies?.cookie_sesion || 
      parseCookieHeader(req.headers.cookie)?.cookie_sesion;

    if (!cookieSesion) {
      return res.status(401).json({ error: 'No hay sesión activa.' });
    }

    // 2. Buscar la sesión en la base de datos
    // (Esta función ya la tienes en tu sessionStore.js)
    const { obtenerSesionPorCookie } = require('../../config/sessionStore');
    const sesion = await obtenerSesionPorCookie(cookieSesion);

    if (!sesion) {
      // La cookie existe en el navegador pero ya expiró o fue borrada de la BD
      res.clearCookie('cookie_sesion', { path: '/' });
      return res.status(401).json({ error: 'Sesión expirada o inválida.' });
    }

    // 3. Validar que el usuario no esté deshabilitado
    if (sesion.estado_usuario_sg !== 1) {
      return res.status(403).json({ error: 'Usuario inhabilitado.' });
    }

    // 4. Devolver los datos al frontend (¡Aquí enviamos el ROL!)
    return res.json({
      id_usuario: sesion.usuario_id,
      rol: sesion.rol_sesion,          // 👈 'ADMINISTRADOR', 'SUPERADMIN' o 'TRABAJADOR'
      nombre: sesion.primer_nombre_sg,
      gmail: sesion.gmail_sesion
    });

  } catch (error) {
    console.error('Error al obtener sesión:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// ============================================================
// OBTENER SOLO EL ROL (Para el Dashboard)
// ============================================================
async function obtenerMiRol(req, res) {
  try {
    const cookieSesion = 
      req.cookies?.cookie_sesion || 
      parseCookieHeader(req.headers.cookie)?.cookie_sesion;

    if (!cookieSesion) {
      return res.status(401).json({ error: 'No hay sesión activa.' });
    }

    // Consulta directa a SESIONES
    const sesion = await obtenerRolDeSesion(cookieSesion);

    if (!sesion) {
      // La cookie expiró o no existe en la BD
      res.clearCookie('cookie_sesion', { path: '/' });
      return res.status(401).json({ error: 'Sesión expirada o inválida.' });
    }

    // Devolvemos ÚNICAMENTE el rol al frontend
    return res.json({
      rol: sesion.rol
    });

  } catch (error) {
    console.error('Error al obtener rol:', error);
    return res.status(500).json({ error: 'Error interno.' });
  }
}



// Asegúrate de exportarla
module.exports = {
  login,
  logout,
  solicitarRecuperacion,
  verificarCodigo,
  reestablecerContrasena,
  obtenerMiSesion, // Agregar aquí
  obtenerMiRol
};


