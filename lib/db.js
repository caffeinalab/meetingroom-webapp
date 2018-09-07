const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'database',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect();

module.exports = connection;