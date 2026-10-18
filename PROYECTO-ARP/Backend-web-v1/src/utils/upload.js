const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Importamos fs para verificar si la carpeta existe

// 1. Verificar y crear la carpeta si no existe
const uploadDir = path.join(__dirname, '../../Uploads/img_productos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Configurar cómo se guarda
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Usa la ruta verificada
  },
  filename: (req, file, cb) => {
    // Nombre único: producto-timestamp-random.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `producto-${uniqueSuffix}${ext}`);
  }
});

// 3. Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen (jpg, png, webp)'), false);
  }
};

// 4. Exportar la instancia configurada
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
});

module.exports = upload;