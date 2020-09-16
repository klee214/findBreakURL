const axios = require('axios');
const fs = require('fs');
const validator = require('validator');
const yargs = require('yargs')
const chalk = require('chalk');
const { argv } = require('process');

yargs.usage('Usage: node $0 <command> [options] <optionalFilename>')
.command('test', 'Test to find any broken URL')
.example('node $0 test -f foo.html',' Test if there is any broken URL in the html file')
.example('node $0 test -f -a',' Test broken URL in the html files in current dir')
.alias('f', 'file')
.alias('a', 'all')
.demandOption(['f'])
.describe('f','Load a specified HTML file')
.describe('a','Load all HTML files in the current dir')
.version()
.alias('v','version')
.help()
.alias('h', 'help')
.demandCommand()
.argv

console.log(argv)

const fileData = fs.readFileSync(`${__dirname}\\index.html`,{encoding:"utf-8"});

const regex = /(https|http):\/\/.*["]/g;
const findURL = fileData.match(regex);

const fetchFunction = async (url)=>{

    try {
        const response = await axios.get(url);
        console.log(response.status)
        
    } catch (error) {
        if(error.response){
            console.log(error.response.status)   
        }

        console.log("ENOTFOUND");
    }
}

findURL.forEach((url, index) => {
    findURL[index] = url.slice(0, url.lastIndexOf('"'));
    fetchFunction(findURL[index]);
});








