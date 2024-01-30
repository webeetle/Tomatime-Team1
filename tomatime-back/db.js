const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'mirko',
    database: 'Tomatime',
    password: 'M1rkocirillo',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
    port: 3306
});

const promisePool = pool.promise();
module.exports = promisePool;
