// eslint-disable-next-line import/no-unresolved, import/extensions
import pool from '../database-setup/db.config.js';

const notesModel = {};

notesModel.fetchedAllRows = async () => {
    try {
        const [fetchedRows] = await pool.query('SELECT * FROM tbl_notesinfo');
        return fetchedRows; // returing the promise
    } catch (error) {
        console.error('Error fetching rows:', error.message);
        throw error;
    }
};

// // setup select query
notesModel.fetchingSingleNotes = async (id) => {
    const [fetchedRow] = await pool.query(
        `SELECT *
        FROM tbl_notesinfo
        WHERE id=?`,
        [id]
    );
    console.log(fetchedRow); // loads lot of information including the fetched array
    return fetchedRow;
};

// // setup insert query
notesModel.insertSingleNote = async (title, content) => {
    const insertedRow = await pool.query(
        `INSERT INTO tbl_notesinfo(title, content)
        VALUES(?, ?)`,
        [title, content]
    );
    console.log(insertedRow); // loads lot of information including the fetched array
    return insertedRow;
};

// // setup delete query
notesModel.deletingSingleNote = async (id) => {
    const insertedRow = await pool.query(
        `DELETE FROM tbl_notesinfo
        WHERE id =? `,
        [id]
    );
    console.log(insertedRow); // loads lot of information including the fetched array
    return insertedRow;
};

/// testing purpose
// const fetchData = async () => {
//     try {
//         const notesData = await fetchedAllRows();
//         return notesData; // returing the promise
//     } catch (error) {
//         console.log(error);
//     }
// };
// // fetchData();

// const noteData = await fetchingRowsOfNotes(id=1);
// console.log(notesData);

export default notesModel;
