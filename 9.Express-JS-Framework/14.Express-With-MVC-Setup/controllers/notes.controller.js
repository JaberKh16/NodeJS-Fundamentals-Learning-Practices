/* eslint-disable no-restricted-globals */
const express = require('express');
const { validationResult, matchedData, checkSchema } = require('express-validator');
const NotesModel = require('../models/product-model');
const notesSchema = require('../validators/notes.validator.schema');

const noteController = {};

noteController.getAllNotes = async (req, res) => {
    // get the data
    const allRecords = await NotesModel.findAllRecord();
    if (!allRecords) {
        return res.status(200).send({ msg: 'No records found', data: [] });
    }
    return res.status(200).send({ msg: 'Data found', data: allRecords });
};

noteController.getNote = async (req, res) => {
    const { id } = req.params;
    const parseId = isNaN(id) ? id : parseInt(id, 10);
    // get the data
    const singleNote = await NotesModel.findById(parseId);
    if (!singleNote) {
        return res.status(200).send({ msg: 'No records found', data: [] });
    }
    return res.status(200).send({ msg: 'Data found', data: singleNote });
};

noteController.storeNote = [
    checkSchema(notesSchema),
    async (req, res) => {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res
                .status(400)
                .send({ msg: 'Validation Error', errors: validationErrors.array() });
        }

        const data = matchedData(req);

        // create the model object
        const notes = new NotesModel(data.title, data.content);

        try {
            // store the data
            const insertedPost = await notes.storeData();
            if (!insertedPost) {
                return res.status(500).send({ msg: 'Data store failed', data: [] });
            }
            return res.status(201).send({ msg: 'Data stored successfully', data: insertedPost });
        } catch (error) {
            return res.status(500).send({ msg: 'Internal Server Error', error: error.message });
        }
    },
];

noteController.updateSpeficiPartNote = [
    async (req, res) => {
        const { id } = req.params;
        const parseId = isNaN(id) ? id : parseInt(id, 10);
        try {
            // create the model object with null checks
            const updatedData = {
                title: req.body.title || null,
                content: req.body.content || null,
            };

            // update the data
            const updatedPost = await NotesModel.updateById(parseId, updatedData);
            if (!updatedPost) {
                return res.status(500).send({ msg: 'Data updation failed', data: [] });
            }
            return res.status(200).send({ msg: 'Data updated successfully', data: updatedPost });
        } catch (error) {
            return res.status(500).send({ msg: 'Internal Server Error', error: error.message });
        }
    },
];

noteController.updateNote = [
    checkSchema(notesSchema),
    async (req, res) => {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res
                .status(400)
                .send({ msg: 'Validation Error', errors: validationErrors.array() });
        }

        const data = matchedData(req);

        const { id } = req.params;
        const parseId = isNaN(id) ? id : parseInt(id, 10);

        // create the model object with null checks
        const updatedData = {
            title: data.title || null,
            content: data.content || null,
        };

        try {
            // update the data
            const updatedPost = await NotesModel.updateById(parseId, updatedData);
            if (!updatedPost) {
                return res.status(500).send({ msg: 'Data updation failed', data: [] });
            }
            return res.status(200).send({ msg: 'Data updated successfully', data: updatedPost });
        } catch (error) {
            return res.status(500).send({ msg: 'Internal Server Error', error: error.message });
        }
    },
];

noteController.deleteNote = [
    async (req, res) => {
        const { id } = req.params;
        const parseId = isNaN(id) ? id : parseInt(id, 10);

        try {
            // update the data
            const deletedPost = await NotesModel.deleteById(parseId);
            if (!deletedPost) {
                return res.status(500).send({ msg: 'Data deletion failed', data: [] });
            }
            return res.status(200).send({ msg: 'Data deleted successfully', data: deletedPost });
        } catch (error) {
            return res.status(500).send({ msg: 'Internal Server Error', error: error.message });
        }
    },
];

module.exports = noteController;
