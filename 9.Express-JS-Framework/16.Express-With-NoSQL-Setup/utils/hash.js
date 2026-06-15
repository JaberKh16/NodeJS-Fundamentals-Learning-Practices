const crypto = require('crypto');

async function hashPasswordScrypt(password, salt = null) {
    return new Promise((resolve, reject) => {
        const useSalt = salt || crypto.randomBytes(16).toString('hex');
        
        // scrypt parameters
        const keyLength = 64;
        const options = {
            N: 16384, // CPU/memory cost parameter (must be power of 2)
            r: 8,     // Block size
            p: 1      // Parallelization factor
        };
        
        crypto.scrypt(password, useSalt, keyLength, options, (err, derivedKey) => {
            if (err) reject(err);
            resolve({
                hash: derivedKey.toString('hex'),
                salt: useSalt,
                options
            });
        });
    });
}

async function verifyPasswordScrypt(password, hash, salt, options) {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 64, options, (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex') === hash);
        });
    });
}

module.exports = {
    hashPasswordScrypt,
    verifyPasswordScrypt
};