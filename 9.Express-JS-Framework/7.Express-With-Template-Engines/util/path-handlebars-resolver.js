/* eslint-disable prettier/prettier */
const path = require('path');

const filePath = path.join(__dirname, '../views/', 'handlebars/');
// console.log(filePath);
// Assuming your Handlebars file is in the 'views/handlebars/layout' directory
const headerCompoent = path.resolve(
    __dirname,
    '../views/',
    'handlebars/',
    'layout',
    'header-layout.hbs',
);
const navbarCompoent = path.resolve(
    __dirname,
    '../views/',
    'handlebars/',
    'layout',
    'navbar-layout.pug',
);
const mainCompoent = path.resolve(
    __dirname,
    '../views/',
    'handlebars/',
    'layout',
    'main-layout.hbs',
);

const filePathObj = {
    filePath,
    headerCompoent,
    navbarCompoent,
    mainCompoent,
};
module.exports = filePathObj;
