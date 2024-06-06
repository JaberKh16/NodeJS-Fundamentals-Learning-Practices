const express = require('express');

const router = express.Router();
const noteController = require('../controllers/notes.controller');

router.get('/record/all', noteController.getAllNotes);
router.get('/record/:id', noteController.getNote);
router.post('/record/store', noteController.storeNote);
router.patch('/record/update/:id', noteController.updateSpeficiPartNote);
router.put('/record/update/:id', noteController.updateNote);
router.delete('/record/delete/:id', noteController.deleteNote);

module.exports = router;
