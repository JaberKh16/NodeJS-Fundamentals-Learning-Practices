/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
// import mysql from 'mysql2';
import mysql from 'mysql2/promise'; // use the promise-based version of mysql2

// now configure the .env file
dotenv.config();
// creating a pool of connection
// const pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     port: 3306,
//     database: 'notes_app',
// });

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// performing query
// const result = await pool.query('SELECT * FROM notes_info');
// console.log(result); // loads lot of information including the fetched array

// console.log(pool);

const fetchedAllRows = async () => {
    try {
        const [fetchedRows] = await pool.query('SELECT * FROM notes_info');
        console.log(fetchedRows);
        return fetchedRows;
    } catch (error) {
        console.error('Error fetching rows:', error.message);
        throw error;
    }
};

// // setup select query
// const fetchingSingleNotes = async (id) => {
//     const [fetchedRow] = await pool.query
//     (  `SELECT *
//         FROM notes_info
//         WHERE id=?`, [id]
//     );
//     console.log(fetchedRow); // loads lot of information including the fetched array
//     return fetchedRow;
// };

// // setup insert query
// const insertSingleNote = async (title, content) => {
//     const insertedRow = await pool.query
//     (  `INSERT INTO notes_info(title, content)
//         VALUES(?, ?)`, [title, content]
//     );
//     console.log(insertedRow); // loads lot of information including the fetched array
//     return insertedRow;
// };

// // setup delete query
// const deletingSingleNote = async (id) => {
//     const insertedRow = await pool.query
//     (  `DELETE FROM notes_info
//         WHERE id =? `, [id]
//     );
//     console.log(insertedRow); // loads lot of information including the fetched array
//     return insertedRow;
// };

const fetchData = async () => {
    try {
        const notesData = await fetchedAllRows();
        console.log(notesData);
    } catch (error) {
        console.log(error);
    } finally {
        // Optionally close the connection or perform cleanup
        pool.end();
    }
};
// fetchData();

export default fetchData;

// const noteData = await fetchingRowsOfNotes(id=1);
// console.log(notesData);
