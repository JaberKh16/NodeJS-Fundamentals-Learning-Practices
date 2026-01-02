const VERSION_UPDATE = '12.0.2';
const bugFixes = ['Callback Hell', 'Promises Hell', 'Inhertiance Generator'];
const options = {
    libraryName: 'remixjs',
    libraryVersion: '12.2.0',
    getLibraryInfo(){
        return this.libraryName + ' ' + this.libraryVersion;
    }
}

// exporting the properties
module.exports = VERSION_UPDATE;
module.exports = { bugFixes, options };