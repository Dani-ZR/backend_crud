const express = require("express");
const router = express.Router();
const db = require("../db");  // Asegúrate que apunte correctamente a la conexión

console.log("📦 Ruta /api/productos cargada correctamente");

// 📍 GET - Consultar todos los productos
router.get("/", (req, res) => {
  db.query("SELECT * FROM productos", (err, rows) => {
    if (err) {
      console.error("❌ Error en consulta:", err);
      return res.status(500).json({ error: "Error en la consulta DB" });
    }
    res.json(rows);
  });
});

// 📍 GET por ID - Consultar producto específico
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM productos WHERE id=?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Error en consulta por ID" });
    if (rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(rows[0]); // Retorna solo el producto encontrado
  });
});

// 📍 POST - Crear producto
router.post("/", (req, res) => {
  const { nombre, precio, stock } = req.body;
  db.query(
    "INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)",
    [nombre, precio, stock],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al insertar producto" });
      res.json({ id: result.insertId, message: "Producto creado correctamente" });
    }
  );
});

// 📍 PUT - Actualizar producto
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;
  db.query(
    "UPDATE productos SET nombre=?, precio=?, stock=? WHERE id=?",
    [nombre, precio, stock, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Error al actualizar producto" });
      res.json({ message: "Producto actualizado correctamente" });
    }
  );
});

// 📍 DELETE - Eliminar producto
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM productos WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar producto" });
    res.json({ message: "Producto eliminado correctamente" });
  });
});

module.exports = router;

