const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todas las constancias
router.get("/", async (req, res) => {
  console.log("➡️ GET /api/constancias");
  try {
    const [rows] = await db.query("SELECT * FROM constancias");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener constancias:", err);
    res.status(500).json({ error: "Error al obtener constancias" });
  }
});

// Insertar una nueva constancia
router.post("/", async (req, res) => {
  console.log("➡️ POST /api/constancias");
  try {
    const { nombre, detalle } = req.body;
    const [result] = await db.query(
      "INSERT INTO constancias (nombre, detalle) VALUES (?, ?)",
      [nombre, detalle]
    );
    res.json({ id: result.insertId, nombre, detalle });
  } catch (err) {
    console.error("❌ Error al insertar constancia:", err);
    res.status(500).json({ error: "Error al insertar constancia" });
  }
});

module.exports = router;
