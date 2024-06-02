const express = require('express');
const { validationResult, checkSchema } = require('express-validator');
const users = require('../data/users-data');
const userValidationSchema = require('../validation/user.validation.schema');

const routes = express.Router();

// setup json parser middlware
routes.use(express.json());

routes.get('/api/users', (req, res) => {
    res.send({ users });
});

routes.get('/api/users/filter', checkSchema(userValidationSchema), (req, res) => {
    const { filterCriteria, value } = req.query;

    // get the error info from express-validator middleware
    const resultErr = validationResult(req);
    if (!resultErr.isEmpty()) {
        return res.status(400).json({ errors: resultErr.array() });
    }

    // filter users based on criteria
    if (filterCriteria && value) {
        const filteredUsers = users.usersInfo.filter((user) => {
            const userProperty = user[filterCriteria];
            if (typeof userProperty === 'string') {
                return userProperty.includes(value);
            }
            if (Array.isArray(userProperty)) {
                return userProperty.includes(value);
            }
            return false; // no matching property found
        });

        if (filteredUsers.length === 0) {
            return res.status(404).json({ error: 'No users found matching the criteria' });
        }

        return res.status(200).json(filteredUsers);
    }
    return res.status(400).json({ error: 'Filter criteria and value must be provided' });
});

module.exports = routes;
