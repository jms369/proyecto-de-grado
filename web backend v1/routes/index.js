const express = require("express");
const router = express.Router();

// Importar rutas de usuarios
const userRoutes = require("./userRoutes");
router.use("/usuarios", userRoutes);

// Importar rutas de CRUD productos
const crudRoutes = require("./crudRoutes");
router.use("/crud", crudRoutes);

module.exports = router;
