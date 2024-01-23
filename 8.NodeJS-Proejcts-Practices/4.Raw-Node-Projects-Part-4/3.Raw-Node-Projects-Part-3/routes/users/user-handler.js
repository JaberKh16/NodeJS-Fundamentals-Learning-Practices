/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
// dependencies
const { parseJSON } = require('../../helpers/utitlities');
const dataLib = require('../../libraries/data');
const hashLib = require('../../libraries/hashing');
const { tokenHandlers } = require('../token/token-handler');

/* eslint-disable no-underscore-dangle */
const handlers = {};

handlers.userHandlers = (requestProperties, callback) => {
    const accepdtedMethod = ['get', 'post', 'put', 'delete'];
    if (accepdtedMethod.indexOf(requestProperties.method) > -1) {
        handlers._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405); // to reject as status code 405
    }
};

// making users
handlers._users = {};

handlers._users.get = (requestProperties, callback) => {
    // check the phone number is valid
    const phone = typeof requestProperties.queryString.phone === 'string'
        && requestProperties.queryString.phone.trim().length === 11
            ? requestProperties.queryString.phone
            : false;
    if (phone) {
        // verify token
        const token = typeof requestProperties.headers.token === 'string' ? requestProperties.headers.token : false;
        tokenHandlers._token.verify(token, token, (tokenId) => {
            if (tokenId) {
                // look up the user
                dataLib.read('users', phone, (error, userData) => {
                    const user = { ...parseJSON(userData) };
                    if (!error && userData) {
                        delete user.userPass;
                        callback(200, user);
                    } else {
                        callback(404, {
                            error: 'Requested user not found.',
                        });
                    }
                });
            } else {
                callback(403, {
                    error: 'Authentication failure.',
                });
            }
        });
    } else {
        callback(404, {
            error: 'Invalid phone number',
        });
    }
};

handlers._users.post = (requestProperties, callback) => {
    const firstName = typeof requestProperties.body.firstName === 'string';
    requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
    const lastName = typeof requestProperties.body.lastName === 'string';
    requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
    const password = typeof requestProperties.body.password === 'string';
    requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
    const phone = typeof requestProperties.body.phone === 'string';
    requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
    const tosAgreements = typeof requestProperties.body.tosAgreements === 'boolean';
    requestProperties.body.tosAgreements.trim().length > 0
        ? requestProperties.body.tosAgreements
        : false;

    if (firstName && lastName && phone && password && tosAgreements) {
        // verify token
        const token = typeof requestProperties.headers.token === 'string' ? requestProperties.headers.token : false;
        tokenHandlers._token.verify(token, token, (tokenId) => {
            if (tokenId) {
                // check if the user already exist or not
                dataLib.read('users', phone, (error, userData) => {
                    if (error) {
                        const usersInfo = {
                            firstName,
                            lastName,
                            phone,
                            tosAgreements,
                            userPass: hashLib(password),
                        };
                        // store the user information
                        dataLib.create('users', phone, usersInfo, (errorCreate) => {
                            if (!errorCreate) {
                                callback(200, {
                                    message: 'Successfully created users.',
                                });
                            } else {
                                callback(500, {
                                    error: 'Couldnt create user.',
                                });
                            }
                        });
                    } else {
                        callback(500, {
                            error: 'There was a problem in server side',
                        });
                    }
                });
            } else {
                callback(403, {
                    error: 'Authentication failure.',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};

handlers._users.put = (requestProperties, callback) => {
    const firstName = typeof requestProperties.body.firstName === 'string';
    requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
    const lastName = typeof requestProperties.body.lastName === 'string';
    requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
    const password = typeof requestProperties.body.password === 'string';
    requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
    const phone = typeof requestProperties.body.phone === 'string';
    requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    if (phone) {
        if (firstName || lastName || password) {
            // lookup for user
            dataLib.read('users', phone, (error, userData) => {
                const user = userData;
                if (!error && userData) {
                    if (firstName) {
                        user.firstName = firstName;
                    }
                    if (lastName) {
                        user.lastName = lastName;
                    }
                    if (password) {
                        user.password = hashLib(password);
                    }
                    // now store the information
                    dataLib.update('users', phone, user, (errorUpdating) => {
                        if (!errorUpdating) {
                            callback(200, {
                                message: 'User updated successfully.',
                            });
                        } else {
                            callback(400, {
                                error: 'You have a problem in your request.',
                            });
                        }
                    });
                } else {
                    callback(400, {
                        error: 'You have a problem in your request.',
                    });
                }
            });
        } else {
            callback(400, {
                error: 'You have a problem in your request.',
            });
        }
    } else {
        callback(400, {
            error: 'Invalid phone number, please try again.',
        });
    }
};

handlers._users.delete = (requestProperties, callback) => {
    const phone = typeof requestProperties.body.phone === 'string';
    requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
    if (phone) {
        // lookup for the data
        dataLib.read('users', phone, (error, userData) => {
            if (!error && userData) {
                dataLib.delete('users', phone, (errorDeletion) => {
                    if (!errorDeletion) {
                        callback(200, {
                            error: 'User deleted successfully.',
                        });
                    } else {
                        callback(400, {
                            error: 'Unsuccessull deletion.',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was a problem in server side.',
                });
            }
        });
    } else {
        callback(400, {
            error: 'Invalid phone number,please try again.',
        });
    }
};

module.exports = handlers;
