#!/usr/bin/env node
const { fetchFunction } = require("./fetch");
const fs = require("fs");
const validator = require("validator");
const { files, arg } = require("./yargs");
const { jsonFetch } = require("./json");
const { exit } = require("process");

let fileData = null;

// Start testing files each
files.map((file) => {
  try {
    fileData = fs.readFileSync(`${__dirname}\\${file}`, {
      encoding: "utf-8",
    });

    // wrong file name
  } catch (error) {
    console.log(file + " is a WRONG file name");
    return process.exit(1);
  }

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
});
