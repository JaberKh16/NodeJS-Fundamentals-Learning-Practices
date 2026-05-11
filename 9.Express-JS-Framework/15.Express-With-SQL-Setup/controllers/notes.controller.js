// eslint-disable-next-line import/extensions
import NotesModel from '../models/notes.model.js';

const controller = {};

// all controllers functions
controller.controllerFunctions = {
    fetchAllNotes: NotesModel.fetchedAllRows,
    fetchSingleNote: NotesModel.fetchingSingleNotes,
    createNote: NotesModel.insertSingleNote,
    deleteNote: NotesModel.deletingSingleNote,
};

export default controller;
