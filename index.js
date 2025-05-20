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

// DELETE /estudiantes/:numero_control
app.delete('/api/estudiantes/:numero_control', async (req, res) => {
  const { numero_control } = req.params;
  try {
    await pool.query('DELETE FROM estudiantes WHERE numero_control = $1', [numero_control]);
    res.status(200).json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
});

