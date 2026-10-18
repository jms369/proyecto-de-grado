/**
 * Archivo: src/app.js
 * Descripción: Configuración de la instancia de Express, middlewares globales, cabeceras de seguridad y enrutadores.
 */
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const originCheck = require('./middleware/originCheck');

const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const productRoutes = require('./modules/products/product.routes');
const siteRoutes = require('./modules/site/site.routes');

const app = express();

// 1. Cookie Parser (Debe ir antes de las rutas que usan cookies)
app.use(cookieParser());

// 2. Seguridad con Helmet
// IMPORTANTE: Configuramos crossOriginResourcePolicy para que el frontend pueda cargar las imágenes
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" } 
}));

// 3. Configuración de CORS (Debe ir antes de las rutas estáticas para permitir el acceso desde el Frontend)
// NOTA: Si tu frontend está en el puerto 5173 (Vite), debes usar ese puerto aquí.
// Si usas variables de entorno, asegúrate de que FRONTEND_URL sea 'http://localhost:5173'
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // <-- Ajustado a Vite por defecto
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-session-token']
};
app.use(cors(corsOptions));

// 4. Servir carpeta estática de imágenes
// Como CORS ya está configurado arriba, las imágenes se podrán ver desde el frontend
app.use('/uploads', express.static(path.join(__dirname, '../Uploads')));

// 5. Parsers de body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 6. Verificación de origen opcional
app.use(originCheck);

// 7. Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/site', siteRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Manejador global de errores (Siempre al final)
app.use(errorHandler);

module.exports = app;