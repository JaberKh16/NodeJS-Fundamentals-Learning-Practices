const crypto = require('crypto');

async function hashPasswordScrypt(password, salt = null) {
    return new Promise((resolve, reject) => {
        const useSalt = salt || crypto.randomBytes(16).toString('hex');
        
        // scrypt parameters
        const keyLength = 64;  // This needs to be stored separately
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
                keyLength,  // ADD THIS - store keyLength separately
                options
            });
        });
    });
}

async function verifyPasswordScrypt(password, hash, salt, keyLength, options) {
    return new Promise((resolve, reject) => {
        // Validate parameters
        if (!keyLength || typeof keyLength !== 'number') {
            reject(new Error(`Invalid keyLength: ${keyLength}. Must be a number.`));
            return;
        }
        
        if (!options || typeof options !== 'object') {
            reject(new Error(`Invalid options: ${options}. Must be an object.`));
            return;
        }
        
        crypto.scrypt(password, salt, keyLength, options, (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex') === hash);
        });
    });
}

module.exports = {
    hashPasswordScrypt,
    verifyPasswordScrypt
};