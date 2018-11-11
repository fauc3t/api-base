/**
 * Postgres DB Initialization
 * OPTIONAL
 */
const pgp = require('pg-promise')();
const cn = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
    user: process.env.PG_USER,
    password: process.env.PG_PWD
};

const db = pgp(cn);

db.connect()
    .then((obj) => {
        console.log('connected to db successfully...');
        obj.done();
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = db;