/*
    Example-1: Callback Based 'fs' Module
*/

const { log } = require('console');
const fs = require('fs');
const path = require('node:path');

const readFile = () =>{
    const path = require('path');
    const filePath = path.resolve(__dirname, '../files', 'text-1.txt'); 
    const readContent = fs.readFile(filePath, 'utf8', 
    (error, data) => {
        if(error) throw error;
        console.log(data);
    });
    console,log(readContent);
}
// readFile();


const writeFile = () =>{
    const path = require('path');
    const filePath = path.resolve(__dirname, '../files', 'text-1.txt'); 
    const readContent = fs.writeFile(filePath, 'Hahahaha Funny!', 
        {flag: 'a'}, 
        (error, data) => {
            if(error) throw error;
            return data;
        }
    );
    console,log(readContent);
}
// writeFile();

const runFunc = function (type=1){
    switch(type){
        case 1:
            readFile();
            break;
        case 2:
            writeFile();
            break;
    }
}();