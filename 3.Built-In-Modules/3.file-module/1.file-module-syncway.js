/*
    NodeJS Module Concept - 'fs' Module
    ===================================
    NodeJS provides 'fs' module to work with the files. Its basically provides two ways of implementation
    when working with files which are the following:
        a. Synchronous Non Block Way
        b. Asynchronous Block Way

    Synchronous Non Block Way
    -------------------------
    This provides two functions to work with files which are the following:
        a. readFileSync(path, 'encoding')                  --> to read the file
        b. writeFileSync(path, 'content', {flag: 'opt'})  --> to write to the file

    Note: writeFileSync() returns 'undefined' as its return value

*/
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files', 'text-1.txt');
const fileContent = readFileSync(filePath, 'utf-8');
console.log(fileContent);

const newFilePath = path.join(__dirname, 'files', 'text-2.txt');
const writeContent = writeFileSync(newFilePath, fileContent);
console.log(writeContent);

const appendContent = writeFileSync(newFilePath, 'Something more to append to files', {
    flag: 'a', // flag 'a' to tell the writeFileSync() to work as append mode
});
console.log(appendContent);
