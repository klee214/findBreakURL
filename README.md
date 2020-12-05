# findBreakURL

## Description

This tool will detect any broken URL inside either single HTML file or multiple HTML files (decided by options).
You can specify a HTML file with its' name or otherwise it will automatically detects any HTML files in the current directory.

For example,

```
<tool name> [options] filename => one html file
             <tool name> [options] [options] => any html files within the given path.
```

## Developer Installation

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

This is a CLI program to verify your URL lists are actually not broken. It tries to send the real API header get request to check if the communication is successfully connected.

>To install the program:
>npm i kimin-url-checker@1.0.0

The tool name(cli program name) is kimin-url-checker.
It has 6 options.

```
Usage: kimin-url-checker start [options] <optionalFilename>

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
  kimin-url-checker start -f=foo1.html,foo2.txt  Test if there is any broken URL in the
                                          files
  kimin-url-checker start -a                     Test broken URL in the only 'html'
                                          files in the current dir
  kimin-url-checker start -f=foo1.html -j        Display all results as JSON format{
                                          url: 'https://...': status '200' },
                                          ...
  kimin-url-checker start -f=foo1.html -g        Display only good URL
  kimin-url-checker start -f=foo1.html -b        Display only baad URL
```

## Outcome exmple

![outcomes](https://github.com/klee214/findBreakURL/blob/master/Capture.PNG)

## Contribution
There is no strict rule you to follow to contribute to this application. BUT, there may be something you need to pre-install and make some configuration to run and test the program. Please visit [CONTRIBUTION.md](https://github.com/klee214/findBreakURL/blob/master/CONTRIBUTION.md) 

## License

MIT License
