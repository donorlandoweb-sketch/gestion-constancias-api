const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors()); // permite que cualquier origen haga peticiones
app.use(express.json()); // parsea JSON en el body

// Rutas
const constanciasRoutes = require('./constancias');
app.use(constanciasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de constancias funcionando 🚀');
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
