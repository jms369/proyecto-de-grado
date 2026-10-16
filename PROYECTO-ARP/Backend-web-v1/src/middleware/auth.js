/**
 * Archivo: src/middleware/auth.js
 * Descripción: Valida sesión vigente, estado del usuario y restricciones de rol (ADMINISTRADOR, SUPERADMIN, TRABAJADOR).
 */
const { obtenerSesionPorCookie } = require('../config/sessionStore');

function verificarAutenticacion(rolesPermitidos = []) {
  return async (req, res, next) => {
    try {
      // Extraer cookie de los headers o cookies
      const cookieHeader = req.headers.cookie;
      if (!cookieHeader) {
        return res.status(401).json({ error: 'No autorizado. Sesión no encontrada.' });
      }

      // Parsear cookie (ej: cookie_sesion=xxx)
      const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {});

      const tokenCookie = cookies.cookie_sesion || req.headers['x-session-token'];

      if (!tokenCookie) {
        return res.status(401).json({ error: 'Token de sesión requerido.' });
      }

      const sesion = await obtenerSesionPorCookie(tokenCookie);
      if (!sesion || sesion.estado_usuario_sg !== 1) {
        return res.status(401).json({ error: 'Sesión inválida, expirada o usuario inhabilitado.' });
      }

      // Validar roles
      const rolUsuario = sesion.rol_sg.toUpperCase();
      
      // SUPERADMIN y ADMINISTRADOR tienen acceso total
      if (rolUsuario !== 'SUPERADMIN' && rolUsuario !== 'ADMINISTRADOR') {
        if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(rolUsuario)) {
          return res.status(403).json({ error: 'Acceso prohibido para su rol.' });
        }
      }

      req.usuario = {
        id: sesion.usuario_id,
        gmail: sesion.gmail_sesion,
        rol: rolUsuario
      };

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = verificarAutenticacion;
