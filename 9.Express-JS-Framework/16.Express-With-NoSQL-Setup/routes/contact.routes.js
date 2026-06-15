/* eslint-disable consistent-return */
const express = require('express');
const contactController = require('../controllers/contact.controller');

const router = express.Router();

// CRUD Routes
router.get('/index', contactController.fetchAllContacts);
router.get('/:id', contactController.fetchSingleContact);
router.post('/create', contactController.storeContactDetails);
router.put('/update/:id', contactController.updatedContactDetails);
router.delete('/delete/:id', contactController.deletedContact);


module.exports = router;
