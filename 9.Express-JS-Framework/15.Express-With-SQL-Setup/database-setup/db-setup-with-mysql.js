/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
import mysql from 'mysql';

// create a pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_name',
});

// connection setup
pool.getConnection((error, connect) => {
    if (error) {
        return error.message;
    }
    console.log(`Connected : ${connect.threadId}`);
    // connect.query(sqlString, callback)
    connect.query('SELECT * FROM tbl_notes', (err, result) => {
        connect.release(); // return the connection to the pool
        if (err) {
            return err.sqlMessage;
        }
        console.log(result);
    });
});
