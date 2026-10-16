/**
 * Archivo: src/middleware/rateLimiters.js
 * Descripción: Limitador de intentos de login y control de bloqueos en INTENTOS_LOGIN.
 */
const pool = require('../config/db');

async function loginRateLimiter(req, res, next) {
  const { email } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

  if (!email) {
    return next();
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM INTENTOS_LOGIN WHERE intento_usuario = ? AND ip_usuario = ?',
      [email, ip]
    );

    if (rows.length > 0) {
      const intento = rows[0];
      if (intento.bloqueado_hasta && new Date(intento.bloqueado_hasta) > new Date()) {
        return res.status(429).json({
          error: 'Demasiados intentos fallidos. Usuario temporalmente bloqueado.',
          bloqueadoHasta: intento.bloqueado_hasta
        });
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function registrarIntentoFallido(email, ip) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM INTENTOS_LOGIN WHERE intento_usuario = ? AND ip_usuario = ?',
      [email, ip]
    );

    if (rows.length === 0) {
      await pool.query(
        'INSERT INTO INTENTOS_LOGIN (intento_usuario, ip_usuario, intentos_fallidos) VALUES (?, ?, 1)',
        [email, ip]
      );
    } else {
      const fallidos = rows[0].intentos_fallidos + 1;
      let bloqueadoHasta = null;

      if (fallidos >= 11) {
        // Bloquear por 15 minutos
        bloqueadoHasta = new Date(Date.now() + 15 * 60 * 1000);
      }

      await pool.query(
        'UPDATE INTENTOS_LOGIN SET intentos_fallidos = ?, bloqueado_hasta = ? WHERE intento_usuario = ? AND ip_usuario = ?',
        [fallidos, bloqueadoHasta, email, ip]
      );
    }
  } catch (error) {
    console.error('Error registrando intento fallido:', error);
  }
}

async function limpiarIntentos(email, ip) {
  try {
    await pool.query(
      'DELETE FROM INTENTOS_LOGIN WHERE intento_usuario = ? AND ip_usuario = ?',
      [email, ip]
    );
  } catch (error) {
    console.error('Error limpiando intentos:', error);
  }
}

module.exports = {
  loginRateLimiter,
  registrarIntentoFallido,
  limpiarIntentos
};
