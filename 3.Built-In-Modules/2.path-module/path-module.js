/*
    NodeJS Module Concept - 'path' Module
    =====================================
    NodeJS provides 'path' module to work with the path related working in the system.

    'path' Module Properties
    ------------------------
    a. path.sep --> returns the path sepator depending on os type

    'path' Module Methods
    ---------------------
    a. path.join(...paths: string[])
        - returns the path by joining multiple path segments. It populates
        all path module-related properties and methods, providing a clean
        and cross-platform way to construct file paths.
    b. path.extname(pathfragments)
        - returns the file extension name. If specified path fragments has the
        extension then gives the extension, otherwise nothing returns.
    c. path.basename(pathfragments)
        -returns the last portion of the specified path basically the current file name.
    d. path.parse(path)
        - returns the object which represents the significant info for the
        specified path.
    e. path.format(path)
        - returns the path formatted.
    f. path.isAbsolute(path)
        - checks if the specified path is abosute and resulted boolean.
    g. path.resolve(path)
        - returns the resolve of the specified path and returns the
        absolute path
    h. path.dirname(path)
        - returns the specified path directory name
*/

const path = require('path');
// console.log(path);

// working with path module properties
const pathSeparator = path.sep;
console.log(pathSeparator);

// working with path module some functions
// join()
const pathJoining = path.join('files', 'text-1.txt');
console.log(pathJoining);
// extname()
const fileExtension = path.extname(pathJoining);
console.log(fileExtension);
