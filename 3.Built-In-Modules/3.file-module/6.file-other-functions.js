/*
    NodeJS Module Concept - 'fs' Module
    ===================================
    NodeJS provides 'fs' module to work with the files. Its basically provides two ways of
    implementation when working with files which are the following:
        a. Synchronous Non-Block Way
        b. Asynchronous Block Way

    Synchronous Files Related Other Methods
    ----------------------------------------
    This provides two functions to work with files which are the following:
        a. cpSync(srcUrl, destUrl, )
            --> to copy of src file to destination file
        b. makedirSync(path, options: ?{recursive: boolean })
            --> to make a directory or if its fails return an exception
        c. readirSync(path, options: { encoding, withFileTypes, recursive: boolean })
            --> to list files of a directory
        d. opendirSync(path, options: { file.OpenDirOptions })
            --> to open a directory

*/

const path = require('path');
const fs = require('fs');

// Define paths
const dirPath = path.join(__dirname, './files/', 'directory');
const srcFilePath = path.resolve(__dirname, './files/', 'text-1.txt');
const destFilePath = path.resolve(__dirname, './files/directory/', 'text-1-copy.txt');

try {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(`Directory created: ${dirPath}`);
    }

    // Copy the file
    fs.cpSync(srcFilePath, destFilePath);
    console.log(`File copied from ${srcFilePath} to ${destFilePath}`);

    // Read files in the directory
    const readDirFiles = fs.readdirSync(dirPath);
    console.log('Files in directory:', readDirFiles);
} catch (err) {
    console.error('Error:', err.message);
}
