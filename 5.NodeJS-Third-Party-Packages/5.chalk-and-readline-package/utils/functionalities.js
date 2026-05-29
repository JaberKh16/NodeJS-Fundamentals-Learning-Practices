import chalk from "chalk";
import fs from "fs/promises";
import os from "os";
import path from "path";

export function showSystemInfo() {
  console.log(chalk.bold.cyan("\n📊 System Information:"));
  console.log(chalk.white(" Platform     : ") + chalk.yellow(os.platform()));
  console.log(chalk.white(" Architecture : ") + chalk.yellow(os.arch()));
  console.log(chalk.white(" Hostname     : ") + chalk.yellow(os.hostname()));
  console.log(
    chalk.white(" Username     : ") + chalk.yellow(os.userInfo().username),
  );
  console.log(chalk.white(" CPU Cores    : ") + chalk.yellow(os.cpus().length));
  console.log(
    chalk.white(" Total Memory : ") +
      chalk.yellow((os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB"),
  );
  console.log(
    chalk.white(" Free Memory  : ") +
      chalk.yellow((os.freemem() / 1024 / 1024 / 1024).toFixed(2) + " GB"),
  );
  console.log(
    chalk.white(" Uptime       : ") +
      chalk.yellow((os.uptime() / 3600).toFixed(2) + " hours"),
  );
}

export async function listDirectory(currentDir) {
  console.log(chalk.bold.cyan(`\n📁 Current Directory: ${currentDir}`));
  try {
    const files = await fs.readdir(currentDir);
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        console.log(chalk.blue(" 📂 ") + chalk.blue.bold(file));
      } else {
        console.log(
          chalk.green(" 📄 ") +
            file +
            chalk.gray(` (${(stats.size / 1024).toFixed(1)} KB)`),
        );
      }
    }
  } catch (err) {
    console.log(chalk.red("Error reading directory: ") + err.message);
  }
}

export async function createDirectory(currentDir) {
  const dirName = await question(chalk.cyan("\nEnter new directory name: "));
  if (!dirName.trim()) {
    console.log(chalk.red("Directory name cannot be empty."));
    return;
  }
  const newDirPath = path.join(currentDir, dirName);
  try {
    await fs.mkdir(newDirPath, { recursive: true });
    console.log(chalk.green("✅ Directory created successfully!"));
  } catch (err) {
    console.log(chalk.red("Error creating directory: ") + err.message);
  }
}

export async function createOrWriteFile(currentDir) {
  const fileName = await question(chalk.cyan("\nEnter file name: "));
  if (!fileName.trim()) {
    console.log(chalk.red("File name cannot be empty."));
    return;
  }
  const content = await question(chalk.cyan("Enter content: "));
  const filePath = path.join(currentDir, fileName);
  try {
    await fs.writeFile(filePath, content);
    console.log(chalk.green("✅ File created/written successfully!"));
  } catch (err) {
    console.log(chalk.red("Error writing file: ") + err.message);
  }
}

export async function readFileContent(currentDir) {
  const fileName = await question(chalk.cyan("\nEnter file name to read: "));
  if (!fileName.trim()) {
    console.log(chalk.red("File name cannot be empty."));
    return;
  }
  const filePath = path.join(currentDir, fileName);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    console.log(chalk.bold.cyan("\n📄 File Content:\n") + chalk.white(content));
  } catch (err) {
    console.log(chalk.red("Error reading file: ") + err.message);
  }
}

export function printTableData() {
  const data = [
    { name: "Alice", age: 30, city: "New York" },
    { name: "Bob", age: 25, city: "Los Angeles" },
    { name: "Charlie", age: 35, city: "Chicago" },
  ];
  console.log(chalk.bold.cyan("\n📊 User Data Table:\n"));
  console.table(data);
}

// Add this helper at the top of functionalities.js if needed
const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));
