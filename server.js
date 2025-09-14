require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const constanciasRoutes = require("./routes/constancias");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Log de cada request para debug
app.use((req, res, next) => {
  console.log(`📥 Request recibido: ${req.method} ${req.originalUrl}`);
  next();
});

// Rutas
app.use("/api/constancias", constanciasRoutes);

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.send("✅ API de Gestión de Constancias funcionando");
});

// Endpoint de prueba
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
