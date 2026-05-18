const crypto = require('crypto');

// Synchronous HMAC
function createHmacSync(key, data) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data);
    return hmac.digest('hex');
}

const key =crypto.randomBytes(32).toString('hex');
const data = 'Hello, World!';
const hmacSync = createHmacSync(key, data);
console.log('Synchronous HMAC:', hmacSync);

// Asynchronous HMAC
function createHmacAsync(key, data, callback) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data);
    hmac.digest('hex', callback);
}

createHmacAsync(key, data, (err, hmacAsync) => {
    if (err) {
        console.error('Error creating HMAC:', err);
        return;
    }
    console.log('Asynchronous HMAC:', hmacAsync);
});