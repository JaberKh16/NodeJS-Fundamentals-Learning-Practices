import chalk from "chalk";
import readline from "readline";
import {
  showSystemInfo,
  listDirectory,
  createDirectory,
  createOrWriteFile,
  readFileContent,
  printTableData,
} from "./utils/functionalities.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

const clearScreen = () => console.clear();

let currentDir = process.cwd();

async function showMenu() {
  clearScreen();
  console.log(chalk.bold.bgBlue("\n 🚀 SYSTEM UTILITY TOOL \n"));
  console.log(chalk.cyan("1.") + chalk.white(" Show System Information"));
  console.log(chalk.cyan("2.") + chalk.white(" List Current Directory"));
  console.log(chalk.cyan("3.") + chalk.white(" Create New Directory"));
  console.log(chalk.cyan("4.") + chalk.white(" Create / Write File"));
  console.log(chalk.cyan("5.") + chalk.white(" Read File"));
  console.log(chalk.cyan("6.") + chalk.white(" Print Table Data"));
  console.log(chalk.cyan("7.") + chalk.white(" Exit"));

  const choice = await question(chalk.cyan("Please select an option: "));

  switch (choice.trim()) {
    case "1":
      showSystemInfo();
      break;
    case "2":
      await listDirectory(currentDir);
      break;
    case "3":
      await createDirectory(currentDir);
      break;
    case "4":
      await createOrWriteFile(currentDir);
      break;
    case "5":
      await readFileContent(currentDir);
      break;
    case "6":
      printTableData();
      break;
    case "7":
      console.log(chalk.green("\n👋 Exiting..."));
      rl.close();
      process.exit(0);
      break;
    default:
      console.log(chalk.red("Invalid option, please try again."));
  }

  if (choice !== "7") {
    await question(chalk.gray("\nPress Enter to return to the menu..."));
    showMenu();
  }
}

// Start the app
const runApp = async () => {
  try {
    console.log(chalk.bold.magenta("Welcome to Interactive System Tool!"));
    await showMenu();
  } catch (err) {
    console.log(chalk.red("An error occurred: ") + err.message);
    rl.close();
  }
};
