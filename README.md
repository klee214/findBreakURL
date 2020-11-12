# findBreakURL

## Description

This tool will detect any broken URL inside either single HTML file or multiple HTML files (decided by options).
You can specify a HTML file with its' name or otherwise it will automatically detects any HTML files in the current directory.

For example,

```
<tool name> [options] filename => one html file
             <tool name> [options] [options] => any html files within the given path.
```

## Installation

1. Clone the entire code like wise

```
git clone <This git repos url/ssh>
```

2. After installing it, change to the cloned directory, and install npm modules globally (suggested)

```
cd findBreakURL
npm i -g
```

// OR

```
cd findBreakURL
npm i
npm link
```

3. Now, you are good to go.

## Usage

Keep in mind! You have to put the html files you want to test in the findBreakURL folder.
In other words, index.js and your testing html files must be in the same folder.

The tool name(cli program name) is url-tester.
It has 6 options.

```
Usage: url-tester <command> [options] <optionalFilename>

Commands:
  index start  Test to find any broken URL

Options:
  -f, --file     Load all specified files (delimiter is ',')
  -a, --all      Load all HTML files in the current dir
  -j, --json     Display all results as JSON format
  -g, --good     Display only BAD URL
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  url-tester start -f=foo1.html,foo2.txt  Test if there is any broken URL in the
                                          files
  url-tester start -a                     Test broken URL in the only 'html'
                                          files in the current dir
  url-tester start -f=foo1.html -j        Display all results as JSON format{
                                          url: 'https://...': status '200' },
                                          ...
  url-tester start -f=foo1.html -g        Display only good URL
  url-tester start -f=foo1.html -b        Display only baad URL
```

## Outcome exmple

![outcomes](https://github.com/klee214/findBreakURL/blob/master/Capture.PNG)

## License

MIT License
