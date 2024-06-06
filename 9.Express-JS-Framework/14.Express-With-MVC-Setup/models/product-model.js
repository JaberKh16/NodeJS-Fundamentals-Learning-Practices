/* eslint-disable class-methods-use-this */
const dbConfig = require('../config/db.config');

class NotesModel {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    static setupDateFormat() {
        const date = new Date();
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}`;
    }

    async storeData() {
        const createdDate = NotesModel.setupDateFormat();
        const sqlQuery = 'INSERT INTO tbl_notesinfo (title, content) VALUES (?, ?)';
        const [insertedPost, _] = await dbConfig.execute(sqlQuery, [this.title, this.content]);
        return insertedPost;
    }

    static async findAllRecord() {
        const sqlQuery = 'SELECT * FROM tbl_notesinfo';
        const [allRecords, _] = await dbConfig.execute(sqlQuery);
        return allRecords;
    }

    static async findById(id) {
        const sqlQuery = 'SELECT * FROM tbl_notesinfo WHERE id = ?';
        const [foundRecord, _] = await dbConfig.execute(sqlQuery, [id]);
        return foundRecord;
    }

    static async updateById(id, newRecord) {
        const { title, content } = newRecord;
        const sqlQuery = 'UPDATE tbl_notesinfo SET title = ?, content = ? WHERE id = ?';
        const [updatedRecord, _] = await dbConfig.execute(sqlQuery, [title, content, id]);
        return updatedRecord;
    }

    static async deleteById(id) {
        const sqlQuery = 'DELETE FROM tbl_notesinfo WHERE id = ?';
        const [deletedRecord, _] = await dbConfig.execute(sqlQuery, [id]);
        return deletedRecord;
    }
}

module.exports = NotesModel;
