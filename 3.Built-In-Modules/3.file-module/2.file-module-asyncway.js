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

    Note: Both of the method returns 'undefined' as its return value
*/