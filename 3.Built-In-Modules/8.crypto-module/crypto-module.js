const crypto = require('crypto');

// Synchronous
crypto.pbkdf2Sync('password', 'salt', 100000, 512, 'sha512');
console.log('Synchronous Hash:', Date.now());

// Asynchronous
const MAX_CALLS = 2;
for (let i = 0; i < MAX_CALLS; i++) {
    // Use `let` for block scoping
    crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
        console.log(`Asynchronous Hash ${i + 1}:`, Date.now());
    });
}
