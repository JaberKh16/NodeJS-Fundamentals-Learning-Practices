
// dependencies
const mathLibrary = require('./libs/math/math');
const quotesLibrary = require('./libs/quotes/quote');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    timeBetweenQuotes: 1000,
};

// function that prints a random quote
app.printAQuote = function printAQuote() {
    // get all the quotes
    const allQuotes = quotesLibrary.allQuotes();

    // get the length of the quotes
    const numberOfQuotes = allQuotes.length;

    // pick a random number between 1 and the number of quotes
    const randomNumber = mathLibrary.getRandomNumber(1, numberOfQuotes);

    // get the quote at that position in the array (minus one)
    const selectedQuote = allQuotes[randomNumber - 1];

    // print the quote to the console
    console.log(selectedQuote);
};

// function that loops indefinitely, calling the printAQuote function as it goes
app.indefiniteLoop = function indefiniteLoop() {
    // create the interval, using the config variable defined above
    setInterval(app.printAQuote, app.config.timeBetweenQuotes);
};

// invokation
app.indefiniteLoop();