/**
 * Módulo: site - site.routes.js
 * Descripción: Endpoints para contenido del sitio web, header, footer y administración del sitio (/api/site).
 */
const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const verificarAutenticacion = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { validarWhatsappSchema } = require('./site.schema');

//  NUEVO: Importamos los middlewares de subida
const { uploadLogo, uploadOferta } = require('../../utils/uploadSitio');

const fs = require('fs');
const path = require('path');

const {
  obtenerLogo,
  obtenerFooter,
  obtenerHomeInfo,
  actualizarLogo,
  actualizarRedesYContacto,
  actualizarTextoInformativo,
  listarOfertas,
  crearOferta,
  eliminarOferta,
  obtenerSoloWhatsapp 
} = require('./site.controller');

// ==========================================
// RUTAS PÚBLICAS
// ==========================================
router.get('/logo', asyncHandler(obtenerLogo));
router.get('/footer', asyncHandler(obtenerFooter));
router.get('/home', asyncHandler(obtenerHomeInfo));
router.get('/ofertas', asyncHandler(listarOfertas));
router.get('/whatsapp', asyncHandler(obtenerSoloWhatsapp)); // <-- NUEVA RUTA

// ==========================================
// NUEVAS RUTAS DE SUBIDA DE IMÁGENES
// ==========================================
router.post(
  '/upload-logo',
  verificarAutenticacion(['ADMINISTRADOR']),
  uploadLogo.single('imagen'),
  (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });
    const imageUrl = `/uploads/img_logo/${req.file.filename}`;
    return res.json({ url: imageUrl });
  }
);

router.post(
  '/upload-oferta',
  verificarAutenticacion(['ADMINISTRADOR']),
  uploadOferta.single('imagen'),
  (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });
    const imageUrl = `/uploads/img_ofertas/${req.file.filename}`;
    return res.json({ url: imageUrl });
  }
);


// Ruta para listar archivos de img_productos
router.get('/productos-imagenes-fisicas', verificarAutenticacion(['ADMINISTRADOR']), async (req, res) => {
  try {
    const dirPath = path.join(__dirname, '../../../Uploads/img_productos');
    
    if (!fs.existsSync(dirPath)) {
      return res.json([]);
    }

    const files = fs.readdirSync(dirPath);
    const fileUrls = files.map(file => `/uploads/img_productos/${file}`);
    return res.json(fileUrls);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al leer la carpeta de imágenes.' });
  }
});

// Ruta para eliminar un archivo físico
router.delete('/productos-imagenes-fisicas', verificarAutenticacion(['ADMINISTRADOR']), async (req, res) => {
  const { url } = req.body; // ej. "/uploads/img_productos/producto-123.jpg"
  
  if (!url) return res.status(400).json({ error: 'URL requerida.' });

  try {
    // Limpiamos la URL para obtener solo el nombre del archivo
    const filename = path.basename(url);
    const filePath = path.join(__dirname, '../../../Uploads/img_productos', filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({ mensaje: 'Archivo eliminado correctamente.' });
    } else {
      return res.status(404).json({ error: 'El archivo no existe.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al eliminar el archivo.' });
  }
});


// ==========================================
// RUTAS PROTEGIDAS (Administrador)
// ==========================================
router.put('/logo', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(actualizarLogo));
router.put('/redes', verificarAutenticacion(['ADMINISTRADOR']), validate(validarWhatsappSchema), asyncHandler(actualizarRedesYContacto));
router.put('/info', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(actualizarTextoInformativo));
router.post('/ofertas', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(crearOferta));
router.delete('/ofertas/:id', verificarAutenticacion(['ADMINISTRADOR']), asyncHandler(eliminarOferta));

module.exports = router;