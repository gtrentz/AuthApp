require('dotenv').config();
const sql = require('mssql');

//Credentials locally stored
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: true,  //Pretty sure Azure requires this?
        trustServerCertificate: false
    }
};

//Create + export connection pool
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log('Connected successfully <3');
        return pool;
    })
    .catch((err) => {
        console.error('Connection failed >:(', err);
        process.exit(1);
    });

module.exports = { sql, poolPromise };
