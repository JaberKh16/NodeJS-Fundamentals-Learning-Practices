/*
    NodeJS Module Concept - 'path' Module
    =====================================
    NodeJS provides 'path' module to work with the path
    related working in the system.

    'path' Module Properties
    ------------------------
    a. path.sep --> returns the path sepator depending on os type

    'path' Module Methods
    ---------------------
    a. path.join(...paths: string[]) 
        - returns the path by joining multiple path segments. It populates 
        all path module-related properties and methods, providing a clean 
        and cross-platform way to construct file paths.
    b. path.
*/

const path = require('path');
// console.log(path);

// working with path module properties
const pathSeparator = path.sep;
console.log(pathSeparator);

// working with path module some functions
const pathJoining = path.join('files', 'text-1');
console.log(pathJoining);