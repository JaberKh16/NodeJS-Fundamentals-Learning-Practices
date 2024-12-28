/*
    NodeJS Global Objects
    =====================
    'module' is one of the Global Object in NodeJS which contains some properties
    to be work with. Among them one of them is 'exports:{}', object which is
    used to export resources from one file to another. Now, remember in NodeJS
    every single files in module though NodeJS is modular based library.

    Some Global Objects
    -------------------
    a. global
    b. __dirname
    c. __filename
    d. exports
    e. module
    f. require
    g. console
    h. process
    i. URL
    j. URLSearchParams
    k.WebAssembly
    l.TextEncode, TextDecorder
    m. setTimeout, setInterval,setIntermediate
    n. clearTimeout, clearInterval, clearIntermediate

*/

const globalModuleObject = module;
const currentDirectory = __dirname;
const runningFileName = __filename;
console.log(globalModuleObject);

// all globals
const allGlobals = {
    globalObj: global,
    __dirname,
    __filename,
    module,
    process,
    console,
    exports,
    WebAssembly,
    URL,
    URLSearchParams,
};

console.log(allGlobals);
