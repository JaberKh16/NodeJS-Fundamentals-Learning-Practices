/* eslint-disable consistent-return */
const express = require('express');
const contactController = require('../controllers/contact-controller');

const router = express.Router();

// CRUD Routes
router.get('/contacts', contactController.fetchAllContacts);

router.get('/contacts/:id', contactController.fetchSingleContact);

router.post('/contacts', contactController.storeContactDetails);

router.put('/contacts/:id', contactController.updatedContactDetails);

router.delete('/contacts/:id', contactController.deletedContact);

module.exports = router;
