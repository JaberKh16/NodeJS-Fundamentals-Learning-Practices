module.exports.VERSION_UPDATE = '12.0.2';
module.exports.bugFixes = ['Callback Hell', 'Promises Hell', 'Inhertiance Generator'];
module.exports.options = {
    libraryName: 'remixjs',
    libraryVersion: '12.2.0',
    getLibraryInfo(){
        return this.libraryName + ' ' + this.libraryVersion;
    }
}
