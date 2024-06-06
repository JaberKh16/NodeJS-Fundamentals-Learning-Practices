/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users.controller');

router.get('/', usersController.fetchAllRecords);
router.post('/store', usersController.storeRecord);
router.get('/getUser/:id', usersController.getUserById);
router.patch('/update/:id', usersController.updateUserSpecificInfo);
router.put('/update/:id', usersController.updateUserAllInfo);
router.delete('/delete/:id', usersController.deleteUser);

module.exports = router;
