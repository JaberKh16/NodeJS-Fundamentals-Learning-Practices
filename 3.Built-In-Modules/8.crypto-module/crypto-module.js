const crypto = require('crypto');
// synchronous
crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512');
console.log('Hash: ', Date.now());

// asynchronous
const MAX_CALLS = 2;
// eslint-disable-next-line no-plusplus
for (let i = 0; i < MAX_CALLS; i++) {
    crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
        console.log(`Hash: ${i + 1}`, Date.now());
    });
}
