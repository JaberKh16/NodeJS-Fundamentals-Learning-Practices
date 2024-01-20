const fs = require('fs/promises');
const pathModule = require('path');

async function readFile(filePath) {
    try {
        const resolvedPath = pathModule.resolve(__dirname, '..', filePath);
        const content = await fs.readFile(resolvedPath, 'utf8');
        return content;
    } catch (error) {
        return error;
    }
}

async function writeFile(filePath) {
    try {
        const resolvedPath = pathModule.resolve(__dirname, '..', filePath);
        const content = await fs.writeFile(resolvedPath, 'utf8', {flag: 'a'});
        return content;
    } catch (error) {
        return error;
    }
}
