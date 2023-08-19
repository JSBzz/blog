require('dotenv').config();
var mysql = require('mysql2/promise');

const connection = { 
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    port: process.env.DEV_DB_PORT,
    database: process.env.DEV_DB_NAME,
};
  
module.exports = mysql.createPool(connection);