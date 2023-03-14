//this is where to put the pool..its in a module
const pg = require('pg');


let pool;

if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'weekend-to-do-app', 
    });
}

module.exports = pool;//this is so the const pool = require('../modules/pool');//this links the pool to the server thru this router
