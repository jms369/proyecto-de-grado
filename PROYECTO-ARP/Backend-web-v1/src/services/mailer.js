/**
 * Archivo: src/services/mailer.js
 * Descripción: Servicio de envío de correos electrónicos con Nodemailer (para recuperación de contraseña).
 */
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

async function enviarCorreoRecuperacion(destinatario, codigo) {
  try {
    await transporter.sendMail({
      from: '"Cellphone Store" <noreply@cellphonestore.com>',
      to: destinatario,
      subject: 'Código de Recuperación de Contraseña',
      html: `
        <h2>Recuperación de Contraseña</h2>
        <p>Has solicitado restablecer tu contraseña. Tu código de verificación es:</p>
        <h1 style="color: #2563eb; letter-spacing: 2px;">${codigo}</h1>
        <p>Este código expirará en 15 minutos.</p>
      `
    });
    return true;
  } catch (error) {
    console.error('Error enviando correo:', error);
    return false;
  }
}

module.exports = {
  enviarCorreoRecuperacion
};
