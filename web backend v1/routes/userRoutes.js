const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Endpoints principales
router.post("/login", userController.login);
router.post("/validar-gmail", userController.validarGmail);
router.post("/validar-codigo", userController.validarCodigo);
router.post("/nueva-contrasena", userController.nuevaContrasena);

router.post("/registro", userController.registro);
router.delete("/logout", userController.logout);


module.exports = router;
