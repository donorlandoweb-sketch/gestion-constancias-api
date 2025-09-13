const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todas las constancias
router.get("/", (req, res) => {
  db.all("SELECT * FROM constancias", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear una constancia
router.post("/", (req, res) => {
  const { cedula, apellidos, nombres, especialidad, tipoDocumento, estatus } = req.body;
  const query = `INSERT INTO constancias (cedula, apellidos, nombres, especialidad, tipoDocumento, estatus)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [cedula, apellidos, nombres, especialidad, tipoDocumento, estatus], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, cedula, apellidos, nombres, especialidad, tipoDocumento, estatus });
  });
});

// Actualizar una constancia
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { cedula, apellidos, nombres, especialidad, tipoDocumento, estatus } = req.body;
  const query = `UPDATE constancias 
                 SET cedula=?, apellidos=?, nombres=?, especialidad=?, tipoDocumento=?, estatus=? 
                 WHERE id=?`;
  db.run(query, [cedula, apellidos, nombres, especialidad, tipoDocumento, estatus, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Constancia no encontrada" });
    res.json({ id, cedula, apellidos, nombres, especialidad, tipoDocumento, estatus });
  });
});

// Eliminar una constancia
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM constancias WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Constancia no encontrada" });
    res.json({ message: "Constancia eliminada correctamente" });
  });
});

module.exports = router;