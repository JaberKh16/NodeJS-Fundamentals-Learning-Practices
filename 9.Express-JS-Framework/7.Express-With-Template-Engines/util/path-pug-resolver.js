const path = require('path');

const filePath = path.join(__dirname, '../views', 'pug/');
// console.log(filePath);
// Assuming your Pug file is in the 'views/pug/layout' directory
const headerCompoent = path.resolve(__dirname, '../views/', 'pug/', 'layout', 'header-layout.pug');
const navbarCompoent = path.resolve(__dirname, '../views/', 'pug/', 'layout', 'navbar-layout.pug');
const mainCompoent = path.resolve(__dirname, '../views/', 'pug/', 'layout', 'main-layout.pug');

const filePathObj = {
    filePath,
    headerCompoent,
    navbarCompoent,
    mainCompoent,
};
module.exports = filePathObj;
