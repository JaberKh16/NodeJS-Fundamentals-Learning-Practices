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
   const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.length === 11 ? requestProperties.body.phone : false;
   const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.length > 0 ? requestProperties.body.password : false;
   if (phone && password) {
    dataLib.read('users', phone, (error, data) => {
        const hashedPass = hashLib(password);
        if (hashedPass === data.userPass) {
            const tokenId = tokenHandler.createRandomToken(25);
            const expiresTime = Date.now() + 60 * 60 * 1000;
            const tokenObject = {
                phoneNumber: data.phone,
                id: tokenId,
                expires: expiresTime,
            };

            // store the token
            data.create('tokens', tokenId, tokenObject, (error) => {
                if (!error) {
                    callback(200, tokenObject);
                } else {
                    callback(400, {
                        error: 'There was a problem in request/',
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

handlers._token.post = (requestProperties, callback) => {

};

handlers._token.put = (requestProperties, callback) => {

};

handlers._token.delete = (requestProperties, callback) => {

};

module.exports = handlers;
