/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
// import mysql from 'mysql2';
import mysql from 'mysql2/promise'; // use the promise-based version of mysql2

// now configure the .env file
dotenv.config();
// creating a pool of connection
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3312,
    database: 'notes_app',
});

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     port: process.env.MYSQL_PORT,
//     database: process.env.MYSQL_DATABASE,
// });

// performing query
// const result = await pool.query('SELECT * FROM tbl_notesinfo');
// console.log(result); // loads lot of information including the fetched array

// console.log(pool);

export default pool;
