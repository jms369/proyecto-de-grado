/**
 * Archivo: crearTrabajador.js
 * Descripción: Script para insertar un usuario TRABAJADOR
 *              con la contraseña cifrada mediante bcrypt.
 */
require('dotenv').config();
const pool = require('./src/config/db');
const bcrypt = require('bcrypt'); // 👈 Usando bcrypt nativo

async function registrarTrabajador() {
  try {
    const passwordPlana = 'Trabajador123698741';
    const saltRounds = 10;

    // Hashear la contraseña exactamente como lo hace el backend
    const hashedPassword = await bcrypt.hash(passwordPlana, saltRounds);

    const query = `
      INSERT INTO USUARIOS_SG (
        primer_nombre_sg,
        segundo_nombre_sg,
        primer_apellido_sg,
        segundo_apellido_sg,
        rol_sg,
        carneti_sg,
        complementoci_sg,
        numero_celular_sg,
        direccion_sg,
        fecha_nac_sg,
        grupo_sang_sg,
        contrasena_usuario_sg,
        gmail1_sg,
        gmail2_sg,
        gmail3_sg,
        estado_usuario_sg
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `;

    const values = [
      'trabajador',                   // primer_nombre_sg
      null,                           // segundo_nombre_sg
      'TRABAJADOR',                   // primer_apellido_sg
      null,                           // segundo_apellido_sg
      'TRABAJADOR',                   // rol_sg  ← CAMBIADO
      '8888888',                      // carneti_sg (cambié el carnet para que no choque con el admin)
      null,                           // complementoci_sg
      null,                           // numero_celular_sg
      null,                           // direccion_sg
      null,                           // fecha_nac_sg
      null,                           // grupo_sang_sg
      hashedPassword,                 // contrasena_usuario_sg
      'trabajador@gmail.com',         // gmail1_sg  ← CAMBIADO
      null,                           // gmail2_sg
      null                            // gmail3_sg
    ];

    const [result] = await pool.query(query, values);
    console.log('✅ ¡Usuario TRABAJADOR creado exitosamente con ID:', result.insertId, '!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear el usuario TRABAJADOR:', error.message);
    process.exit(1);
  }
}

registrarTrabajador();