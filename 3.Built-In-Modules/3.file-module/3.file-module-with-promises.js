const fs = require('fs/promises');
const pathModule = require('path');

// setup readfile async
async function readFile(filePath) {
    try {
        const resolvedPath = path.resolve(__dirname, '..', filePath);
        // read file content
        const content = await fs.readFile(resolvedPath, 'utf8');
        return content; // return the content
    } catch (error) {
        throw error; // throw the error to propagate it
    }
}

// setup writefile async
async function writeFile(filePath, data) {
    try {
        const resolvedPath = path.resolve(__dirname, '..', filePath);
        // write data to the file
        await fs.writeFile(resolvedPath, data, { encoding: 'utf8', flag: 'a' });
        return "Write successful"; // return success message
    } catch (error) {
        throw error; // throw the error to propagate it
    }
}
