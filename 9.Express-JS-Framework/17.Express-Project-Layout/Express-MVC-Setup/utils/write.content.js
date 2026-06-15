const fs = require('fs/promises');
const path = require('path');
const readContent = require('./read.content');

// Resolve the file path
// const filePath = path.resolve(__dirname, '../data', 'users.data.json');

const writeContent = async (filePath, newData) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const resolvedPath = path.resolve(filePath);
        const data = await readContent(resolvedPath);

        let content = [];
        if (data) {
            content = JSON.parse(data);
        }

        // append the new data
        content.push(newData);

        // write the updated content back to file
        await fs.writeFile(resolvedPath, JSON.stringify(content, null, 2), { encoding: 'utf8' });
        return 'Write successful';
    } catch (error) {
        throw error; // throw the error to propagate it
    }
};

module.exports = {
    writeContent,
};
