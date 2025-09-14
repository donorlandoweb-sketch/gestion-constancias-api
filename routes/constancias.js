const express = require('express');
const router = express.Router();
const db = require('./db'); // Importa el db.js corregido

// 🔹 GET - obtener todas las constancias
router.get('/api/constancias', (req, res) => {
  const sql = 'SELECT * FROM constancias';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('❌ Error al obtener constancias:', err.message);
      res.status(500).json({ error: 'Error al obtener constancias' });
    } else {
      res.json(rows);
    }
  });
});

// 🔹 GET - obtener una constancia por ID
router.get('/api/constancias/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM constancias WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('❌ Error al obtener constancia:', err.message);
      res.status(500).json({ error: 'Error al obtener constancia' });
    } else if (!row) {
      res.status(404).json({ error: 'Constancia no encontrada' });
    } else {
      res.json(row);
    }
  });
});

// 🔹 POST - insertar nueva constancia
router.post('/api/constancias', (req, res) => {
  const { cedula, apellidos, nombres, especialidad, tipoDocumento, estatus } = req.body;
  const sql = `INSERT INTO constancias 
    (cedula, apellidos, nombres, especialidad, tipoDocumento, estatus) 
    VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [cedula, apellidos, nombres, especialidad, tipoDocumento, estatus], function (err) {
    if (err) {
      console.error('❌ Error al insertar constancia:', err.message);
      res.status(500).json({ error: 'Error al insertar constancia' });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

// 🔹 PUT - actualizar constancia existente
router.put('/api/constancias/:id', (req, res) => {
  const { id } = req.params;
  const { cedula, apellidos, nombres, especialidad, tipoDocumento, estatus } = req.body;
  const sql = `UPDATE constancias 
    SET cedula = ?, apellidos = ?, nombres = ?, especialidad = ?, tipoDocumento = ?, estatus = ?
    WHERE id = ?`;
  db.run(sql, [cedula, apellidos, nombres, especialidad, tipoDocumento, estatus, id], function (err) {
    if (err) {
      console.error('❌ Error al actualizar constancia:', err.message);
      res.status(500).json({ error: 'Error al actualizar constancia' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Constancia no encontrada' });
    } else {
      res.json({ message: '✅ Constancia actualizada correctamente' });
    }
  });
});

// 🔹 DELETE - eliminar constancia
router.delete('/api/constancias/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM constancias WHERE id = ?';
  db.run(sql, [id], function (err) {
    if (err) {
      console.error('❌ Error al eliminar constancia:', err.message);
      res.status(500).json({ error: 'Error al eliminar constancia' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Constancia no encontrada' });
    } else {
      res.json({ message: '🗑️ Constancia eliminada correctamente' });
    }
  });
});

module.exports = router;
