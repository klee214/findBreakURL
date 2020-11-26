# Contributing
## Getting Started
These instructions will help you to follow the rules of the code-style and syntax restriction of this project. 
## Prerequisites
_Window Terminal : if Window users, use WSL2_
_insall node.js LTS_ 
_install vscode_ 

## Installing
1. git clone https://github.com/klee214/findBreakURL.git
2. Download all the extensions vscode recommend
3. If you fail downloading `eslint` or `prettier` with extension downloading, need to be installed manually,
_a) npm install eslint --save-dev_
_b) npm install prettier --save-dev_

## Testing
Before commit and push your changes, please make sure that your change passes all the unit test. 
Also, if you create a new function or file, please add a new unit test for it. For the testing, JEST is used. 

This program is using node.js CI in github, will automatically test your commit once you push the commit. 