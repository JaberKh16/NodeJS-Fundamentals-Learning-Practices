/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
// dependencies
const { parseJSON } = require('../../helpers/utitlities');
const dataLib = require('../../libraries/data');
const hashLib = require('../../libraries/hashing');
const tokenHandler = require('../../libraries/token-generator');

/* eslint-disable no-underscore-dangle */
const handlers = {};

handlers.tokenHandlers = (requestProperties, callback) => {
    const accepdtedMethod = ['get', 'post', 'put', 'delete'];
    if (accepdtedMethod.indexOf(requestProperties.method) > -1) {
        handlers._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405); // to reject as status code 405
    }
};

// making token
handlers._token = {};

handlers._token.get = (requestProperties, callback) => {
    const id = typeof requestProperties.body.id === 'string' && requestProperties.body.id.length === 25 ? requestProperties.body.id : false;
    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.length > 0 ? requestProperties.body.password : false;
    if (id) {
        // store the token
        dataLib.read('tokens', id, (errorReading, tokenData) => {
            const token = { ...parseJSON(tokenData) };
            if (!errorReading && token) {
                callback(200, token);
            } else {
                callback(400, {
                    error: 'There was a problem in token request.',
                });
            }
        });
    } else {
        callback(400, {
            error: 'token was not valid.',
        });
    }
};

handlers._token.post = (requestProperties, callback) => {
    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.length === 11 ? requestProperties.body.phone : false;
    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.length > 0 ? requestProperties.body.password : false;
    if (phone && password) {
        dataLib.read('users', phone, (error, data) => {
            const hashedPass = hashLib(password);
            const parsedPass = parseJSON(data.userPass);
            if (hashedPass === parsedPass) {
                const tokenId = tokenHandler.createRandomToken(25);
                const expiresTime = Date.now() + 60 * 60 * 1000;
                const tokenObject = {
                    phoneNumber: data.phone,
                    id: tokenId,
                    expires: expiresTime,
                };

                // store the token
                data.create('tokens', tokenId, tokenObject, (errorCreating) => {
                    if (!errorCreating) {
                        callback(200, tokenObject);
                    } else {
                        callback(400, {
                            error: 'There was problem in request.',
                        });
                    }
                });
                } else {
                    callback(400, {
                        error: 'Password is not valid.',
                    });
                }
    });
    } else {
        callback(400, {
            error: 'You have a problem in your request.',
        });
    }
};

handlers._token.put = (requestProperties, callback) => {
    const id = typeof requestProperties.body.id === 'string' && requestProperties.body.id.length === 25 ? requestProperties.body.id : false;
    const extendTime = typeof requestProperties.body.extendTime === 'boolean';
    if (id && extendTime) {
        dataLib.read('tokens', id, (error, tokenData) => {
            const tokenObject = parseJSON(tokenData);
            if (tokenObject.expires > Date.now()) {
                tokenObject.expires = Date.now() * 60 * 60 * 1000;
                // update the token expires
                dataLib.update('tokens', id, tokenObject, (errorUpdating) => {
                    if (!errorUpdating) {
                        callback(200, {
                            message: 'Token info updated.',
                        });
                    } else {
                        callback(500, {
                            error: 'There was a server side error.',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'Token already expired.',
                });
            }
        });
    } else {
        callback(400, {
            error: 'There was a problem in your request.',
        });
    }
};

handlers._token.delete = (requestProperties, callback) => {
    const id = typeof requestProperties.body.id === 'string' && requestProperties.body.id.length === 25 ? requestProperties.body.id : false;
    if (id) {
        // lookup for the data
        dataLib.read('tokens', id, (error, userData) => {
            if (!error && userData) {
                dataLib.delete('users', id, (errorDeletion) => {
                    if (!errorDeletion) {
                        callback(200, {
                            error: 'Token deleted successfully.',
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
            error: 'Invalid token, please try again.',
        });
    }
};

handlers._token.verify = (id, phone, callback) => {
    dataLib.read('tokens', id, (error, tokenData) => {
        if (!error && tokenData) {
            const token = parseJSON(tokenData);
            if (token.phone === phone && token.expires > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
};

module.exports = handlers;
