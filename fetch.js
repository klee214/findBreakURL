const chalk = require("chalk");
const axios = require("axios");
const { arg } = require("./yargs");

/*
    The purpose of this module:
        1. Test files if they have wrong url or not.
        2. 200 : success, 404: not found, 30?: redirect, timeout, ENOTFOUND: nonexist url
*/

const fetchFunction = async (url, file) => {
  try {
    const response = await axios.head(url);

    // 300 series... redirect status. However axios does redirect to the changed URL automatically
    // So status will be normal 200 in the most of the time.
    // Most of the case this will not be run. I will implement this here just in case.
    if (!arg.b) {
      if (response.status === 301) {
        chalk.black.bgYellow(
          console.log(
            "In " +
              file +
              " file, the URL: " +
              url +
              ". Status code: 301, Moved Permanently to: " +
              response.headers[`Location`]
          )
        );
      } else if (response.status === 307) {
        chalk.black.bgYellow(
          console.log(
            "In " +
              file +
              " file, the URL: " +
              url +
              ". Status code: 307, Temporary Redirect to: " +
              response.headers[`Location`]
          )
        );
      } else if (response.status === 308) {
        chalk.black.bgYellow(
          console.log(
            "In " +
              file +
              " file, the URL: " +
              url +
              ". Status code: 308, Permanent Redirect to: " +
              response.headers[`Location`]
          )
        );
        // Success status : 200
      } else {
        console.log(
          chalk.black.bgGreen.bold(
            "In " + file + " file, the URL: " + url + " is success: "
          )
        );
        console.log(chalk.green.underline.bold("STATUS: " + response.status));
      }
    }
  } catch (error) {
    if (!arg.g) {
      // If 404 error :
      if (error.response) {
        console.log(
          chalk.white.bgRed.bold(
            "In " + file + " file, the URL: " + url + " is a bad url: "
          )
        );
        return console.log(
          chalk.red.underline.bold("STATUS: " + error.response.status)
        );
      }

      // non-exist URL
      if (error.code == "ENOTFOUND") {
        console.log(
          chalk.white.bgGrey.bold(
            "In " + file + " file, the URL: " + url + " is unknown url: "
          )
        );
        chalk.white(console.log(error.code));

        // timeout error
      } else if (error.code == "ETIMEDOUT") {
        console.log(
          chalk.white.bgGrey.bold(
            "In " + file + " file, the URL: " + url + " is TIMEOUT: "
          )
        );
        chalk.white.underline(console.log(error.code));
      } else {
        // server error or other error : error.code will indicate which error it has
        console.log(
          chalk.white.bgGrey.bold(
            "In " + file + " file, the URL: " + url + " has following issue: "
          )
        );
        chalk.white.underline(console.log(error.code));
      }
    }
  }
};

module.exports = fetchFunction;
