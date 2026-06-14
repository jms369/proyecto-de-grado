CREATE TABLE UsuarioAdmin (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50),
    sexo VARCHAR(10),
    numero_celular VARCHAR(15),
    carnet_identidad VARCHAR(20) NOT NULL,
    complemento VARCHAR(10),
    direccion VARCHAR(100),
    fecha_nacimiento DATE,
    correo_gmail VARCHAR(100) UNIQUE NOT NULL,
    contrasena_admin VARCHAR(255) NOT NULL,
    codigo_reseteo VARCHAR(10),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_usuario ENUM('activo','inactivo') DEFAULT 'activo'
);
