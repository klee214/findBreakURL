#!/usr/bin/env node
const { fetchFunction } = require("./fetch");
const validator = require("validator");
const { arg, files } = require("./yargs");
const { jsonFetch } = require("./json");
const { fileRead } = require('./fileRead')

// Start testing files each
files.map((file) => {
  const fileData = fileRead(file);

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
