const fs = require('fs');
const path = require('path');

const lib = {};
// base direcory of the data folder
lib.basedir = path.join(__dirname, '../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
    // open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);
            // wirte data to file and close it
            fs.writeFile(fileDescriptor, stringData, (errorWriting, dataFileDescriptor) => {
                if (!errorWriting) {
                    fs.close(dataFileDescriptor, (errorClosing) => {
                        if (!errorClosing) {
                            callback(false);
                        } else {
                            callback('Error closing file..');
                        }
                    });
                } else {
                    callback('Error in writing.');
                }
            });
        } else {
            callback(err);
        }
    });
};
// reading data to file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, fileData) => {
        callback(err, fileData);
    });
};
// update to file
lib.update = (dir, file, data, callback) => {
    // open the file
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert the data to string
            const stringData = JSON.stringify(data);
            // truncate the file
            fs.ftruncate(fileDescriptor, (errTruncating) => {
                if (!errTruncating) {
                    fs.writeFile(fileDescriptor, stringData, (errWriting) => {
                        if (!errWriting) {
                            fs.close(fileDescriptor, (errClosing) => {
                                if (!errClosing) {
                                    callback(false);
                                } else {
                                    callback('Error closing file.');
                                }
                            });
                        } else {
                            callback('Error in writing.');
                        }
                    });
                } else {
                    callback('Error truncating file..');
                }
            });
        } else {
            callback(err);
        }
    });
};
// deleting file
lib.delete = (dir, file, callback) => {
    // unlink file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Error deleting file.');
        }
    });
};
module.exports = lib;
