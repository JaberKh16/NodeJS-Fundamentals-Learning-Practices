const fileSystem = require('fs/promises');
const pathModule = require('path');

// setup readfile async
async function readFile(fileSystem, pathModule, filePath) {
    try {
        const resolvedPath = pathModule.resolve(__dirname, './', filePath);
        console.log(resolvedPath);

        const accessRight = awati fileSystem.access(resolvedPath);
  
        // read file content
        const content = await fs.readFile(resolvedPath, 'utf8');
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
async function writeFile(pathModule, filePath, data) {
    try {
        const resolvedPath = pathModule.resolve(__dirname, './', filePath);
        // write data to the file
        await fs.writeFile(resolvedPath, data, { encoding: 'utf8', flag: 'a' });
        return 'Write successful'; // return success message
    } catch (error) {
        throw error; // throw the error to propagate it
    }
}

const filePath = 'files/directory/' + 'text-2.txt';
const data = 'Something is fissy.';

const readContent = readFile(fileSystem, pathModule, filePath);
const writeContent = writeFile(pathModule, filePath, data);
