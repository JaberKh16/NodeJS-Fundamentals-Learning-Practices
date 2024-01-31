const path = require('path');

const filePath = path.join(__dirname, '../views/', 'ejs/');
// console.log(filePath);
// Assuming your ejs file is in the 'views/ejs/layout' directory
const headerCompoent = path.resolve(__dirname, '../views/', 'ejs/', 'layout', 'header-layout.ejs');
const navbarCompoent = path.resolve(__dirname, '../views/', 'ejs/', 'layout', 'navbar-layout.ejs');
const mainCompoent = path.resolve(__dirname, '../views/', 'ejs/', 'layout', 'main-layout.ejs');

const filePathObj = {
    filePath,
    headerCompoent,
    navbarCompoent,
    mainCompoent,
};
module.exports = filePathObj;
