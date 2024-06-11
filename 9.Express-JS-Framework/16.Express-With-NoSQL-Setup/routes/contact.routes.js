/* eslint-disable consistent-return */
const express = require('express');
const bodyParser = require('body-parser');
const contactController = require('../controllers/contact-controller');

const router = express.Router();

// setup middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CRUD Routes
router.get('/contacts', contactController.fetchAllContacts);

router.get('/contacts/:id', contactController.fetchSingleContact);

router.post('/contacts', contactController.storeContactDetails);

router.put('/contacts/:id', contactController.updatedContactDetails);

router.delete('/contacts/:id', contactController.deletedContact);

module.exports = router;
