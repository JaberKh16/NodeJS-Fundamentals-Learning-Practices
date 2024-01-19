const fs = require('fs/promises');
const pathModule = require('path');

async function readFile(filePath) {
    try {
        const resolvedPath = pathModule.resolve(__dirname, '..', filePath);
        const content = await fs.readFile(resolvedPath, 'utf8');
        return content;
    } catch (error) {
        throw error;
    }
}

async function writeFile(filePath) {
    try {
        const resolvedPath = pathModule.resolve(__dirname, '..', filePath);
        const content = await fs.writeFile(resolvedPath, 'utf8', {flag: 'a'});
        return content;
    } catch (error) {
        throw error;
    }
}


const choice = function (type=2){
    switch(type){
        case 1:
            readFile('files/text-1.txt')
            .then(function(data) {
                console.log(data);
            })
            .catch(function(error) {
                console.error(error.message);
            });

            break;
        case 2:
            writeFile('files/text-2.txt')
            .then(function(data) {
                console.log(`Data written..`);
            })
            .catch(function(error) {
                console.error(error.message);
            });

            break;
    }
}();


