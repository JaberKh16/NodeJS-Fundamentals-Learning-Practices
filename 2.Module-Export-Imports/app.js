const proerties_options = require('./properties-module');
const utltitiesFunction = require('./property-utitity-functions');

console.log(proerties_options);

// destructing context access
const bugFixesArray = proerties_options.bugFixes;
const [feature1, feature2, feature3] = bugFixesArray;
console.log(feature1, feature2, feature3);

const feature_options = proerties_options.options;
const { libraryName, libraryVersion, getLibraryInfo } = feature_options;
console.log(`${libraryName} ${libraryVersion} ${getLibraryInfo()}`);

// property context access
const libNameInfo = proerties_options.options.getLibraryInfo();
console.log(libNameInfo);

// calling function - proerty context access
const libraryInfoCall = utltitiesFunction.getLibraryInfo(proerties_options.options);
console.log(libraryInfoCall);
const featuresInfoCall = utltitiesFunction.newUpdateFeatures();
console.log(featuresInfoCall);
