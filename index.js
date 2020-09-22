#!/usr/bin/env node
const axios = require("axios");
const fs = require("fs");
const validator = require("validator");
const yargs = require("yargs");
const chalk = require("chalk");

yargs
  .usage("Usage: url-tester <command> [options] <optionalFilename>")
  .command("test", "Test to find any broken URL")
  .example(
    "url-tester test -f foo.html",
    " Test if there is any broken URL in the html file"
  )
  .example(
    "url-tester test -f -a",
    " Test broken URL in the html files in current dir"
  )
  .alias("f", "file")
  .alias("a", "all")
  .demandOption(["f"])
  .describe("f", "Load a specified file")
  .describe("a", "Load all HTML files in the current dir")
  .version()
  .alias("v", "version")
  .help()
  .alias("h", "help")
  .demandCommand().argv;

let fileData = null;
let files = [];

// decide the option if it is -f or -a
if (yargs.argv.a || typeof yargs.argv.f !== "string") {
  const tmpFiles = fs.readdirSync(__dirname, { encoding: "utf-8" });
  files = tmpFiles.filter((file) => {
    return file.toLowerCase().endsWith(".html");
  });
} else if (typeof yargs.argv.f === "string") {
  files.push(yargs.argv.f);
}

// map through the array and test GET request
files.map((file) => {
  fileData = fs.readFileSync(`${__dirname}\\${file}`, {
    encoding: "utf-8",
  });

  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const findURL = fileData.match(regex);

  const fetchFunction = async (url) => {
    try {
      const response = await axios.get(url);
      console.log(
        chalk.black.bgGreen.bold(
          "In " + file + " file, the URL: " + url + " is success: "
        )
      );
      console.log(chalk.green.underline.bold("STATUS: " + response.status));
    } catch (error) {
      if (error.response) {
        console.log(
          chalk.black.bgYellow.bold(
            "In " + file + " file, the URL: " + url + " has not been found: "
          )
        );
        return console.log(
          chalk.yellow.underline.bold("STATUS: " + error.response.status)
        );
      }
      chalk.white.bgRed.bold;
      console.log(
        chalk.white.bgRed.bold(
          "In " + file + " file, the URL: " + url + " has an error: "
        )
      );
      console.log(chalk.red.underline.bold("ENOTFOUND"));
    }
  };

  findURL.forEach((url, index) => {
    findURL[index] = url.slice(0, url.lastIndexOf('"'));
    if (validator.isURL(findURL[index])) fetchFunction(findURL[index]);
  });
});
