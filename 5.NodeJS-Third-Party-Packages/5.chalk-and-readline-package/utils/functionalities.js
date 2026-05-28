// ==================== FUNCTIONS ====================
function showSystemInfo() {
  console.log(chalk.bold.cyan("\n📊 System Information:"));
  console.log(chalk.white("   Platform     : ") + chalk.yellow(os.platform()));
  console.log(chalk.white("   Architecture : ") + chalk.yellow(os.arch()));
  console.log(chalk.white("   Hostname     : ") + chalk.yellow(os.hostname()));
  console.log(
    chalk.white("   Username     : ") + chalk.yellow(os.userInfo().username),
  );
  console.log(
    chalk.white("   CPU Cores    : ") + chalk.yellow(os.cpus().length),
  );
  console.log(
    chalk.white("   Total Memory : ") +
      chalk.yellow((os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB"),
  );
  console.log(
    chalk.white("   Free Memory  : ") +
      chalk.yellow((os.freemem() / 1024 / 1024 / 1024).toFixed(2) + " GB"),
  );
  console.log(
    chalk.white("   Uptime       : ") +
      chalk.yellow((os.uptime() / 3600).toFixed(2) + " hours"),
  );
}

function listDirectory(question) {
  console.log(chalk.bold.cyan("\n📁 Choose Directory:"));
  const files = fs.readdirSync(currentDir);

  files.forEach((file) => {
    const filePath = path.join(currentDir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      console.log(chalk.blue("   📂 ") + chalk.blue.bold(file));
    } else {
      console.log(
        chalk.green("   📄 ") +
          file +
          chalk.gray(`  (${(stats.size / 1024).toFixed(1)} KB)`),
      );
    }
  });
}

question(
  chalk.cyan("\nEnter directory name to navigate or press Enter to stay: "),
).then((dir) => {
  if (dir.trim() === "") {
    showMenu();
  } else {
    const dirPath = path.join(currentDir, dir);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      currentDir = dirPath;
      showMenu();
    } else {
      console.log(chalk.red("⚠️ Directory does not exist."));
      setTimeout(showMenu, 2000);
    }
  }
});
// .catch((err) => {
//   console.log(chalk.red("Error navigating directory: " + err.message));
//   setTimeout(showMenu, 2000);
// });

function createDirectory() {
  question(chalk.cyan("\nEnter new directory name: "))
    .then((dirName) => {
      if (dirName.trim() === "") {
        console.log(chalk.red("⚠️ Directory name cannot be empty."));
        setTimeout(showMenu, 2000);
        return;
      }
      const newDirPath = path.join(currentDir, dirName);
      if (fs.existsSync(newDirPath)) {
        console.log(chalk.red("⚠️ Directory already exists."));
        setTimeout(showMenu, 2000);
        return;
      }
      fs.mkdirSync(newDirPath);
      console.log(chalk.green("✅ Directory created successfully!"));
      setTimeout(showMenu, 2000);
    })
    .catch((err) => {
      console.log(chalk.red("Error creating directory: " + err.message));
      setTimeout(showMenu, 2000);
    });
}

function createOrWriteFile() {
  question(chalk.cyan("\nEnter file name to create/write: "))
    .then((fileName) => {
      if (fileName.trim() === "") {
        console.log(chalk.red("File name cannot be empty."));
        setTimeout(showMenu, 2000);
        return;
      }
      const filePath = path.join(currentDir, fileName);
      question(
        chalk.cyan("Enter content to write (will overwrite if file exists): "),
      )
        .then((content) => {
          fs.writeFileSync(filePath, content);
          console.log(chalk.green("✅File created/written successfully!"));
          setTimeout(showMenu, 2000);
        })
        .catch((err) => {
          console.log(chalk.red("Error writing file: " + err.message));
          setTimeout(showMenu, 2000);
        });
    })
    .catch((err) => {
      console.log(chalk.red("Error creating file: " + err.message));
      setTimeout(showMenu, 2000);
    });
}

function readFileContent() {
  question(chalk.cyan("\nEnter file name to read: "))
    .then((fileName) => {
      if (fileName.trim() === "") {
        console.log(chalk.red("File name cannot be empty."));
        setTimeout(showMenu, 2000);
        return;
      }
      const filePath = path.join(currentDir, fileName);
      if (!fs.existsSync(filePath)) {
        console.log(chalk.red("❌ File does not exist!"));
        setTimeout(showMenu, 2000);
        return;
      }
      const content = fs.readFileSync(filePath, "utf-8");
      console.log(chalk.green("\n📄 File Content:\n") + chalk.white(content));
      setTimeout(showMenu, 2000);
    })
    .catch((err) => {
      console.log(chalk.red("Error reading file: " + err.message));
      setTimeout(showMenu, 2000);
    });
}

function printTableData() {
  const data = [
    { name: "Alice", age: 30, city: "New York" },
    { name: "Bob", age: 25, city: "Los Angeles" },
    { name: "Charlie", age: 35, city: "Chicago" },
  ];
  console.log(chalk.bold.cyan("\n📊 User Data Table:\n"));
  console.table(data);
}

export {
  showSystemInfo,
  listDirectory,
  createDirectory,
  createOrWriteFile,
  readFileContent,
  printTableData,
};
