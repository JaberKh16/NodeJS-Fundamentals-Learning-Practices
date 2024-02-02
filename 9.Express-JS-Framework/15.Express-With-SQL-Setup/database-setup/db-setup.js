/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
// use the promise-based version of mysql2
dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'notes_app',
});

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
// });
const dbConnected = (pool) => {
    if (pool !== undefined) {
        console.log('Connected');
    }
};
dbConnected(pool);

console.log(pool);

const fetchingRowsOfNotes = async () => {
    try {
        const fetchedRows = await pool.query('SELECT * FROM notes_info');
        console.log(fetchedRows);
        return fetchedRows;
    } catch (error) {
        console.error('Error fetching rows:', error.message);
        throw error;
    }
};

// Example usage
const fetchData = async () => {
    try {
        const notesData = await fetchingRowsOfNotes();
        console.log(notesData);
        // Process the notesData as needed
    } catch (error) {
        // Handle errors
    } finally {
        // Optionally close the connection or perform cleanup
        pool.end();
    }
};

// Call the fetchData function
fetchData();
