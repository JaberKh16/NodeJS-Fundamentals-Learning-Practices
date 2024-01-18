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
        b. writeFileSync(path, 'content', {flag: 'opt'})  --> to write to the file

    Note: writeFileSync() returns 'undefined' as its return value


    Asynchronous Block Way
    ----------------------
    This provides two functions to work with files which are
    the following:
        a. readFile(path, 'encoding', callback)                  --> to read the file
        b. writeFile(path, 'content', callback, {flag: 'opt'})   --> to write to the file

    Note: writeFileSync() returns 'undefined' as its return value
    
*/ 
