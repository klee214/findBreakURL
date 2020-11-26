const fs = require('fs');
const chalk = require('chalk');

const fileRead = (file) => {
    let fileData = null;

    try {
        fileData = fs.readFileSync(file, {
            encoding: 'utf-8',
        });
        // wrong file name
    } catch (error) {
        console.log(file + ' is a WRONG file name');
    }
    return fileData;
};

const readDirectory = (argv) => {
    let files = [];
    if (argv._.length === 1 && argv._[0] === 'start') {
        // decide the option if it is -f or -a
        if (typeof argv.p === 'string') {
            const tmpFiles = fs.readdirSync(argv.p, {
                encoding: 'utf-8',
            });

            // if -a, store all files into the files variable
            files = tmpFiles.filter((file) => {
                return file.toLowerCase().endsWith('.html');
            });
        } else if (typeof argv.f === 'string') {
            files = [...argv.f.split(',')];
        } else if (typeof argv.a === 'string') {
            console.log(
                chalk.greenBright(
                    `You are testing REST API:"${argv.a}". Please wait...`
                )
            );
        } else {
            console.log(
                chalk.yellow(
                    'Please enter proper filename with -f flag, -h with API URL or dir path with -a flag'
                )
            );
        }
    } else {
        console.log(chalk.yellow('Wrong argument: use [start]'));
    }
    return files;
};

module.exports = { fileRead, readDirectory };
