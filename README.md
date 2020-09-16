# findBreakURL
This is a part of school project.
This is not deployed yet. I am working on it, it will be done by 28th Sep 2020.
## Describtion
This tool will detect any broken URL inside either single HTML file or multiple HTML files (decided by options). 
You can specify a HTML file with its' name or otherwise it will automatically detects any HTML files in the current directory.
For example, <tool name> [options] filename => one html file
             <tool name> [options] [options] => any html files within the directory.
               
## Usage
Usage: node index <command> [options] <optionalFilename>

Commands:
  index test  Test to find any broken URL

Options:
  -f, --file     Load a specified HTML file                           [required]
  -a, --all      Load all HTML files in the current dir
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  node index test -f foo.html  Test if there is any broken URL in the html file
  node index test -f -a        Test broken URL in the html files in current dir


