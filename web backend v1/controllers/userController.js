// Aquí irá la lógica de usuarios (login, reseteo, etc.)
// Por ahora dejamos la estructura vacía

exports.testController = (req, res) => {
  res.json({ mensaje: "Controlador funcionando correctamente" });
};


const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { enviarCodigo } = require("../services/emailService"); //  NUEVO
const crypto = require("crypto"); //  NUEVO


// LOGIN
exports.login = async (req, res) => {
  try {
    const { correo_gmail, contrasena_admin } = req.body;

    // Validar que ambos campos existan
    if (!correo_gmail || !contrasena_admin) {
      return res.status(400).json({ error: "Faltan datos de inicio de sesión." });
    }

    db.query("SELECT * FROM UsuarioAdmin WHERE correo_gmail = ?", [correo_gmail], async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error en el servidor." });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Correo no registrado." });
      }

      const usuario = results[0];

      // Verificar que exista la contraseña en la base de datos
      if (!usuario.contrasena_admin) {
        return res.status(500).json({ error: "Contraseña no encontrada en la base de datos." });
      }

      // Comparar contraseñas
      const match = await bcrypt.compare(contrasena_admin, usuario.contrasena_admin);

      if (!match) {
        return res.status(401).json({ error: "Contraseña incorrecta." });
      }

      // 🔑 Generar token JWT (MODIFICACIÓN AQUÍ)
      const token = jwt.sign(
        { id: usuario.id_usuario, correo: usuario.correo_gmail },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // 🔧 MODIFICACIÓN: desde aquí
      res.json({ login: true, mensaje: "Login exitoso", token });
      // 🔧 MODIFICACIÓN: hasta aquí

      // Respuesta final con token
      res.json({ mensaje: "Login exitoso", token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};


// VALIDAR GMAIL
exports.validarGmail = (req, res) => {
  const { correo_gmail } = req.body;

  if (!correo_gmail) {
    return res.status(400).json({ error: "Debe proporcionar un correo." });
  }

  db.query("SELECT correo_gmail FROM UsuarioAdmin WHERE correo_gmail = ?", [correo_gmail], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor." });
    if (results.length === 0) return res.status(404).json({ error: "Correo no encontrado." });

    // 🔑 Generar código aleatorio
    const codigo = crypto.randomBytes(3).toString("hex").toUpperCase();

    // Guardar el código en la BD
    db.query("UPDATE UsuarioAdmin SET codigo_reseteo = ? WHERE correo_gmail = ?", [codigo, correo_gmail]);

    // Enviar el código por correo
    enviarCodigo(correo_gmail, codigo);

    
    // 🔧 MODIFICACIÓN: desde aquí
    res.json({ existe: true, mensaje: "Correo válido, se envió el código de recuperación." });
    // 🔧 MODIFICACIÓN: hasta aquí
  });
};


// VALIDAR CÓDIGO
exports.validarCodigo = (req, res) => {
  const { codigo_reseteo } = req.body;

  // Validar que se envíe el código
  if (!codigo_reseteo) {
    return res.status(400).json({ error: "Debe proporcionar el código de reseteo." });
  }

  db.query(
    "SELECT correo_gmail FROM UsuarioAdmin WHERE codigo_reseteo = ?",
    [codigo_reseteo],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error en el servidor." });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: "Código inválido." });
      }

      // 🔑 Aquí devolvemos el correo asociado al código
      res.json({ valido: true, correo_gmail: results[0].correo_gmail });
    }
  );
};



// NUEVA CONTRASEÑA
exports.nuevaContrasena = async (req, res) => {
  const { correo_gmail, nueva_contrasena, confirmar_contrasena } = req.body;

  // Validar que se envíen todos los campos
  if (!correo_gmail || !nueva_contrasena || !confirmar_contrasena) {
    return res.status(400).json({ error: "Debe proporcionar correo y ambas contraseñas." });
  }

  // Verificar que ambas contraseñas coincidan
  if (nueva_contrasena !== confirmar_contrasena) {
    return res.status(400).json({ error: "Las contraseñas no coinciden." });
  }

  try {
    // Encriptar nueva contraseña
    const hash = await bcrypt.hash(nueva_contrasena, 10);

    // Actualizar en la base de datos y limpiar el código
    db.query(
      "UPDATE UsuarioAdmin SET contrasena_admin = ?, codigo_reseteo = NULL WHERE correo_gmail = ?",
      [hash, correo_gmail],
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Error en el servidor." });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuario no encontrado." });
        }

        // 🔧 MODIFICACIÓN: desde aquí
        res.json({ establecida: true, mensaje: "Contraseña actualizada correctamente." });
        // 🔧 MODIFICACIÓN: hasta aquí
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};




// 🧾 REGISTRO DE USUARIO ADMIN
exports.registro = async (req, res) => {
  try {
    const {
      primer_nombre,
      segundo_nombre,
      apellido_paterno,
      apellido_materno,
      sexo,
      numero_celular,
      carnet_identidad,
      complemento,
      direccion,
      fecha_nacimiento,
      correo_gmail,
      contrasena_admin
    } = req.body;

    // Validar campos obligatorios
    if (
      !primer_nombre ||
      !apellido_paterno ||
      !carnet_identidad ||
      !correo_gmail ||
      !contrasena_admin
    ) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(contrasena_admin, 10);

    // Insertar usuario en la base de datos
    const sql = `
      INSERT INTO UsuarioAdmin (
        primer_nombre, segundo_nombre, apellido_paterno, apellido_materno,
        sexo, numero_celular, carnet_identidad, complemento, direccion,
        fecha_nacimiento, correo_gmail, contrasena_admin
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        primer_nombre,
        segundo_nombre,
        apellido_paterno,
        apellido_materno,
        sexo,
        numero_celular,
        carnet_identidad,
        complemento,
        direccion,
        fecha_nacimiento,
        correo_gmail,
        hash
      ],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error al registrar usuario." });
        }
        // 🔧 MODIFICACIÓN: desde aquí
      res.json({ registrado: true, mensaje: "Usuario registrado correctamente." });
      // 🔧 MODIFICACIÓN: hasta aquí
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// LOGOUT
exports.logout = (req, res) => {
  try {
    // Aquí no hay mucho que hacer porque el JWT se maneja en el cliente.
    
    // 🔧 MODIFICACIÓN: desde aquí
    res.json({ logout: true, mensaje: "Sesión cerrada correctamente." });
    // 🔧 MODIFICACIÓN: hasta aquí
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cerrar sesión." });
  }
};

