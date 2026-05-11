/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import asyncHandler from 'express-async-handler';
import controller from '../controllers/notes.controller.js';

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (request, response) => {
        const notes = await controller.controllerFunctions.fetchAllNotes();
        // console.log(notes);
        if (notes) {
            return response.status(200).json({ success: true, notes });
        }
        return response.json({ failure: true, notes: [] });
    })
);

router.get(
    '/:id',
    asyncHandler(async (request, response) => {
        const { params } = request.body;
        if (params.id !== undefined) {
            const parsedID = Number(params.id);
            const notes = await controller.controllerFunctions.fetchSingleNote(parsedID);
            console.log(notes);
            if (notes) {
                return response.status(200).json({ success: true, notes });
            }
            return response.json({ failure: true, notes: [] });
        }
        return response.json({ failure: true, error: 'Validation Errors' });
    })
);

router.post(
    '/create/post',
    asyncHandler(async (request, response) => {
        const { body } = request;

        const notes = await controller.controllerFunctions.createNote(body);
        console.log(notes);
        if (notes) {
            return response.status(200).json({ success: true, notes });
        }
        return response.json({ failure: true, notes: [] });
    })
);

export default router;
