/*
 * Title: Math Library
 * Description: Utility library for math-related functions
 *
 */

// math object - module scaffolding
const math = {};

// get a random integer between two integers
// inspired by: http://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
math.getRandomNumber = function getRandomNumber(min, max) {
    let minimum = min; // 1
    let maximum = max; // 6
    minimum = typeof minimum === 'number' ? minimum : 0;
    maximum = typeof maximum === 'number' ? maximum : 0;
    return Math.floor(Math.random() * (maximum - minimum + 1) + min);
};

// export the library
module.exports = math;
