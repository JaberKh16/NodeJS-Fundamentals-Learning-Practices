const getLibraryInfo = (libObj) => {
    const name = libObj.name;
    const version = libObj.version;
    console.log(`Library Name: ${name} Version: ${version}`);
}

const newUpdateFeatures = function(){
    for(let features of Array.from(arguments)) {
        console.log(features);
    }
}