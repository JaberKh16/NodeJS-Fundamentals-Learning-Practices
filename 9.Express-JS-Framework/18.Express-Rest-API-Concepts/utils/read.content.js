const fs = require('fs/promises');
const path = require('path');

// Resolve the file path
// const filePath = path.resolve(__dirname, '../data', 'users.data.json');

const readContent = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        // Return an empty array if the file is empty
        return data || '[]';
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
};

module.exports = readContent;
