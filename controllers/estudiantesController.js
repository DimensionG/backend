const pool = require('../../backend/bd');

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



module.exports = {
  registrarEstudiante,
  //actualizarEstudiante
};
