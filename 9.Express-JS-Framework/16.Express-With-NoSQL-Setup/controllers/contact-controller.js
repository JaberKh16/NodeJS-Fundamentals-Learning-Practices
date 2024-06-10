/* eslint-disable consistent-return */
const express = require('express');
const bodyParser = require('body-parser');
const Contact = require('../models/contact.model');

const router = express.Router();

// setup middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CRUD Routes
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        return res.json(contacts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        return res.json(contact);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post('/contacts', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        return res.json(savedContact);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.put('/contacts/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        return res.json(updatedContact);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.delete('/contacts/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        return res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
