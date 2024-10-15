const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
  ssl: {
    rejectUnauthorized: true
  }
});

async function connectToDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('Connexion à la base de données AWS réussie');
    connection.release();
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
}

module.exports = {
  pool,
  connectToDatabase
};
