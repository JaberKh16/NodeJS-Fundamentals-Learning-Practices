/* eslint-disable no-useless-concat */
/* eslint-disable no-useless-catch */
const fs = require('fs/promises');
const path = require('path');

// setup readfile async
async function readFile(fileSystem, pathModule, filePath) {
    try {
        const resolvedPath = pathModule.resolve(__dirname, './', filePath);
        console.log(resolvedPath);

        await fileSystem.access(resolvedPath); // Ensure file is accessible

        // read file content
        const content = await fileSystem.readFile(resolvedPath, 'utf8');
        return content; // return the content
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`File not found: ${filePath}`);
        } else {
            console.error(`Error reading file: ${error.message}`);
        }
        throw error; // Throw the error to propagate it
    }
}

// setup writefile async
async function writeFile(fileSystem, pathModule, filePath, data) {
    try {
        const resolvedPath = pathModule.resolve(__dirname, './', filePath);
        // write data to the file
        await fileSystem.writeFile(resolvedPath, data, { encoding: 'utf8', flag: 'a' });
        console.log('Write successful'); // log the success message
    } catch (error) {
        throw error; // throw the error to propagate it
    }
}

const filePath = 'files/directory/' + 'text-2.txt';
const data = 'Something is fishy.';

async function main() {
    try {
        const readContent = await readFile(fs, path, filePath);
        console.log('Read content:', readContent);

        await writeFile(fs, path, filePath, data);
        console.log('Data has been written.');
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

main();
