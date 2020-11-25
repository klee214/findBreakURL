const chalk = require('chalk');
const { axiosFetch } = require('./axios_fetch');
const { arg } = require('./yargs');

/*
    The purpose of this module:
        1. Test files if they have wrong url or not.
        2. 200 : success, 404: not found, 30?: redirect, timeout, ENOTFOUND: nonexist url
*/

const fetchFunction = async (url, file) => {
    try {
        const status = await axiosFetch(url);
        if (!arg.b) {
            console.log(
                chalk.black.bgGreen.bold(
                    'In ' + file + ' file, the URL: ' + url + ' is success: '
                )
            );
            console.log(
                chalk.green.underline.bold('STATUS: ' + status)
            );
        }
        return status;
    } catch (error) {
        if (!arg.g) {
            // If 404 error :
            if (error.response) {
                console.log(
                    chalk.white.bgRed.bold(
                        'In ' +
                            file +
                            ' file, the URL: ' +
                            url +
                            ' is a bad url: '
                    )
                );
                return console.log(
                    chalk.red.underline.bold('STATUS: ' + error.response.status)
                );
            }

            // non-exist URL
            if (error.code == 'ENOTFOUND') {
                console.log(
                    chalk.white.bgGrey.bold(
                        'In ' +
                            file +
                            ' file, the URL: ' +
                            url +
                            ' is unknown url: '
                    )
                );
                chalk.white(console.log(error.code));

                // timeout error
            } else if (error.code == 'ETIMEDOUT') {
                console.log(
                    chalk.white.bgGrey.bold(
                        'In ' +
                            file +
                            ' file, the URL: ' +
                            url +
                            ' is TIMEOUT: '
                    )
                );
                chalk.white.underline(console.log(error.code));
            } else {
                // server error or other error : error.code will indicate which error it has
                console.log(
                    chalk.white.bgGrey.bold(
                        'In ' +
                            file +
                            ' file, the URL: ' +
                            url +
                            ' has following issue: '
                    )
                );
                chalk.white.underline(console.log(error.code));
            }
        }
    }
};

module.exports = { fetchFunction };
