#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const lib = path.join(path.dirname(fs.realpathSync(__filename)), "../index.js");
require(lib);