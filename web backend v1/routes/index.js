const express = require("express");
const router = express.Router();

// Importar rutas de usuarios
const userRoutes = require("./userRoutes");
router.use("/usuarios", userRoutes);

// Aquí se importarán las rutas específicas
// Ejemplo: router.use("/usuarios", require("./userRoutes"));

module.exports = router;
