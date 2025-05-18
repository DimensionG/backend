const pool = require('../bd'); // Importa la conexión a la base de datos

const getEstudiantes = async () => {
  const res = await pool.query('SELECT * FROM estudiantes');
  return res.rows;
};

module.exports = { getEstudiantes };
