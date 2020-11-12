const axios = require('axios');
const chalk = require('chalk');
const { arg } = require('./yargs');

const jsonFetch = async (url) => {
    try {
        const response = await axios.head(url);
        if (!arg.b) {
            const httpObj = {
                url,
                status: response.status,
            };
            console.log(chalk.green(JSON.stringify(httpObj)));
        }
    } catch (error) {
        if (!arg.g) {
            // If 404 error :
            if (error.response) {
                const httpObj = {
                    url,
                    status: error.response.status,
                };
                console.log(chalk.yellow(JSON.stringify(httpObj)));
            } else {
                const httpObj = {
                    url,
                    error: error.code,
                };
                console.log(chalk.red(JSON.stringify(httpObj)));
            }
        }
    }
};

module.exports = { jsonFetch };
