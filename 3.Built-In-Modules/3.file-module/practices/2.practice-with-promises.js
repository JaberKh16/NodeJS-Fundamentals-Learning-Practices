/*
    Example-1: Promise Based 'fs' Module
*/

const {readFile, writeFile} = require('fs').promises;
const path = require('path');

// async function
const fileReadWrite = async (path) =>{
    try {
        const filePath = path.join(__dirname, '../files', 'text-1.txt');
        const readingContent = await readFile(filePath, 'utf8');
        const textContent = "Something is fissy";
        const writindContent = await writeFile(
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