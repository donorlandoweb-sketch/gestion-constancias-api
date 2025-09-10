const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las constancias
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM constancias';
  db.all(sql, [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Insertar constancia
router.post('/', (req, res) => {
  const { cedula, apellidos, nombres, especialidad, tipoDocumento, estatus } = req.body;
  const sql = `INSERT INTO constancias (cedula, apellidos, nombres, especialidad, tipoDocumento, estatus)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [cedula, apellidos, nombres, especialidad, tipoDocumento, estatus], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: this.lastID, ...req.body });
  });
});

// Actualizar constancia
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { cedula, apellidos, nombres, especialidad, tipoDocumento, estatus } = req.body;
  const sql = `UPDATE constancias SET cedula=?, apellidos=?, nombres=?, especialidad=?, tipoDocumento=?, estatus=? WHERE id=?`;
  db.run(sql, [cedula, apellidos, nombres, especialidad, tipoDocumento, estatus, id], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id, ...req.body });
  });
});

// Eliminar constancia
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM constancias WHERE id=?';
  db.run(sql, [id], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: 'Constancia eliminada' });
  });
});

module.exports = router;