const db = require("../models/db");

// Crear producto
exports.crearProducto = (req, res) => {
  const { marca, modelo, precio, procesador, almacenamiento, ram, bateria, mas_info } = req.body;
  const sql = "INSERT INTO ProductosCelular (marca, modelo, precio, procesador, almacenamiento, ram, bateria, mas_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [marca || "", modelo || "", precio || 0, procesador || "", almacenamiento || "", ram || 0, bateria || "", mas_info || ""], (err, result) => {
    if (err) {
      console.error("Error al crear producto:", err);
      return res.status(500).json({ error: "Error al crear producto" });
    }
    res.json({ mensaje: "Producto creado", id: result.insertId });
  });
};

// Obtener todos los productos
exports.obtenerProductos = (req, res) => {
  db.query("SELECT * FROM ProductosCelular", (err, results) => {
    if (err) {
      console.error("Error al obtener productos:", err);
      return res.status(500).json({ error: "Error al obtener productos" });
    }
    res.json(results);
  });
};

// Actualizar producto
exports.actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { marca, modelo, precio, procesador, almacenamiento, ram, bateria, mas_info } = req.body;
  const sql = "UPDATE ProductosCelular SET marca=?, modelo=?, precio=?, procesador=?, almacenamiento=?, ram=?, bateria=?, mas_info=? WHERE id=?";
  db.query(sql, [marca || "", modelo || "", precio || 0, procesador || "", almacenamiento || "", ram || 0, bateria || "", mas_info || "", id], (err) => {
    if (err) {
      console.error("Error al actualizar producto:", err);
      return res.status(500).json({ error: "Error al actualizar producto" });
    }
    res.json({ mensaje: "Producto actualizado" });
  });
};

// Eliminar producto
exports.eliminarProducto = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM ProductosCelular WHERE id=?", [id], (err) => {
    if (err) {
      console.error("Error al eliminar producto:", err);
      return res.status(500).json({ error: "Error al eliminar producto" });
    }
    res.json({ mensaje: "Producto eliminado" });
  });
};
