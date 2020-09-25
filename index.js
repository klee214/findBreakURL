#!/usr/bin/env node
const fetchFunction = require('./fetch')
const fs = require("fs");
const validator = require("validator");
const files = require('./yargs')

let fileData = null;

// Start testing files each
files.map((file) => {
  try {
    fileData = fs.readFileSync(`${__dirname}\\${file}`, {
      encoding: "utf-8",
    });

    // wrong file name 
  } catch (error) {
    return console.log(file + " is a WRONG file name")
  }

  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const findURL = fileData.match(regex);

  if (findURL) {
    findURL.forEach((url) => {
      if (validator.isURL(url)) fetchFunction(url, file);
    });
  }
});
