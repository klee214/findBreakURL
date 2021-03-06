const yargs = require('yargs');
const { readDirectory } = require('./fileRead');

/*
The purpose of this module:
    1. Set the argument options (such as -h, -v ...)
    2. Find all HTML files in the current directory if users pass -a option.
    3. If users only pass -f options, user specifies all files to be tested.
    4. Store all files mentioned above into the files variable.
 */

yargs
    .usage('Usage: url-tester <command> [options] <optionalFilename>')
    .command('start', 'Test to find any broken URL')
    .example(
        'url-tester start -f=foo1.html,foo2.txt',
        ' Test if there is any broken URL in the files'
    )
    .example(
        'url-tester start -p=<~/username/repos/src>',
        ' Test broken URL in the only "html" files in the current dir'
    )
    .example(
        'url-tester start -f=foo1.html -j',
        'Display all results as JSON format{ url: "https://...": status "200" }, ... '
    )
    .example(
        'url-tester start -a=localhost:3000/posts',
        'Test that the REST API have all the success request'
    )
    .example('url-tester start -f=foo1.html -g', ' Display only good URL')
    .example('url-tester start -f=foo1.html -b', ' Display only baad URL')
    .alias('f', 'file')
    .alias('a', 'api')
    .alias('j', 'json')
    .alias('p', 'path')
    .alias('g', 'good')
    .alias('b', 'bad')
    .describe('f', 'Load all specified files (delimiter is ",")')
    .describe('p', 'Load all HTML files in the path')
    .describe('a', 'Test REST API request')
    .describe('j', 'Display all results as JSON format')
    .describe('g', 'Display only GOOD URL')
    .describe('b', 'Display only BAD URL')
    .version()
    .alias('v', 'version')
    .help()
    .alias('h', 'help')
    .demandCommand().argv;

const files = readDirectory(yargs.argv);

module.exports = {
    files,
    arg: yargs.argv,
};
