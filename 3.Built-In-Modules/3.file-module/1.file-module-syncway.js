/*
    NodeJS Module Concept - 'fs' Module
    ===================================
    NodeJS provides 'fs' module to work with the files.
    Its basically provides two ways of implementation
    when working with files which are the following:
        a. Synchronous Block Way
        b. Asynchronous Block Way
    
    Synchronous Block Way
    --------------------
    This provides two functions to work with files which are
    the following:
        a. readFileSync(path, 'encoding')                  --> to read the file
        b. writeFileSync(path, 'encoding', {flag: 'opt'})  --> to write to the file


*/
const {readFileSync, writeFileSync} = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files', 'text-1.txt');
console.log(filePath);
const fileContent = readFileSync(filePath, 'utf-8');
console.log(fileContent);

const newFilePath = path.join(__dirname, 'files', 'text-2.txt')
const writeContent = writeFileSync(newFilePath, 'utf-8');
console.log(writeContent);
const appendContent = writeFileSync(newFilePath, 'utf-8', {
    flag: 'a'
});
console.log(appendContent);