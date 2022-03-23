const mysql = require("mysql");
const { promisify } = require('util');
const { database } = require('./keys'); //tiene la config de la base de datos
//{ database } para obtener solo el objeto database
const pool = mysql.createPool(database); //hilos de ejecución secuenciales
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) {
        connection.release();
        console.log('DB is Connected');
        return;
    }

});
//promisify pool queries
pool.query = promisify(pool.query);
module.exports = pool;