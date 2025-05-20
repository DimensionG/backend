const express = require('express');
const router = express.Router();
const { registrarEstudiante, actualizarEstudiante, eliminarEstudiante} = require('../controllers/estudiantesController');


// Ruta POST
router.post('/', registrarEstudiante);

// Ruta GET (ya la tienes)
const pool = require('../../backend/bd');
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM estudiantes');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

// ✅ Ruta PUT para actualizar un estudiante
router.put('/:id', actualizarEstudiante);

// Ruta DELETE para eliminar un estudiante
// Ruta DELETE
router.delete('/:id', eliminarEstudiante);


module.exports = router;
