import mysql from 'mysql2/promise';

// Configuración del pool de conexiones
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tiendadb',
  connectionLimit: 10,  // Límite de conexiones simultáneas en el pool
  queueLimit: 0         // Número de conexiones en espera (0 significa sin límite)
};

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para obtener una conexión desde el pool
async function getConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión obtenida del pool');
    return connection;
  } catch (err) {
    console.error('Error al obtener conexión del pool: ', err);
    throw err;
  }
}

export default getConnection;
