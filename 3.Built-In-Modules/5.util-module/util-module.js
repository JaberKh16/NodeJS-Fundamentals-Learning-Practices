const {readFile, writeFile} = require('fs');
const util = require('util');
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);
const path = require('path');

// async function
const fileReadWrite = async (path) =>{
    try {
        const filePath = path.join(__dirname, 'files', 'text-1.txt');
        const readingContent = await readFilePromise(filePath, 'utf8');
        const textContent = "Something is fissy";
        const writindContent = await writeFilePromise(
            filePath,
            textContent,
            {flag: 'a'}
        );
        console.log(readingContent);
    } catch (error) {
        console.log(error.message);
    }
}

fileReadWrite(path);