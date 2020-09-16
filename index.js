const axios = require("axios");
const fs = require("fs");
const validator = require("validator");
const yargs = require("yargs");
const chalk = require("chalk");

yargs
  .usage("Usage: node $0 <command> [options] <optionalFilename>")
  .command("test", "Test to find any broken URL")
  .example(
    "node $0 test -f foo.html",
    " Test if there is any broken URL in the html file"
  )
  .example(
    "node $0 test -f -a",
    " Test broken URL in the html files in current dir"
  )
  .alias("f", "file")
  .alias("a", "all")
  .demandOption(["f"])
  .describe("f", "Load a specified HTML file")
  .describe("a", "Load all HTML files in the current dir")
  .version()
  .alias("v", "version")
  .help()
  .alias("h", "help")
  .demandCommand().argv;

let fileData = null;
let files = [];

// decide the option either -f or -a
if (yargs.argv.a || typeof yargs.argv.f !== "string") {
  const tmpFiles = fs.readdirSync(__dirname, { encoding: "utf-8" });
  files = tmpFiles.filter((file) => {
    return file.toLowerCase().endsWith(".html");
  });
} else if (typeof yargs.argv.f === "string") {
  files.push(yargs.argv.f);
}

// map through the array fetch each html file
files.map((file) => {
  fileData = fs.readFileSync(`${__dirname}\\${file}`, {
    encoding: "utf-8",
  });

  const regex = /(https:\/\/|http:\/\/)[^"']+"/g;
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
