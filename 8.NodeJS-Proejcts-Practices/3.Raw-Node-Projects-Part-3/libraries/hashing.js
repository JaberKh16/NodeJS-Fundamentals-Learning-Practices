// dependencies
const crypto = require('crypto');

const hashUtilities = {};

hashUtilities.hash = (passedString) => {
    let hashedOutput = {};
    const secretKey = 'sfuhsufhshfs';
    if (typeof passedString === 'string' && passedString.length > 0) {
        try {
            hashedOutput = crypto
                .createHmac('sha256', secretKey)
                .update(passedString)
                .digest('hex');
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    return hashedOutput;
};

module.exports = hashUtilities;
