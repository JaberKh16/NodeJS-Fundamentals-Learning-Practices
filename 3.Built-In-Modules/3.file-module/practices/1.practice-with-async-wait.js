const { readFile } = require('fs').promises;
const path = require('path');

const readContent = async() => {
    
    const filePath = path.resolve(__dirname, '../files', 'text-1.txt');
    
    try {
        if (path.extname(filePath) === '.txt') {
            const content = await readFile(filePath, 'utf8');
            return content; // returing a promise
        }
    } catch (err) {
        return err;
    }
    
};

// Example usage:
(async () => {
    try {
        const readingContent = await readContent();
        console.log(readingContent);
    } catch (error) {
        console.error(error);
    }
})();
