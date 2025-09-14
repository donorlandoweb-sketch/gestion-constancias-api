const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
// Asegúrate de que la carpeta y el archivo existan: routes/constancias.js
const constanciasRoutes = require('./routes/constancias');
app.use(constanciasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de constancias funcionando 🚀');
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
