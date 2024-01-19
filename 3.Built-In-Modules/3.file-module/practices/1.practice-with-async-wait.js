const { readFile } = require('fs');
const path = require('path');

const readContent = async() => {
    
    const filePath = path.join(__dirname, 'files', 'text-1.txt');
    
    try {
        if (path.extname(filePath) === '.txt') {
            const content = await readFile(filePath, 'utf8',(resolve, reject) => {
                resolve(content);
            });
            return content;
        } else {
            return new Error('File is not a text file');
        }
    } catch (err) {
        return err;
    }
    
};

// Example usage:
const readingContent =  readContent();
console.log(readingContent);