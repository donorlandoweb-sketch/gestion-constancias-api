const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const constanciasRoutes = require('./routes/constancias');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/constancias', constanciasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});