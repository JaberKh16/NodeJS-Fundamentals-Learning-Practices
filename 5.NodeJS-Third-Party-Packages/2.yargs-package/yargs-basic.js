const yargs = require("yargs");
//yargs.version("1.1.0"); // set version

yargs.command({
  command: "set",
  describe: "Add a new note",
  handler: function () {
    console.log("note added...");
  },
});

console.log(`${yargs.argv}`);
