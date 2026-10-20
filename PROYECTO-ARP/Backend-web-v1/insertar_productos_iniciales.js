/**
 * Archivo: insertar_productos_iniciales.js
 * Descripción: Script para insertar 10 productos de prueba en la tabla PRODUCTOS_CELULAR.
 * Nota: No se inserta nada en el campo url_imagen.
 * Uso: node insertar_productos_iniciales.js
 */

const pool = require('./src/config/db'); // Ajusta la ruta si es necesario

const productos = [
  // --- GAMA ALTA (3) ---
  {
    marca_celular: 'Xiaomi',
    modelo_celular: '14 Ultra',
    precio_celular: 8999,
    procesador_celular: 'Snapdragon 8 Gen 3',
    almacenamiento_celular: 512,
    ram_celular: 16,
    bateria_celular: 5300,
    puntuacion_celular: 2200000,
    cam_principal_cel: 50,
    carga_rapida_cel: 90,
    cam_frontal_cel: 32,
    tasa_refresco_cel: 120,
    mas_info_celular: 'Gama alta. Fotografía profesional con lente Leica.'
  },
  {
    marca_celular: 'Apple',
    modelo_celular: 'iPhone 15 Pro Max',
    precio_celular: 11500,
    procesador_celular: 'A17 Pro',
    almacenamiento_celular: 256,
    ram_celular: 8,
    bateria_celular: 4441,
    puntuacion_celular: 1800000,
    cam_principal_cel: 48,
    carga_rapida_cel: 27,
    cam_frontal_cel: 12,
    tasa_refresco_cel: 120,
    mas_info_celular: 'Gama alta. Titanio y ecosistema Apple.'
  },
  {
    marca_celular: 'OnePlus',
    modelo_celular: '12',
    precio_celular: 6500,
    procesador_celular: 'Snapdragon 8 Gen 3',
    almacenamiento_celular: 256,
    ram_celular: 12,
    bateria_celular: 5400,
    puntuacion_celular: 2100000,
    cam_principal_cel: 50,
    carga_rapida_cel: 100,
    cam_frontal_cel: 32,
    tasa_refresco_cel: 120,
    mas_info_celular: 'Gama alta. Carga rápida y pantalla fluida.'
  },

  // --- GAMA MEDIA (4) ---
  {
    marca_celular: 'Xiaomi',
    modelo_celular: 'Redmi Note 15 Pro',
    precio_celular: 3529, 
    procesador_celular: 'MediaTek Dimensity 8300',
    almacenamiento_celular: 256,
    ram_celular: 8,
    bateria_celular: 5100,
    puntuacion_celular: 850000,
    cam_principal_cel: 50,
    carga_rapida_cel: 67,
    cam_frontal_cel: 20,
    tasa_refresco_cel: 120,
    mas_info_celular: 'Gama media. Equilibrio entre precio y rendimiento.'
  },
  {
    marca_celular: 'Samsung',
    modelo_celular: 'Galaxy A56',
    precio_celular: 3640, 
    procesador_celular: 'Exynos 1580',
    almacenamiento_celular: 256,
    ram_celular: 8,
    bateria_celular: 5000,
    puntuacion_celular: 650000,
    cam_principal_cel: 50,
    carga_rapida_cel: 45,
    cam_frontal_cel: 12,
    tasa_refresco_cel: 120,
    mas_info_celular: 'Gama media. Buena pantalla y actualizaciones.'
  },
  {
    marca_celular: 'Motorola',
    modelo_celular: 'Edge 50 Fusion',
    precio_celular: 1880, 
    procesador_celular: 'Snapdragon 7s Gen 2',
    almacenamiento_celular: 256,
    ram_celular: 8,
    bateria_celular: 5000,
    puntuacion_celular: 600000,
    cam_principal_cel: 50,
    carga_rapida_cel: 68,
    cam_frontal_cel: 32,
    tasa_refresco_cel: 144,
    mas_info_celular: 'Gama media. Diseño atractivo y buena carga rápida.'
  },
  {
    marca_celular: 'Honor',
    modelo_celular: 'X9b',
    precio_celular: 2100, 
    procesador_celular: 'Snapdragon 6 Gen 1',
    almacenamiento_celular: 256,
    ram_celular: 8,
    bateria_celular: 5800,
    puntuacion_celular: 550000,
    cam_principal_cel: 108,
    carga_rapida_cel: 35,
    cam_frontal_cel: 16,
    tasa_refresco_cel: 120,
    mas_info_celular: 'Gama media. Gran batería y cámara de alta resolución.'
  },

  // --- GAMA MEDIA BAJA (3) ---
  {
    marca_celular: 'Xiaomi',
    modelo_celular: 'Redmi 14C',
    precio_celular: 1294, 
    procesador_celular: 'MediaTek Helio G81',
    almacenamiento_celular: 128,
    ram_celular: 4,
    bateria_celular: 5160,
    puntuacion_celular: 280000,
    cam_principal_cel: 50,
    carga_rapida_cel: 18,
    cam_frontal_cel: 13,
    tasa_refresco_cel: 120,
    mas_info_celular: 'Gama media baja. Económico para uso diario.'
  },
  {
    marca_celular: 'Samsung',
    modelo_celular: 'Galaxy A16',
    precio_celular: 2699, 
    procesador_celular: 'MediaTek Helio G99',
    almacenamiento_celular: 128,
    ram_celular: 6,
    bateria_celular: 5000,
    puntuacion_celular: 350000,
    cam_principal_cel: 50,
    carga_rapida_cel: 25,
    cam_frontal_cel: 13,
    tasa_refresco_cel: 90,
    mas_info_celular: 'Gama media baja. Marca confiable a bajo precio.'
  },
  {
    marca_celular: 'Motorola',
    modelo_celular: 'Moto G24',
    precio_celular: 1100, 
    procesador_celular: 'MediaTek Helio G85',
    almacenamiento_celular: 128,
    ram_celular: 4,
    bateria_celular: 5000,
    puntuacion_celular: 250000,
    cam_principal_cel: 50,
    carga_rapida_cel: 15,
    cam_frontal_cel: 8,
    tasa_refresco_cel: 90,
    mas_info_celular: 'Gama media baja. Opción básica y funcional.'
  }
];

async function insertarProductos() {
  console.log("🔄 Iniciando inserción de productos (sin url_imagen)...");

  try {
    for (const prod of productos) {
      const query = `
        INSERT INTO PRODUCTOS_CELULAR (
          marca_celular, modelo_celular, precio_celular,
          procesador_celular, almacenamiento_celular, ram_celular, bateria_celular,
          puntuacion_celular, cam_principal_cel, carga_rapida_cel, cam_frontal_cel,
          tasa_refresco_cel, mas_info_celular
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await pool.query(query, [
        prod.marca_celular,
        prod.modelo_celular,
        prod.precio_celular,
        prod.procesador_celular,
        prod.almacenamiento_celular,
        prod.ram_celular,
        prod.bateria_celular,
        prod.puntuacion_celular,
        prod.cam_principal_cel,
        prod.carga_rapida_cel,
        prod.cam_frontal_cel,
        prod.tasa_refresco_cel,
        prod.mas_info_celular
      ]);
      
      console.log(`✅ Insertado: ${prod.marca_celular} ${prod.modelo_celular} - Bs. ${prod.precio_celular}`);
    }

    console.log("🚀 Todos los productos fueron insertados correctamente.");

  } catch (error) {
    console.error("❌ Error al insertar productos:", error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

insertarProductos();