const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

const fileRead = (file) => {
  let fileData = null;

  try {
    fileData = fs.readFileSync(path.resolve(`${__dirname}`, `./${file}`), {
      encoding: "utf-8",
    });

    // wrong file name
  } catch (error) {
    console.log(file + " is a WRONG file name");
    return process.exit(1);
  }
  return fileData;
};

const readDirectory = (yargs) => {
  let files = [];
  if (yargs.argv._.length === 1 && yargs.argv._[0] === "start") {
    // decide the option if it is -f or -a
    if (typeof yargs.argv.p === "string") {
      const tmpFiles = fs.readdirSync(yargs.argv.p, { encoding: "utf-8" });

      // if -a, store all files into the files variable
      files = tmpFiles.filter((file) => {
        return file.toLowerCase().endsWith(".html");
      });
    } else if (typeof yargs.argv.f === "string") {
      files = [...yargs.argv.f.split(",")];
    } else if (typeof yargs.argv.a === "string") {
      console.log(chalk.greenBright(`You are testing REST API:"${yargs.argv.a}". Please wait...`))
    } else {
      console.log(
        chalk.yellow(
          "Please enter proper filename with -f flag, -h with API URL or dir path with -a flag"
        )
      );
    }
    return files;
  } else {
    console.log(chalk.yellow("Wrong argument: use [start]"));
  }
};

module.exports = { fileRead, readDirectory };
