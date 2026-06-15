// eslint-disable-next-line import/no-extraneous-dependencies
const { checkSchema, validationResult, matchedData } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const userValidationSchema = require('../validation/user.store.val.schema');
const readContent = require('../utils/read.content');

const { writeContent } = require('../utils/write.content');

const usersController = {};

usersController.fetchAllRecords = async (req, res) => {
    try {
        const filePathSetup = path.resolve(__dirname, '../data', 'users.data.json');
        const content = await readContent(filePathSetup);
        if (content) {
            res.status(200).send(JSON.parse(content));
        } else {
            res.status(400).send({ msg: 'File reading content failed.' });
        }
    } catch (error) {
        res.status(500).send({ msg: 'Internal Server Error', error: error.message });
    }
};

usersController.storeRecord = [
    checkSchema(userValidationSchema),
    async (req, res) => {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }

        const data = matchedData(req);
        // setup the data
        const newData = {
            id: uuidv4(),
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            gender: data.gender,
            ip_address: data.ip_address || null,
        };

        try {
            const filePathSetup = path.resolve(__dirname, '../data', 'users.data.json');

            // Use the writeContent function to append new data
            await writeContent(filePathSetup, newData);

            return res.status(201).json({ message: 'Data stored successfully', data: newData });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
];

usersController.getUserById = async (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line no-restricted-globals
    const parseId = isNaN(id) ? id : parseInt(id, 10);

    try {
        const filePathSetup = path.resolve(__dirname, '../data', 'users.data.json');
        const content = await readContent(filePathSetup); // read the content
        const users = JSON.parse(content); // parse the content

        // find the user by ID
        const findUser = users.find((user) => user.id === parseId);

        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User found', data: findUser });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

usersController.updateUserSpecificInfo = async (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line no-restricted-globals
    const parseId = isNaN(id) ? id : parseInt(id, 10);

    try {
        const filePathSetup = path.resolve(__dirname, '../data', 'users.data.json');
        const content = await readContent(filePathSetup); // read the content
        const users = JSON.parse(content); // parse the content

        // find the user by ID
        const userIndex = users.findIndex((user) => user.id === parseId);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        // update the user's information with the new data
        const updatedUser = { ...users[userIndex], ...req.body };
        users[userIndex] = updatedUser;

        // write the updated content back to file
        await writeContent(filePathSetup, users);
        return res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

usersController.updateUserAllInfo = async (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line no-restricted-globals
    const parseId = isNaN(id) ? id : parseInt(id, 10);

    try {
        const filePathSetup = path.resolve(__dirname, '../data', 'users.data.json');
        const content = await readContent(filePathSetup); // read the content
        const users = JSON.parse(content); // parse the content

        // find the user by ID
        const userIndex = users.findIndex((user) => user.id === parseId);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        // update the user's information with the new data
        const updatedUser = { id: uuidv4(), ...req.body };
        users[userIndex] = updatedUser;

        // write the updated content back to file
        await writeContent(filePathSetup, users);
        return res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

usersController.deleteUser = async (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line no-restricted-globals
    const parseId = isNaN(id) ? id : parseInt(id, 10);

    try {
        const filePathSetup = path.resolve(__dirname, '../data', 'users.data.json');
        const content = await readContent(filePathSetup); // read the content
        const users = JSON.parse(content); // parse the content

        // find the user by ID
        const userIndex = users.findIndex((user) => user.id === parseId);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        // delete the user
        const deletedUser = users.splice(userIndex, 1);

        // write the updated content back to file
        await writeContent(filePathSetup, users);
        return res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = usersController;
