import chalk from "chalk";
import fs from "fs/promises";
import readline from "readline";
import os from "os";
import path from "path";
import {
  showSystemInfo,
  listDirectory,
  createDirectory,
  readFileContent,
  printTableData,
} from "./utils/functionalities.js";

// setup readline interface
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// setup a promises based question function
const question = (query) =>
  new Promise((resolve) => r1.question(query, resolve));

// clear the console
const clearScreen = () => console.clear();

// menu options
async function showMenu() {
  clearScreen();
  console.log(chalk.bold.bgBlue("\n   🚀 SYSTEM UTILITY TOOL   \n"));
  console.log(chalk.cyan("1.") + chalk.white(" Show System Information"));
  console.log(chalk.cyan("2.") + chalk.white(" List Current Directory"));
  console.log(chalk.cyan("3.") + chalk.white(" Create New Directory"));
  console.log(chalk.cyan("4.") + chalk.white(" Create / Write File"));
  console.log(chalk.cyan("5.") + chalk.white(" Read File"));
  console.log(chalk.cyan("6.") + chalk.white(" Exit"));

  const choice = await question(chalk.cyan("Please select an option: "));

  switch (choice.trim()) {
    case "1":
      showSystemInfo();
      break;
    case "2":
      listDirectory();
      break;
    case "3":
      createDirectory();
      break;
    case "4":
      createOrWriteFile();
      break;
    case "5":
      readFileContent();
      break;
    case "6":
      console.log(chalk.green("\n👋Exiting..."));
      r1.close();
      process.exit(0);
      break;
    case "7":
      console.log(chalk.yellow("\n⚠️  Print table formatted data!"));
      printTableData();
      break;
    default:
      console.log(chalk.red("Invalid option, please try again."));
      setTimeout(showMenu, 2000);
  }

  await question(chalk.gray("\nPress Enter to return to the menu..."));
  showMenu();
}

function runApp() {
  // Start the tool
  console.log(chalk.bold.magenta("Welcome to Interactive System Tool!"));
  showMenu();
}

runApp();
