/*
  Yargs Module In NodeJS
  ======================
  Node.js provides a bare-bones way to access command line arguments. While it’s a good
  start, it doesn’t provide any way to parse more complex command line arguments.
  Yargs is a popular Node.js module that makes it easy to parse command line arguments. It provides a simple and
  intuitive API for defining and handling command line options, making it easier to build command line applications.

*/

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

// Create a yargs instance and parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option("name", {
    alias: "n",
    type: "string",
    description: "Your name",
    demandOption: true,
  })
  .option("age", {
    alias: "a",
    type: "number",
    description: "Your age",
    demandOption: true,
  })
  .help()
  .alias("help", "h").argv;

// Access the parsed arguments
console.log(`Hello, ${argv.name}! You are ${argv.age} years old.`);
