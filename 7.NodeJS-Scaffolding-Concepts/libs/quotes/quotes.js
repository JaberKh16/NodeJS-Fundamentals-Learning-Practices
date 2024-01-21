/*
 * Title: Quotes Library
 * Description: Utility library for getting a list of Quotes
 *
 */

// dependencies
const fs = require('fs');

// quotes object - module scaffolding
const quotes = {};

// get all the quotes and return them to the user
quotes.allQuotes = function allQuotes() {
    // read the text file containing the quotes
    const fileContents = fs.readFileSync(`${__dirname}/quotes.txt`, 'utf8');

    // turn the string into an array
    const arrayOfQuotes = fileContents.split(/\r?\n/);

    // return the array
    return arrayOfQuotes;
};

// export the library
module.exports = quotes;
