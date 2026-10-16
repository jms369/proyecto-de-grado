-- ============================================================
-- BASE DE DATOS: CELLPHONE_STORE_DB
-- ============================================================

CREATE DATABASE IF NOT EXISTS CELLPHONE_STORE_DB
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE CELLPHONE_STORE_DB;

-- ------------------------------------------------------------
-- 1. TABLA: USUARIOS_SG
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS USUARIOS_SG (
  id_usuario_sg INT AUTO_INCREMENT PRIMARY KEY,
  primer_nombre_sg VARCHAR(100) NOT NULL,
  segundo_nombre_sg VARCHAR(100) NULL,
  primer_apellido_sg VARCHAR(100) NOT NULL,
  segundo_apellido_sg VARCHAR(100) NULL,
  rol_sg VARCHAR(50) DEFAULT 'usuario',
  carneti_sg VARCHAR(20) NOT NULL,
  complementoci_sg VARCHAR(10) NULL,
  numero_celular_sg VARCHAR(20) NULL,
  direccion_sg VARCHAR(255) NULL,
  fecha_nac_sg DATE NULL,
  grupo_sang_sg VARCHAR(10) NULL,
  contrasena_usuario_sg VARCHAR(255) NOT NULL,
  gmail1_sg VARCHAR(150) NOT NULL UNIQUE,
  gmail2_sg VARCHAR(150) NULL UNIQUE,
  gmail3_sg VARCHAR(150) NULL UNIQUE,
  estado_usuario_sg TINYINT(1) DEFAULT 1,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- 2. TABLA: PRODUCTOS_CELULAR
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS PRODUCTOS_CELULAR (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  url_imagen VARCHAR(500) NULL,
  marca_celular VARCHAR(100) NULL,
  modelo_celular VARCHAR(100) NULL,
  precio_celular INT NULL,
  estado_celular TINYINT(1) DEFAULT 1,
  procesador_celular VARCHAR(100) NULL,
  almacenamiento_celular INT NULL, -- en GB
  ram_celular INT NULL,            -- en GB
  bateria_celular INT NULL,        -- en mAh
  puntuacion_celular INT NULL,
  pantalla_celular VARCHAR(100) NULL,
  cam_principal_cel INT NULL,      -- en MP
  certificacionip_celular TINYINT(1) DEFAULT 0,
  carga_rapida_cel INT NULL,       -- en Watts
  cam_frontal_cel INT NULL,        -- en MP
  tasa_refresco_cel INT NULL,      -- en Hz
  mas_info_celular TEXT NULL,
  registro_ac_gmail VARCHAR(150) NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- 3. TABLA: SITIO_WEB
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS SITIO_WEB (
  id_sitio INT AUTO_INCREMENT PRIMARY KEY,
  logo_url_sw VARCHAR(500) NULL,
  url_facebook_sw VARCHAR(500) NULL,
  url_instagram_sw VARCHAR(500) NULL,
  url_tiktok_sw VARCHAR(500) NULL,
  url_ubicacion_sw VARCHAR(500) NULL,
  num_whatsapp_sw VARCHAR(20) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- 4. TABLA: MAS_INFO_SITIO_WEB
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS MAS_INFO_SITIO_WEB (
  id_mas_info INT AUTO_INCREMENT PRIMARY KEY,
  mas_infoweb_sw TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- 5. TABLA: IMAGENES_OFERTAS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS IMAGENES_OFERTAS (
  id_oferta INT AUTO_INCREMENT PRIMARY KEY,
  url_oferta_sw VARCHAR(500) NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- 6. TABLA: RECUPERACION_CONTRASENA
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS RECUPERACION_CONTRASENA (
  id_recuperacion INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  gmail_usuario VARCHAR(150) NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expira_en TIMESTAMP NOT NULL,
  usado_en TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT fk_recuperacion_usuario 
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS_SG(id_usuario_sg) 
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- 7. TABLA: SESIONES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS SESIONES (
  id_sesion INT AUTO_INCREMENT PRIMARY KEY,
  cookie_sesion VARCHAR(255) NOT NULL UNIQUE,
  usuario_id INT NOT NULL,
  gmail_sesion VARCHAR(150) NOT NULL,
  rol_sesion VARCHAR(50) NOT NULL,
  expires_sesion TIMESTAMP NOT NULL,
  data_sesion TEXT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sesiones_usuario 
    FOREIGN KEY (usuario_id) REFERENCES USUARIOS_SG(id_usuario_sg) 
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- 8. TABLA: INTENTOS_LOGIN
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS INTENTOS_LOGIN (
  intento_usuario VARCHAR(150) NOT NULL,
  ip_usuario VARCHAR(45) NOT NULL,
  intentos_fallidos INT DEFAULT 1,
  ventana_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  bloqueado_hasta TIMESTAMP NULL DEFAULT NULL,
  ultimo_intento TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (intento_usuario, ip_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;