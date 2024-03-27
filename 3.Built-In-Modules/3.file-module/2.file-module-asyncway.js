/*
    NodeJS Module Concept - 'fs' Module
    ===================================
    NodeJS provides 'fs' module to work with the files. Its basically provides two ways of implementation
    when working with files which are the following:
        a. Synchronous Block Way
        b. Asynchronous Block Way
    
    Synchronous Block Way
    --------------------
    This provides two functions to work with files which are the following:
        a. readFileSync(path, 'encoding')                  --> to read the file
        b. writeFileSync(path, 'content', {flag: 'opt'})  --> to write to the file

    Note: writeFileSync() returns 'undefined' as its return value


    Asynchronous Block Way
    ----------------------
    This provides two functions to work with files which are the following:
        a. readFile(path, 'encoding', callback)                  --> to read the file
        b. writeFile(path, 'content', callback, {flag: 'opt'})   --> to write to the file

    Note: writeFileSync() returns 'undefined' as its return value
    
*/ 

const {readFile, writeFile} = require('fs');

const readContent = () =>{
    return new Promise((resolve, reject) =>{
        const path = require('path');
        const filePath = path.join(__dirname, 'files', 'text-1.txt');
        if(path.extname(filePath) === '.txt'){
            const readContent = readFile(filePath, 'utf8', (err, content) =>{
                if(err){
                    new Error(err.message);
                }else{
                    resolve(content);
                } 
            });
        }else{
            reject(new Error('Not a .txt file'));
        }
    });
};

const writeContent = () =>{
    return new Promise((resolve, reject) =>{
        const path = require('path');
        const filePath = path.join(__dirname, 'files', 'text-2.txt');
        if(path.extname(filePath) === '.txt'){
            const content = "Something is fissy";
            const writeContent = writeFile(filePath, content, (err, content)=>{
                if(err){
                    reject(new Error(err.message));
                }else{
                    resolve(content);
                }
            }); 
        }else{
            reject(new Error('Not a .txt file'));
        }
    })
}

// reading content thenable
readContent()
.then((result)=>{
    console.log(result);
})
.catch((error) =>{
    console.log(error);
})

// writiing content thenable
writeContent()
.then((result)=>{
    console.log(result);
})
.catch((error) =>{
    console.log(error);
})