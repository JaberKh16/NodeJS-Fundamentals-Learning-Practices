const fs = require('fs');
const path = require('path');

// create a write stream (in append mode)
// eslint-disable-next-line arrow-body-style
const accessLogStream = () => {
    return fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' });
};

module.exports = accessLogStream;
