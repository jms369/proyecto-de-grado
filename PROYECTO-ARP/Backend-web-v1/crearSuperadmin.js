/**
 * Archivo: crearSuperadmin.js
 * Descripción: Script para insertar el primer usuario SUPERADMIN con la contraseña cifrada mediante bcrypt.
 */
require('dotenv').config();
const pool = require('./src/config/db');
const bcrypt = require('bcrypt');

async function registrarSuperadmin() {
  try {
    const passwordPlana = 'JoseMichaelSanchezFlores2026';
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
      'admin',                      // primer_nombre_sg
      null,                         // segundo_nombre_sg
      'ADMIN',                      // primer_apellido_sg
      null,                         // segundo_apellido_sg
      'SUPERADMIN',                 // rol_sg
      '7777777',                    // carneti_sg
      null,                         // complementoci_sg
      null,                         // numero_celular_sg
      null,                         // direccion_sg
      null,                         // fecha_nac_sg
      null,                         // grupo_sang_sg
      hashedPassword,               // contrasena_usuario_sg (cifrada con bcrypt)
      'meolvide123698741@gmail.com',// gmail1_sg
      null,                         // gmail2_sg
      null                          // gmail3_sg
    ];

    const [result] = await pool.query(query, values);
    console.log('✅ ¡Usuario SUPERADMIN creado exitosamente con ID:', result.insertId, '!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear el usuario SUPERADMIN:', error.message);
    process.exit(1);
  }
}

registrarSuperadmin();