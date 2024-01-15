const options = require('./properties-module');
const features = require('./property-utitity-functions');
console.log(options);
console.log(features);

// destructing context access
const [first, second, third ] = features;
const { libName, libVersion, libTotalInfo } = options;


// property context access
const libNameInfo = options.getLibraryInfo();
console.log(libNameInfo);


// calling function - proerty context access
const libraryInfoCall = getLibraryInfo(options);
console.log(libraryInfoCall);
const featuresInfoCall = newUpdateFeatures();
console.log(featuresInfoCall);