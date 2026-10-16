/**
 * Archivo: src/app.js
 * Descripción: Configuración de la instancia de Express, middlewares globales, cabeceras de seguridad y enrutadores.
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');
const originCheck = require('./middleware/originCheck');

const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const productRoutes = require('./modules/products/product.routes');
const siteRoutes = require('./modules/site/site.routes');

const app = express();

//segun deepseek
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Seguridad con Helmet
app.use(helmet());

// Configuración de CORS permitiendo credenciales (cookies)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5000',
  credentials: true
}));

//app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Verificación de origen opcional
app.use(originCheck);

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/site', siteRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Manejador global de errores
app.use(errorHandler);

module.exports = app;
