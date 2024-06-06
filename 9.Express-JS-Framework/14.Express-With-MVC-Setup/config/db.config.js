/* eslint-disable import/no-extraneous-dependencies */
const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// console.log(pool);

module.exports = pool;
