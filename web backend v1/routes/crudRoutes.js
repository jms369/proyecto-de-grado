const express = require("express");
const router = express.Router();
const crudController = require("../controllers/rutasCrud");

router.post("/productos", crudController.crearProducto);
router.get("/productos", crudController.obtenerProductos);
router.put("/productos/:id", crudController.actualizarProducto);
router.delete("/productos/:id", crudController.eliminarProducto);

module.exports = router;
