const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🔥');
});

// ✅ Aquí importas y usas las rutas antes de levantar el servidor
const estudianteRoutes = require('./routes/estudiantes');
app.use('/api/estudiantes', estudianteRoutes);

// Arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
