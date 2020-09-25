const yargs = require("yargs");
const fs = require('fs')

/*
The purpose of this module:
    1. Set the argument options (such as -h, -v ...)
    2. Find all HTML files in the current directory if users pass -a option.
    3. If users only pass -f options, user specifies all files to be tested.
    4. Store all files mentioned above into the files variable.
 */

yargs
  .usage("Usage: url-tester <command> [options] <optionalFilename>")
  .command("start", "Test to find any broken URL")
  .example(
    "url-tester start -f foo1.html, foo2.txt (You can multiple files, delimiter is ',') ",
    " Test if there is any broken URL in the files"
  )
  .example(
    "url-tester start -f -a",
    " Test broken URL in the only 'html' files in the current dir"
  )
  .alias("f", "file")
  .alias("a", "all")
  .demandOption(["f"])
  .describe("f", "Load all specified files (delimiter is ',')")
  .describe("a", "Load all HTML files in the current dir")
  .version()
  .alias("v", "version")
  .help()
  .alias("h", "help")
  .demandCommand().argv;

let files = [];

// decide the option if it is -f or -a
if (yargs.argv.a || typeof yargs.argv.f !== "string") {
  const tmpFiles = fs.readdirSync(__dirname, { encoding: "utf-8" });

  // if -a, store all files into the files variable
  files = tmpFiles.filter((file) => {
    return file.toLowerCase().endsWith(".html");
  });
} else if (typeof yargs.argv.f === "string") {
  files = [yargs.argv.f];

  // if -f filename.txt, take all files and put into the files variables.
  if (yargs.argv._.length > 1) {
    for (let i = 1; i < yargs.argv._.length; i++) {
      files.push(yargs.argv._[i]);
    }
  }
}

module.exports = files;
