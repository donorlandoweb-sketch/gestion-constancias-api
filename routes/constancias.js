const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate que db.js está en la raíz del proyecto

// ========================
// 🔹 GET todas las constancias
// ========================
router.get('/api/constancias', (req, res) => {
  db.all('SELECT * FROM constancias', [], (err, rows) => {
    if (err) {
      console.error('❌ Error al obtener constancias:', err.message);
      return res.status(500).json({ error: 'Error al obtener constancias' });
    }
    res.json(rows);
  });
});

// ========================
// 🔹 GET constancia por ID
// ========================
router.get('/api/constancias/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM constancias WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('❌ Error al obtener constancia:', err.message);
      return res.status(500).json({ error: 'Error al obtener constancia' });
    }
    if (!row) return res.status(404).json({ error: 'Constancia no encontrada' });
    res.json(row);
  });
});

// ========================
// 🔹 POST insertar nueva constancia
// ========================
router.post('/api/constancias', (req, res) => {
  const { cedula, apellidos, nombres, especialidad, tipoDocumento, estatus } = req.body;
  const sql = `INSERT INTO constancias (cedula, apellidos, nombres, especialidad, tipoDocumento, estatus) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [cedula, apellidos, nombres, especialidad, tipoDocumento, estatus], function(err) {
    if (err) {
      console.error('❌ Error al insertar constancia:', err.message);
      return res.status(500).json({ error: 'Error al insertar constancia' });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// ========================
// 🔹 PUT actualizar constancia
// ========================
router.put('/api/constancias/:id', (req, res) => {
  const { id } = req.params;
  const { cedula, apellidos, nombres, especialidad, tipoDocumento, estatus } = req.body;
  const sql = `UPDATE constancias SET cedula = ?, apellidos = ?, nombres = ?, especialidad = ?, tipoDocumento = ?, estatus = ? WHERE id = ?`;
  db.run(sql, [cedula, apellidos, nombres, especialidad, tipoDocumento, estatus, id], function(err) {
    if (err) {
      console.error('❌ Error al actualizar constancia:', err.message);
      return res.status(500).json({ error: 'Error al actualizar constancia' });
    }
    if (this.changes === 0) return res.status(404).json({ error: 'Constancia no encontrada' });
    res.json({ message: '✅ Constancia actualizada correctamente' });
  });
});

// ========================
// 🔹 DELETE constancia
// ========================
router.delete('/api/constancias/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM constancias WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('❌ Error al eliminar constancia:', err.message);
      return res.status(500).json({ error: 'Error al eliminar constancia' });
    }
    if (this.changes === 0) return res.status(404).json({ error: 'Constancia no encontrada' });
    res.json({ message: '🗑️ Constancia eliminada correctamente' });
  });
});

module.exports = router;
