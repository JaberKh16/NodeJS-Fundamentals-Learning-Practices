/*
    The code you provided seems correct for obtaining the directory
    name of the main module's filename using the path module.
    The path.dirname() function is used to get the directory name from
    a given path. In this case, process.mainModule.filename provides
    the absolute path of the main module's filename, and
    path.dirname() extracts the directory name from that path.
*/
const path = require('path');

// const filePath = path.dirname(process.mainModule.filename);
const filePath = path.join(__dirname, '../', 'public');

console.log(filePath);
module.exports = filePath;
