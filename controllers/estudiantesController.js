const pool = require('../../backend/bd');

// Función para registrar un estudiante
const registrarEstudiante = async (req, res) => {
  const { numero_control, nombre_completo, carrera, semestre, correo } = req.body;

  try {
    const resultado = await pool.query(
      'INSERT INTO estudiantes (numero_control, nombre_completo, carrera, semestre, correo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [numero_control, nombre_completo, carrera, semestre, correo]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al registrar estudiante:', error);
    res.status(500).json({ error: 'Error al registrar estudiante' });
  }
};

// ✅ Función para actualizar un estudiante existente
const actualizarEstudiante = async (req, res) => {
  const { id } = req.params;
  const { numero_control, nombre_completo, carrera, semestre, correo } = req.body;

  try {
    const resultado = await pool.query(
      'UPDATE estudiantes SET numero_control = $1, nombre_completo = $2, carrera = $3, semestre = $4, correo = $5 WHERE id = $6',
      [numero_control, nombre_completo, carrera, semestre, correo, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.status(200).json({ mensaje: 'Estudiante actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
};

const eliminarEstudiante = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      'DELETE FROM estudiantes WHERE numero_control = $1 RETURNING *',
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.json({ mensaje: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
};


// 👇 Exportamos ambas funciones
module.exports = {
  registrarEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
};
