import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configuración del pool de conexiones
const dbConfig = {
  host: process.env.DB_HOST,  // Esto toma el valor de la variable de entorno DB_HOST
  user: process.env.DB_USER,  // Esto toma el valor de la variable de entorno DB_USER
  password: process.env.DB_PASSWORD,  // Esto toma el valor de la variable de entorno DB_PASSWORD
  database: process.env.DB_NAME,  // Esto toma el valor de la variable de entorno DB_NAME
  connectionLimit: 10,
  queueLimit: 0,
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
