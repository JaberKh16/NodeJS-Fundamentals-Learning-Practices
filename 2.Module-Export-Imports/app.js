const proerties_options = require('./properties-module');
const utltitiesFunction = require('./property-utitity-functions');
console.log(proerties_options);


// destructing context access
const bugFixesArray  = proerties_options.bugFixes;
const [feaure1, feature2, feature3] = bugFixesArray;
const { libName, libVersion, libTotalInfo } = proerties_options.options;
console.log(libName + " " + libVersion + " " + libTotalInfo);



// property context access
const libNameInfo = proerties_options.options.getLibraryDetails;
console.log(libNameInfo);


// calling function - proerty context access
const libraryInfoCall = utltitiesFunction.getLibraryInfo(proerties_options);
console.log(libraryInfoCall);
const featuresInfoCall = utltitiesFunction.newUpdateFeatures();
console.log(featuresInfoCall);