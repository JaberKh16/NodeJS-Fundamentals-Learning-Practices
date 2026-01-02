const proertiesOptions = require('./properties-module');
const utltitiesFunction = require('./property-utitity-functions');

console.log(proertiesOptions);

// destructing context access
const bugFixesArray = proertiesOptions.bugFixes;
const [feature1, feature2, feature3] = bugFixesArray;
console.log(feature1, feature2, feature3);

const featureOptions = proertiesOptions.options;
const { libraryName, libraryVersion, getLibraryInfo } = featureOptions;
console.log(`${libraryName} ${libraryVersion} ${getLibraryInfo()}`);

// property context access
const libNameInfo = proertiesOptions.options.getLibraryInfo();
console.log(libNameInfo);

// calling function - proerty context access
const libraryInfoCall = utltitiesFunction.getLibraryInfo(proertiesOptions.options);
console.log(libraryInfoCall);
const featuresInfoCall = utltitiesFunction.newUpdateFeatures();
console.log(featuresInfoCall);
