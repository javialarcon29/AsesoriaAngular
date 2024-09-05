// server/mysqlconfig.js

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',       // Cambia esto por tu usuario de MySQL
  password: '',       // Cambia esto por tu contraseña de MySQL
  database: 'Pruebas',
  port: 3306,         // Especifica el puerto MySQL
});

module.exports = pool;

