const yargs = require("yargs");
const fs = require("fs");

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
    "url-tester start -f=foo1.html,foo2.txt",
    " Test if there is any broken URL in the files"
  )
  .example(
    "url-tester start -f -a",
    " Test broken URL in the only 'html' files in the current dir"
  )
  .example(
    "url-tester start -f=foo1.html -j",
    " Display all results as JSON format{ url: 'https://...': status '200' }, ... "
  )
  .example("url-tester start -f=foo1.html -g", " Display only good URL")
  .alias("f", "file")
  .alias("j", "json")
  .alias("a", "all")
  .alias("g", "good")
  .demandOption(["f"])
  .describe("f", "Load all specified files (delimiter is ',')")
  .describe("a", "Load all HTML files in the current dir")
  .describe("j", "Display all results as JSON format")
  .describe("g", "Display only good URL")
  .version()
  .alias("v", "version")
  .help()
  .alias("h", "help")
  .demandCommand().argv;

let files = [];

// decide the option if it is -f or -a
if (yargs.argv.a && typeof yargs.argv.f !== "string") {
  const tmpFiles = fs.readdirSync(__dirname, { encoding: "utf-8" });

  // if -a, store all files into the files variable
  files = tmpFiles.filter((file) => {
    return file.toLowerCase().endsWith(".html");
  });
} else if (typeof yargs.argv.f === "string") {
  console.log(yargs.argv);
  files = [...yargs.argv.f.split(",")];
}

module.exports = files;
