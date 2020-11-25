#!/usr/bin/env node
const { fetchFunction } = require('./fetch');
const validator = require('validator');
const { arg, files } = require('./yargs');
const { jsonFetch } = require('./json');
const { fileRead } = require('./fileRead');
const axios = require('axios');
const chalk = require('chalk');
const path = require('path');

if (arg.a) {
    console.log(chalk.bgBlueBright('*******API Request start*******'));
    axios
        .get(arg.a)
        .then(async (response) => {
            console.log(
                chalk.bgGreenBright('*******API Request Success*******')
            );
            if (arg.j) {
                response.data.map(async (res) => {
                    await jsonFetch(path.resolve(arg.a, `./${res[id]}`));
                });
            } else {
                response.data.map(async (res) => {
                    await fetchFunction(
                        path.resolve(arg.a, `./${res[id]}`),
                        arg.a
                    );
                });
            }
        })
        .catch((error) => {
            console.log(chalk.bgRedBright('*******API Request Fails*******'));
            console.log(
                chalk.yellowBright(
                    `Cannot found: ${arg.a}. Probably because of network connection problem or wrong API address`
                )
            );
        });
} else {
    // Start testing files each
    if (files) {
        files.map((file) => {
            const fileData = fileRead(file);

            if (fileData) {
                const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
                const findURL = fileData.match(regex);

                if (findURL) {
                    findURL.forEach(async (url) => {
                        if (validator.isURL(url)) {
                            if (arg.j) {
                                await jsonFetch(url);
                            } else {
                                await fetchFunction(url, file);
                            }
                        }
                    });
                }
            }
        });
    }
}
