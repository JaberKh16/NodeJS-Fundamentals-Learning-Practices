const getLibraryInfo = (libObj) => {
    const { name } = libObj;
    const { version } = libObj;
    console.log(`Library Name: ${name} Version: ${version}`);
};

const newUpdateFeatures = function () {
    for (const features of Array.from(arguments)) {
        console.log(features);
    }
};

module.exports = { getLibraryInfo, newUpdateFeatures };
