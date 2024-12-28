// Ex-1 Single Line Exports

// string variable
module.exports.VERSION_UPDATE = '12.0.2';
// array
module.exports.bugFixes = ['Callback Hell', 'Promises Hell', 'Inhertiance Generator'];
// object
module.exports.options = {
    libraryName: 'remixjs',
    libraryVersion: '12.2.0',
    getLibraryInfo() {
        return `${this.libraryName} ${this.libraryVersion}`;
    },
};
