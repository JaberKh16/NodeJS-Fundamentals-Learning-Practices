/*
    NodeJS Global Objects
    =====================
    'module' is one of the Global Object in NodeJS which contains some properties
    to be work with. Among them one of them is 'exports:{}', object which is
    used to export resources from one file to another. Now, remember in NodeJS
    every single files in module though NodeJS is modular based library.

*/

const globalModuleObject = module;
console.log(globalModuleObject);