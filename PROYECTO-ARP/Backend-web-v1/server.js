/**
 * Archivo: server.js
 * Descripción: Punto de entrada principal que arranca el servidor HTTP y escucha en el puerto configurado.
 */
require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    // Probar conexión a la base de datos
    const connection = await pool.getConnection();
    console.log('✅ Conexión exitosa a la base de datos CELLPHONE_STORE_DB');
    connection.release();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    process.exit(1);
  }
}

iniciarServidor();
