const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Función para enviar el código de recuperación
exports.enviarCodigo = async (destinatario, codigo) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: destinatario,
      subject: "Código de recuperación de contraseña",
      text: `Tu código de recuperación es: ${codigo}`,
    });
    console.log("Correo enviado correctamente a:", destinatario);
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
};
