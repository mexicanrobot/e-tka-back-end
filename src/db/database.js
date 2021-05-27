const mysql = require('mysql')
const dbConf = require('../config/db.config');

var pool;

function getPool() {
    if(pool) return pool;

    pool = mysql.createPool({
        host: dbConf.HOST,
        port: dbConf.PORT,
        user: dbConf.USER,
        password: dbConf.PASSWORD,
        database: dbConf.DB,
        connectionLimit: 10
    })
    
    return pool;
};

module.exports = {
    getPool
};